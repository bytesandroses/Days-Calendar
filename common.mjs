import daysData from "./days.json" with { type: "json" };

export const monthNumber = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const weekNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function getOccurrenceDate(year, monthName, dayName, occurrence) {
  const monthStartWeekday = new Date(year, monthNumber[monthName], 1).getDay(); //exact day of the week 0-6
  const targetWeekday = weekNumber[dayName];
  const daysUntilFirst = (targetWeekday - monthStartWeekday + 7) % 7; //Calculates how many days need to be added to the 1st of the month to arrive at the required day of the week.

  const lastDayOfMonth = new Date(
    year,
    monthNumber[monthName] + 1,
    0,
  ).getDate();
  const lastDayOfWeek = new Date(year, monthNumber[monthName] + 1, 0).getDay();

  const result =
    occurrence === "first"
      ? daysUntilFirst + 1
      : occurrence === "second"
        ? daysUntilFirst + 8
        : occurrence === "third"
          ? daysUntilFirst + 15
          : occurrence === "last"
            ? lastDayOfMonth - ((lastDayOfWeek - targetWeekday + 7) % 7)
            : null;
  return result;
}

export function getCalendarRange(year, month) {
  const firstDay = new Date(year, month, 1, 12, 0, 0);
  const lastDay = new Date(year, month + 1, 0, 12, 0, 0);

  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  const end = new Date(lastDay);
  end.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  return { start, end };
}

export function getSpecialDays(year, month) {
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
