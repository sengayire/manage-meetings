import moment from 'moment';

const dateChecker = day => moment(day).format('MMM DD Y') === moment().format('MMM DD Y');

export default dateChecker;
