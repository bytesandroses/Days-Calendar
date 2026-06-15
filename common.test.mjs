import { getOccurrenceDate } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("test for Ada Lovelace Day", () => {
  assert.equal(getOccurrenceDate(2024, "October", "Tuesday", "second"), 8);
});

test("test for World Lemur Day", () => {
  assert.equal(getOccurrenceDate(2024, "October", "Friday", "last"), 25);
});

test("test for International Binturong Day", () => {
  assert.equal(getOccurrenceDate(2030, "May", "Saturday", "second"), 11);
});

test("test for International Vulture Awareness Day", () => {
  assert.equal(getOccurrenceDate(2023, "September", "Saturday", "first"), 2);
});

test("test for International Red Panda Day", () => {
  assert.equal(getOccurrenceDate(2025, "September", "Saturday", "third"), 20);
});