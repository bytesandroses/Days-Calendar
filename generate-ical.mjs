import { getOccurrenceDate, monthNumber } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { writeFileSync } from "node:fs";

let allEvents = "";

for (const day of daysData) {
    for (let counter = 2020; counter <= 2030; counter++) {
        const event = getOccurrenceDate(
        counter,
        day.monthName,
        day.dayName,
        day.occurrence,
    );
    const yyyymmdd = `${counter}${(monthNumber[day.monthName] + 1).toString().padStart(2, "0")}${event.toString().padStart(2, "0")}`;

    const vevent = `BEGIN:VEVENT
DTSTART;VALUE=DATE:${yyyymmdd}
SUMMARY:${day.name}
END:VEVENT`;
    allEvents += vevent + "\n";
    }
}

const icalContent = `BEGIN:VCALENDAR\n${allEvents}END:VCALENDAR`;

writeFileSync("days.ics", icalContent);