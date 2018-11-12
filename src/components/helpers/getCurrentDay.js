
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const newDay = () => (new Date()).getDate();
const newMonth = () => months[(new Date()).getMonth()];
const newYear = () => (new Date()).getFullYear();

const currentDate = () => (`${newMonth()} ${newDay()} ${newYear()}`);

export default currentDate;
