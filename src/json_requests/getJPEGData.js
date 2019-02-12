import axios from 'axios';
import { getToken } from '../utils/Cookie';

const token = getToken();
const { BASE_URL } = process.env;
export const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

/**
 * export data as JPEG format
 * @param {string} startDate - start date
 * @param {string} endDate -  end date
 */
/* istanbul ignore next */
const getDataAsJPEG = (startDate, endDate) =>
  apiRequest.post('', {
    start_date: startDate,
    end_date: endDate,
    file_type: 'html',
  });

export default getDataAsJPEG;
