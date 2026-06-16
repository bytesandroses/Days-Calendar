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

function getSpecialDays(year, month) {
  const specials = {};

  for (let i = 0; i < daysData.length; i++) {
    const day = daysData[i];

    if (monthNumber[day.monthName] === month) {
      const dateNum = getOccurrenceDate(
        year,
        day.monthName,
        day.dayName,
        day.occurrence,
      );

      if (dateNum !== null) {
        if (specials[dateNum] === undefined) {
          specials[dateNum] = [];
        }
        specials[dateNum].push(day);
      }
    }
  }

  return specials;
}
