const day = 86400 * 1000;
const week = day * 7;
const month = day * 30;

const today = new Date()
  .toDateString()
  .split(' ')
  .slice(1)
  .join(' ');

const oneWeekAgo = new Date(new Date() - week)
  .toDateString()
  .split(' ')
  .slice(1)
  .join(' ');

const oneMonthAgo = new Date(new Date() - month)
  .toDateString()
  .split(' ')
  .slice(1)
  .join(' ');

const oneQuaterAgo = new Date(new Date() - month * 3)
  .toDateString()
  .split(' ')
  .slice(1)
  .join(' ');

export default {
  day,
  week,
  month,
  today,
  oneWeekAgo,
  oneMonthAgo,
  oneQuaterAgo,
};
