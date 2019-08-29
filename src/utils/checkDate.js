import moment from 'moment';

const dateChecker = day => moment(day).format('ddd ll') === moment().format('ddd ll');

export default dateChecker;
