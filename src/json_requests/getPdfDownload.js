import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/Utilities';

const token = getItemFromLocalStorage('MRM_AUTH_TOKEN');
const { BASE_URL } = process.env;
export const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
/* istanbul ignore next */
const downloadAnalyticsData = (startDate, endDate, fileType) =>
  apiRequest.post('', {
    start_date: startDate,
    end_date: endDate,
    file_type: fileType,
  });
export default downloadAnalyticsData;
