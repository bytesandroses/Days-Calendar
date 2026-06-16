import getOccurrenceDate from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function getCalendarRange(year, month) {
  const firstDay = new Date(year, month, 1, 12, 0, 0);
  const lastDay = new Date(year, month + 1, 0, 12, 0, 0);

  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  const end = new Date(lastDay);
  end.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  return { start, end };
}
