// Museum of the Year 3000 — museum label for an ordinary object from today.
// The entry is a single line, at most 200 characters, written in English.
// It is assembled from labelled pieces so every source line stays short
// and the final text reads like one deadpan museum label.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Label header: the object and its era, as a museum label would name it.
const objectLine = "Rubber duck, 2020s.";

// The ritual: what people in the 2020s actually did with the duck.
const ritualLine =
  "Engineers confessed their errors to this bird each day.";

// The punchline: the year-3000 misreading — the silent bird got promoted.
const verdictLine =
  "It never answered, and was promoted to senior engineer.";

// Join the pieces into the single label line.
const label = [objectLine, ritualLine, verdictLine].join(" ");

// Gate: the entry must be one line of 1 to 200 characters, not blank.
if (label.length < 1 || label.length > 200) {
  throw new Error(`label must be 1-200 characters, got ${label.length}`);
}
if (!label.trim()) {
  throw new Error("label must not be blank");
}
if (label.includes("\n") || label.includes("\r")) {
  throw new Error("label must be a single line");
}

// Write the label to the output file the judge reads.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", label, "utf8");

// Read it back and confirm the file holds exactly the label we validated,
// so a silent write failure can never pass unnoticed.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== label) {
  throw new Error("entry.txt does not match the validated label");
}
