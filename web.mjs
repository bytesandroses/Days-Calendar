import {
  getOccurrenceDate,
  monthNumber,
  getCalendarRange,
  getSpecialDays,
} from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

let currentDate = new Date();

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

function makeCell(date, month, specials) {
  const cell = document.createElement("td");
  const dayNum = date.getDate();
  const isCurrentMonth = date.getMonth() === month;

  cell.textContent = dayNum;

  if (!isCurrentMonth) {
    cell.className = "other-month";
  } else if (specials[dayNum] !== undefined) {
    const names = specials[dayNum].map((d) => d.name).join(", ");
    cell.innerHTML += `<br><span class="commemorative">${names}</span>`;
  }

  return cell;
}

function updateUI(year, month) {
  let caption = document.querySelector("#calendarTable caption");
  if (!caption) {
    caption = document.createElement("caption");
    document.getElementById("calendarTable").prepend(caption);
  }
  caption.textContent = `${monthNames[month]} ${year}`;

  document.getElementById("monthSelector").value = month;
  document.getElementById("yearInput").value = year;
}

function renderCalendar(year, month) {
  const tbody = document.getElementById("calendarDays");
  tbody.innerHTML = "";

  const { start, end } = getCalendarRange(year, month);
  const specials = getSpecialDays(year, month);

  let row = document.createElement("tr");
  const current = new Date(start);

  while (current <= end) {
    const cell = makeCell(current, month, specials);
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

  updateUI(year, month);
}

function setupHandlers() {
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");
  const generateBtn = document.getElementById("generateCalendar");
  const monthSelector = document.getElementById("monthSelector");
  const yearInput = document.getElementById("yearInput");

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  generateBtn.addEventListener("click", () => {
    const month = parseInt(monthSelector.value, 10);
    const year = parseInt(yearInput.value, 10);

    if (!isNaN(year)) {
      currentDate = new Date(year, month, 1);
      renderCalendar(year, month);
    }
  });
}

window.onload = () => {
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  setupHandlers();
};
