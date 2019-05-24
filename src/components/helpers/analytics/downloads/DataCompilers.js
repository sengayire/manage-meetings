import JsPDF from 'jspdf';
import download from 'downloadjs';
import html2canvas from 'html2canvas';
import toastr from 'toastr';
import { bookedRooms, averageRoomCapacityData, averageMeetingDurationData, cancellationsData, averageMeetingTime, totalBookingsCountData, checkinsData, appBookingsData } from './JsxStringGenerators';
import { leastAndMostBookedRoomsCSV, totalBookingsCountCSV, percentageCheckinsAndCancellationsCSV, averageRoomCapacityCSV, averageMeetingTimeCSV, averageMeetingDurationsCSV } from './CsvGenerators';
import { getLeastBookedRooms, getMostBookedRooms } from '../MostAndLeastBooked';
import downloadFileString from '../../../../fixtures/downloadString';
import notification from '../../../../utils/notification';

const createDownloadString = (analytics, dateValue) => {
  const { startDate, endDate } = dateValue;
  const leastBookedRoomsTbody = bookedRooms(getLeastBookedRooms(analytics.analytics));
  const mostBookedRoomsTBody = bookedRooms(getMostBookedRooms(analytics.analytics));
  let downloadString = downloadFileString;
  downloadString = downloadString.replace(/startDate/g, startDate);
  downloadString = downloadString.replace(/endDate/g, endDate);
  downloadString = downloadString.replace(/innerMostBookedRooms/g, mostBookedRoomsTBody);
  downloadString = downloadString.replace(/innerLeastBookedRooms/g, leastBookedRoomsTbody);
  downloadString = downloadString.replace(
    /averageRoomCapacityData/g,
    averageRoomCapacityData(analytics.rooms),
  );
  downloadString = downloadString.replace(
    /averageMeetingsDuration/g,
    averageMeetingDurationData(analytics.analytics),
  );
  downloadString = downloadString.replace(/totalBookingsCount/g, totalBookingsCountData(analytics.bookingsCount));
  downloadString = downloadString.replace(/percentageCheckins/g, checkinsData(analytics));
  downloadString = downloadString.replace(/percentageAppBookings/g, appBookingsData(analytics));
  downloadString = downloadString.replace(
    /percentageAutoCancellations/g,
    cancellationsData(analytics),
  );
  downloadString = downloadString.replace(
    /averageTimeSpentDuringMeetings/g,
    averageMeetingTime(analytics.analytics),
  );
  return downloadString;
};

export const fetchDownload = (type, analytics, dateValue) => {
  notification(toastr, 'success', 'Your download will start shortly')();
  const div = document.createElement('div');
  div.innerHTML = createDownloadString(analytics, dateValue);
  document.body.appendChild(div);
  html2canvas(div).then((canvas) => {
    if (type === 'pdf') {
      const imgData = canvas.toDataURL('image/png');
      div.remove();
      const pdf = new JsPDF('p', 'pt', 'a4');
      pdf.addImage(imgData, 'PNG', 20, 20, 550, 720);
      pdf.save('analytics.pdf');
    } else {
      div.remove();
      download(canvas.toDataURL(), 'report.jpeg');
    }
  });
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
