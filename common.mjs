// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
  return "Hello";
}

export function generateCalendar(year, month) {
  const calendarGrid = [];
  const inputDate = new Date(year, month, 1);
  const firstDay = inputDate.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  TODO;
}
