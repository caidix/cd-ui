function getDate(year, month, day) {
  return new Date(year, month, day);
}
function getYearMonthDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
}

function formatDays(date) {
  const { year, month } = getYearMonthDay(date);
  const currentDay = getDate(year, month, 1);
  let week = currentDay.getDay();
  if (week === 0) {
    week = 7;
  }
  const startDay = currentDay - week * 60 * 60 * 24 * 1000;
  let arr = [];
  for (let index = 1; index <= 42; index++) {
    arr.push(new Date(startDay + index * 60 * 60 * 24 * 1000));
  }
  return arr;
}

export default {
  getYearMonthDay,
  formatDays,
};
