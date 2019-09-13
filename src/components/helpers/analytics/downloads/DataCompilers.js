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
import { totalCleanlinessRating, totalMissingItemsCount } from '../../../roomFeedback/RoomFeedbackResponseList';
import { getResponseSuggestion } from '../../../roomFeedback/RoomFeedbackResponse';
import { covertArrayOfObjectToCsv, csvDownload } from '../../CsvDownload';
import { feedbackHtmlTemplate, feedbackSub } from '../../../../fixtures/feedbackDownloadString';

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

const formatFeedbackResponses = (feedbackResponse) => {
  const formatedResponse = feedbackResponse.roomsResponses.map(
    ({ roomName, totalResponses, response }) => {
      const { grade } = totalCleanlinessRating(response);
      const totalMissingItems = totalMissingItemsCount(response);
      const suggestions = getResponseSuggestion(response);
      return {
        'Room name': roomName,
        'Total Responses': totalResponses,
        'Cleanliness rating': !grade ? 'not available' : grade,
        'Total Missing Items': totalMissingItems,
        Suggestions: suggestions,
      };
    },
  );
  return formatedResponse;
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

const fetchPageCanvas = async (selector) => {
  const page = document.querySelector(selector);
  const canvas = await html2canvas(page);
  return { page, canvas };
};

const downloadFeedbackResponses = async (downloadData, type) => {
  const formatedDownloadData = formatFeedbackResponses(downloadData);
  const div = document.createElement('div');
  div.innerHTML = (type === 'pdf') ? feedbackHtmlTemplate(downloadData, formatedDownloadData.splice(0, 5)) : feedbackHtmlTemplate(downloadData, formatedDownloadData);
  document.body.appendChild(div);
  const { page: page1, canvas } = await fetchPageCanvas('.feedback-download');
  const imageData = canvas.toDataURL('image/jpeg');
  if (type === 'pdf') {
    const pdf = new JsPDF('l', 'px', 'a4');
    pdf.addImage(imageData, 'PNG', 35, 40, page1.clientWidth / 2.6, page1.clientHeight / 3);
    while (formatedDownloadData.length > 0) {
      div.innerHTML = '';
      div.innerHTML = feedbackSub(formatedDownloadData.splice(0, 5));
      document.body.appendChild(div);
      // eslint-disable-next-line no-await-in-loop
      const { page: page2, canvas: canvas2 } = await fetchPageCanvas('.feedback-sub-download');
      const imgData2 = canvas2.toDataURL();
      pdf.addPage('l', 'px', 'a4');
      pdf.addImage(imgData2, 'PNG', 35, 40, page2.clientWidth / 2.6, page2.clientHeight / 3);
      div.remove();
    }
    pdf.save('feedback response.pdf');
    div.remove();
  } else {
    await download(imageData, 'feedback response.jpeg');
    div.remove();
  }
};
export const fetchDownload = async (type, downloadData, dateValue, downloadDataName) => {
  notification(toastr, 'success', 'Your download will start shortly')();
  const div = document.createElement('div');
  div.classList.add('download-div');
  if (downloadDataName === 'analytics') {
    div.innerHTML = createDownloadString(downloadData, dateValue);
    document.body.appendChild(div);
    addCharts(downloadData, dateValue);
    if (type === 'pdf') {
      const { page, canvas } = await fetchPageCanvas('.analytics-download');
      await downloadPdf(page, canvas);
    } else {
      const { canvas } = await fetchPageCanvas('.download-div');
      await download(canvas.toDataURL(), 'report.jpeg');
    }
  }
  if (downloadDataName === 'feedbackResponses') {
    downloadFeedbackResponses(downloadData, type);
  }
  div.remove();
};


export const downloadCSV = (downloadData, downloadDataName) => {
  notification(toastr, 'success', 'Your download will start shortly')();
  let csvRows = [];
  let csvString;
  if (downloadDataName === 'analytics') {
    leastAndMostBookedRoomsCSV(csvRows, downloadData.analytics);
    totalBookingsCountCSV(csvRows, downloadData.bookingsCount);
    percentageCheckinsAndCancellationsCSV(csvRows, downloadData);
    averageRoomCapacityCSV(csvRows, downloadData.rooms);
    averageMeetingTimeCSV(csvRows, downloadData.analytics);
    averageMeetingDurationsCSV(csvRows, downloadData.analytics);
    csvString = csvRows.join('%0A');
    return csvDownload(csvString, 'analytics');
  }
  if (downloadDataName === 'feedbackResponses') {
    const feedbackSummary = [{ 'Rooms with missing items': 5, 'Total average rating': 4, 'Total responses': 20 }];
    csvRows = formatFeedbackResponses(downloadData);
    csvString = (covertArrayOfObjectToCsv(csvRows));
    const feedbackSummaryCsvString = (covertArrayOfObjectToCsv(feedbackSummary));
    const final = `${csvString}%0A${feedbackSummaryCsvString}`;
    return csvDownload(final, 'feedback response');
  }
  return null;
};
