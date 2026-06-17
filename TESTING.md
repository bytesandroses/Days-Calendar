# TESTING.md

## Rubric Testing

For this group project, we built a commemorative days calendar. 

We tested non-trivial function: `getOccurrenceDate()` which calculates the exact date of a commemorative day for any given year based on month, weekday, and occurrence (first/second/third/last).

## Unit Tests

Testing Method: Unit tests in `common.test.mjs`

Why this is important: The entire project depends on correct date calculation. An off-by-one error would cause wrong dates in both the calendar UI and the iCal file.

How to Run Tests:

npm install
node --test


Files Tested:
 `common.mjs` - `getOccurrenceDate()` function

Tests:
- Ada Lovelace Day 2024 - October 8th
- World Lemur Day 2024 - October 25th
- International Binturong Day 2030 - May 11th
- International Vulture Awareness Day 2023 - September 2nd
- International Red Panda Day 2025 - September 20th

## Manual Testing

(October 2024 shows correct days) Opened the calendar, navigated to October 2024 and confirmed Ada Lovelace Day on the 8th and World Lemur Day on the 25th.

(October 2020 shows correct days) Navigated to October 2020 and confirmed Ada Lovelace Day on the 13th and World Lemur Day on the 30th.

(May 2030 shows correct days) Navigated to May 2030 and confirmed International Binturong Day on the 11th.

(Previous and next buttons work) Clicked previous and next buttons repeatedly and confirmed the calendar updates correctly with no errors.

(Jump to month works) Used the month/year selector to jump to a specific month and confirmed correct display.

(iCal file generates correctly) Ran `node generate-ical.mjs`, imported `days.ics` into Google Calendar and confirmed all commemorative days appear on the correct dates for 2020–2030.

(Lighthouse accessibility 100%) Ran Lighthouse in Chrome DevTools and confirmed 100% accessibility score.

(Unit tests written for non-trivial function) Unit tests in `common.test.mjs`.