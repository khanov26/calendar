export function createMonthDays(selectedDate) {
  const date = new Date(selectedDate.getTime());
  date.setDate(1);
  const days = [];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  while (date.getMonth() === selectedDate.getMonth()) {
    days.push({
      weekday: date.toLocaleDateString('en', {weekday: 'narrow'}),
      day: date.getDate(),
      dateLabel: `${year}-${month}-${String(date.getDate()).padStart(2, 0)}`,
    });
    date.setDate(date.getDate() + 1);
  }

  return days;
}
