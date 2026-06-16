import { getOccurrenceDate, monthNumber } from "./common.mjs";
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

function renderCalendar(year, month) {
  const tbody = document.getElementById("calendarDays");
  tbody.innerHTML = "";

  const { start, end } = getCalendarRange(year, month);
  const specials = getSpecialDays(year, month);

  let row = document.createElement("tr");
  const current = new Date(start);

  while (current <= end) {
    const cell = document.createElement("td");
    const dayNum = current.getDate();
    const isCurrentMonth = current.getMonth() === month;

    cell.textContent = dayNum;

    if (!isCurrentMonth) {
      cell.className = "other-month";
    } else if (specials[dayNum] !== undefined) {
      const names = specials[dayNum].map((d) => d.name).join(", ");
      cell.innerHTML += `<br><span class="commemorative">${names}</span>`;
    }

    row.appendChild(cell);

    if (current.getDay() === 6) {
      tbody.appendChild(row);
      row = document.createElement("tr");
    }

    current.setDate(current.getDate() + 1);
  }

  if (row.children.length) {
    tbody.appendChild(row);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let caption = document.querySelector("#calendarTable caption");
  if (!caption) {
    caption = document.createElement("caption");
    document.getElementById("calendarTable").prepend(caption);
  }
  caption.textContent = `${monthNames[month]} ${year}`;

  document.getElementById("monthSelector").value = month;
  document.getElementById("yearInput").value = year;
}

let currentDate = new Date();

window.onload = () => {
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

  document.getElementById("prevMonthBtn").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  document.getElementById("nextMonthBtn").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });
};
