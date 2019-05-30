import JsPDF from 'jspdf';
import download from 'downloadjs';
import html2canvas from 'html2canvas';
import toastr from 'toastr';
import { bookedRooms, averageMeetingTime, totalBookingsCountData } from './JsxStringGenerators';
import { leastAndMostBookedRoomsCSV, totalBookingsCountCSV, percentageCheckinsAndCancellationsCSV, averageRoomCapacityCSV, averageMeetingTimeCSV, averageMeetingDurationsCSV } from './CsvGenerators';
import { getLeastBookedRooms, getMostBookedRooms } from '../MostAndLeastBooked';
import downloadFileString from '../../../../fixtures/downloadString';
import notification from '../../../../utils/notification';
import addCharts from './AddCharts';

const downloadPdf = async (page1, canvas) => {
  const page2 = document.querySelector('.page2-download');
  const page3 = document.querySelector('.page3-download');

  const imgData = canvas.toDataURL('image/jpeg');
  const pdf = new JsPDF('l', 'px', 'a4');
  pdf.addImage(imgData, 'PNG', 35, 0, page1.clientWidth / 3, page1.clientHeight / 3);

  const canvas2 = await html2canvas(page2);
  const img2Data = canvas2.toDataURL('image/jpeg');
  pdf.addPage('a4', 'l');
  pdf.addImage(img2Data, 'PNG', 35, 0, page2.clientWidth / 3, page2.clientHeight / 3);

  const canvas3 = await html2canvas(page3);
  const img3Data = canvas3.toDataURL('image/jpeg');
  pdf.addPage('a4', 'l');
  pdf.addImage(img3Data, 'PNG', 35, 0, page3.clientWidth / 3, page3.clientHeight / 3);

  pdf.save('analytics.pdf');
};

const createDownloadString = (analytics, dateValue) => {
  const { startDate, endDate } = dateValue;
  const leastBookedRoomsTbody = bookedRooms(getLeastBookedRooms(analytics.analytics));
  const mostBookedRoomsTBody = bookedRooms(getMostBookedRooms(analytics.analytics));
  let downloadString = downloadFileString;
  downloadString = downloadString.replace(/startDate/g, startDate);
  downloadString = downloadString.replace(/endDate/g, endDate);
  downloadString = downloadString.replace(/innerMostBookedRooms/g, mostBookedRoomsTBody);
  downloadString = downloadString.replace(/innerLeastBookedRooms/g, leastBookedRoomsTbody);
  downloadString = downloadString.replace(/totalBookingsCount/g, totalBookingsCountData(analytics.bookingsCount));
  downloadString = downloadString.replace(
    /averageTimeSpentDuringMeetings/g,
    averageMeetingTime(analytics.analytics),
  );
  return downloadString;
};

export const fetchDownload = async (type, analytics, dateValue) => {
  notification(toastr, 'success', 'Your download will start shortly')();
  const div = document.createElement('div');
  div.classList.add('download-div');
  div.innerHTML = createDownloadString(analytics, dateValue);
  document.body.appendChild(div);
  addCharts(analytics, dateValue);
  const page1 = type === 'pdf' ? document.querySelector('.analytics-download')
    : document.querySelector('.download-div');
  const canvas = await html2canvas(page1);
  if (type === 'pdf') {
    await downloadPdf(page1, canvas);
  } else {
    await download(canvas.toDataURL(), 'report.jpeg');
  }
  div.remove();
};

export const downloadCSV = (analytics) => {
  notification(toastr, 'success', 'Your download will start shortly')();
  const csvRows = [];
  leastAndMostBookedRoomsCSV(csvRows, analytics.analytics);
  totalBookingsCountCSV(csvRows, analytics.bookingsCount);
  percentageCheckinsAndCancellationsCSV(csvRows, analytics);
  averageRoomCapacityCSV(csvRows, analytics.rooms);
  averageMeetingTimeCSV(csvRows, analytics.analytics);
  averageMeetingDurationsCSV(csvRows, analytics.analytics);
  const csvString = csvRows.join('%0A');
  const anchorElement = document.createElement('a');
  anchorElement.href = `data:attachment/csv,${csvString}`;
  anchorElement.download = 'analytics.csv';
  anchorElement.target = '_blank';
  document.body.append(anchorElement);
  anchorElement.click();
};
