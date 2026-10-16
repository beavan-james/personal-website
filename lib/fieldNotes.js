import { fieldNotes } from "./site";

// Reading entries, newest first (dates are YYYY-MM-DD strings)
export function sortedReading() {
  return [...fieldNotes.reading].sort((a, b) => b.date.localeCompare(a.date));
}

// "2026-10-04" -> "Oct 4, 2026", formatted in UTC so the day never shifts
export function formatNoteDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
