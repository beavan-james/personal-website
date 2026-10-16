// Fill in album details for the Field Notes shelf from the iTunes catalogue.
//
//   npm run albums            fill albums that have no tracklist yet
//   npm run albums -- --force refetch every album
//
// Reads lib/listening.json, looks each { title, artist } up on the iTunes
// Search API (free, no key), and writes back `year`, `tracks`, `link` (Apple
// Music), and `cover`, downloading 600px artwork to public/field-notes/albums/.
// If it picks the wrong edition, find the album on Apple Music, copy the
// number at the end of its URL into the album as "itunesId", and rerun with
// --force.

import { mkdir, readFile, writeFile } from "node:fs/promises";

const DATA = new URL("../lib/listening.json", import.meta.url);
const COVERS = new URL("../public/field-notes/albums/", import.meta.url);
const API = process.env.ITUNES_API ?? "https://itunes.apple.com";
const force = process.argv.includes("--force");

// "We Still Don't Trust You (Deluxe)" -> "we still dont trust you"
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/\s*[([].*?[)\]]/g, "")
    .replace(/\s+-\s+(ep|single)$/, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const slug = (s) => norm(s).replace(/ /g, "-");

async function getJson(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
  return res.json();
}

// Best match: same artist and title, explicit over clean, the standard
// edition over deluxe/remastered ones
function pickAlbum(results, { title, artist }) {
  const candidates = results.filter(
    (r) =>
      r.wrapperType === "collection" &&
      norm(r.artistName).includes(norm(artist)) &&
      norm(r.collectionName) === norm(title)
  );
  const score = (r) =>
    (r.collectionExplicitness === "cleaned" ? 2 : 0) +
    (r.collectionName.length > title.length ? 1 : 0);
  return candidates.sort((a, b) => score(a) - score(b))[0];
}

async function findAlbumId(album) {
  if (album.itunesId) return album.itunesId;
  const term = encodeURIComponent(`${album.artist} ${album.title}`);
  const { results } = await getJson(`/search?term=${term}&entity=album&limit=25&country=US`);
  return pickAlbum(results, album)?.collectionId;
}

async function fillAlbum(album) {
  const id = await findAlbumId(album);
  if (!id) throw new Error("no matching album found; set \"itunesId\" by hand");

  const { results } = await getJson(`/lookup?id=${id}&entity=song&country=US`);
  const collection = results.find((r) => r.wrapperType === "collection");
  const tracks = results
    .filter((r) => r.wrapperType === "track")
    .sort((a, b) => a.discNumber - b.discNumber || a.trackNumber - b.trackNumber)
    .map((t) => t.trackName);
  if (!collection || tracks.length === 0) throw new Error(`no tracks for iTunes id ${id}`);

  const file = `${slug(album.artist)}-${slug(album.title)}.jpg`;
  const art = collection.artworkUrl100.replace(/\/\d+x\d+bb\./, "/600x600bb.");
  const image = await fetch(art);
  if (!image.ok) throw new Error(`${image.status} downloading artwork`);
  await writeFile(new URL(file, COVERS), Buffer.from(await image.arrayBuffer()));

  return {
    ...album,
    itunesId: id,
    year: Number(collection.releaseDate.slice(0, 4)),
    cover: `/field-notes/albums/${file}`,
    link: collection.collectionViewUrl.split("?")[0],
    tracks,
  };
}

const months = JSON.parse(await readFile(DATA, "utf8"));
await mkdir(COVERS, { recursive: true });

let failed = 0;
for (const month of months) {
  for (const [i, album] of month.albums.entries()) {
    const label = `${album.title} by ${album.artist}`;
    if (album.tracks?.length && !force) continue;
    try {
      month.albums[i] = await fillAlbum(album);
      console.log(`✓ ${label} (${month.albums[i].tracks.length} tracks)`);
    } catch (err) {
      failed++;
      console.error(`✗ ${label}: ${err.message}`);
    }
  }
}

await writeFile(DATA, `${JSON.stringify(months, null, 2)}\n`);
if (failed) process.exitCode = 1;
