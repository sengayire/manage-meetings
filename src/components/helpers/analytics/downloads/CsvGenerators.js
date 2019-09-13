import { getLeastBookedRooms, getMostBookedRooms } from '../MostAndLeastBooked';
import getCheckinsStatistics from '../Checkins';
import averageRoomCapacity from '../AverageRoomCapacity';
import getMeetingDurationAnalytics from '../AverageMeetingList';
import timeConvert from '../../timeConverter';
import getSectorWidths from '../AverageMeetingDuration';


/**
 * generates an array of booked rooms with their meetings and % share of meetings
 *
 * @param bookedRooms Object
 *
 * @returns Array
 *
 */
const bookedRoomsList = ({ bookedRooms }) => {
  const rows = [];
  for (let i = 0; i < bookedRooms.length; i += 1) {
    rows.push({
      room: bookedRooms[i].roomName,
      meetings: bookedRooms[i].numberOfBookings.toString(),
      share: bookedRooms[i].bookingsPercentageShare.toString(),
    });
  }
  return rows;
};

/**
 * generates an array for meetings from an object
 *
 * @param meetingListItem Object
 *
 * @returns {Array}
 *
 */
const createMeetingArray = meetingListItem => [
  meetingListItem.room,
  meetingListItem.meetings,
  meetingListItem.share,
];

/**
 * Formats the CSV data for Least and Most Booked Rooms
 * Inserts the formatted data into the csv spreadsheet
 *
 * @param {array} csvRows
 *
 * @returns {void}
*/
export const leastAndMostBookedRoomsCSV = (csvRows, analytics) => {
  const leastBookedRooms = getLeastBookedRooms(analytics);
  const mostBookedRooms = getMostBookedRooms(analytics);
  const percentOfShare = '% SHARE OF ALL MEETINGS'.replace(/ /g, '%20');
  const mostBookedTitle = 'Most Booked Rooms'.replace(/ /g, '%20');
  const leastBookedTitle = 'Least Booked Rooms'.replace(/ /g, '%20');
  const toWriteData = [['ROOM', 'MEETINGS', percentOfShare], [mostBookedTitle]];
  const mostUsedRoomsList = bookedRoomsList({ bookedRooms: mostBookedRooms });
  for (let i = 0; i < mostUsedRoomsList.length; i += 1) {
    toWriteData.push(createMeetingArray(mostUsedRoomsList[i]));
  }
  toWriteData.push([leastBookedTitle]);
  const leatUsedRoomsList = bookedRoomsList({ bookedRooms: leastBookedRooms });
  for (let i = 0; i < leatUsedRoomsList.length; i += 1) {
    toWriteData.push(createMeetingArray(leatUsedRoomsList[i]));
  }
  for (let i = 0; i < toWriteData.length; i += 1) {
    csvRows.push(toWriteData[i].join(','));
  }
};

/**
 * Formats the CSV data for Total Bookings
 * Inserts the formatted data into the csv spreadsheet
 *
 * @param {array} csvRows
 *
 * @returns {void}
 */
export const totalBookingsCountCSV = (csvRows, totalBookingsCount) => {
  const totalBookingsCountTitle = 'ANALYTICS FOR TOTAL BOOKINGS COUNT'.replace(/ /g, '%20');
  const totalBookingsCountAnalyticsTitle = [[totalBookingsCountTitle]];
  csvRows.push([]);
  let totalBookingsCountData = [];
  csvRows.push(totalBookingsCountAnalyticsTitle.join(','));
  const roomTitle = 'Date';
  const meetingsCount = 'Number of Bookings'.replace(/ /g, '%20');
  csvRows.push([[roomTitle, meetingsCount]]);
  totalBookingsCount.forEach((element) => {
    totalBookingsCountData = [
      `${element.period.toString()}`.replace(/ /g, '%20'),
      `${element.totalBookings.toString()}`,
    ];
    csvRows.push(totalBookingsCountData.join(','));
  });
};

/**
 * Formats the CSV data for Checkins and Cancellations Data
 * Inserts the formatted data into the csv spreadsheet
 *
 * @param {array} csvRows
 *
 * @returns {void}
 */
export const percentageCheckinsAndCancellationsCSV = (csvRows, analytics) => {
  const checkinsHeaderTitle = 'ANALYTICS FOR CHECKINS'.replace(/ /g, '%20');
  const checkinsAnalyticsTitle = [[checkinsHeaderTitle]];
  csvRows.push([]);
  const { checkins, bookings, autoCancellations: cancellations } = getCheckinsStatistics(analytics);
  const { checkinsPercentage, cancellationsPercentage } = analytics;
  let checkinsData = [];
  checkinsData = [
    `${bookings.toString()}`,
    `${checkins.toString()}`,
    `${Math.round(checkinsPercentage, 1).toString()}%`,
  ];
  csvRows.push(checkinsAnalyticsTitle.join(','));
  const bookingsTitle = 'Total Bookings'.replace(/ /g, '%20');
  const checkinsTitle = 'Total Checkins'.replace(/ /g, '%20');
  const percentageCheckinsTitle = 'Percentage Checkins'.replace(/ /g, '%20');
  csvRows.push([[bookingsTitle, checkinsTitle, percentageCheckinsTitle]]);
  csvRows.push(checkinsData.join(','));
  const cancellationsHeaderTitle = 'ANALYTICS FOR CANCELLATIONS'.replace(/ /g, '%20');
  const cancellationsAnalyticsTitle = [[cancellationsHeaderTitle]];
  csvRows.push([]);

  const cancellationsData = [
    `${bookings.toString()}`,
    `${cancellations.toString()}`,
    `${Math.round(cancellationsPercentage, 1).toString()}%`,
  ];
  csvRows.push(cancellationsAnalyticsTitle.join(','));
  const cancellationsTitle = 'Total Auto Cancellations'.replace(/ /g, '%20');
  const percentageCancellationsTitle = 'Percentage of Auto Cancellations'.replace(/ /g, '%20');
  csvRows.push([[bookingsTitle, cancellationsTitle, percentageCancellationsTitle]]);
  csvRows.push(cancellationsData.join(','));
};

/**
 * Formats the CSV data for Average Room Capacity
 * Inserts the formatted data into the csv spreadsheet
 *
 * @param {array} csvRows
 *
 * @returns {void}
 */
export const averageRoomCapacityCSV = (csvRows, rooms) => {
  const averageRoomCapacityTitle = 'ANALYTICS FOR AVERAGE ROOM CAPACITY'.replace(/ /g, '%20');
  const averageRoomCapacityAnalyticsTitle = [[averageRoomCapacityTitle]];
  const roomCapacity = averageRoomCapacity(rooms);
  const {
    lessThanTenData,
    betweenTenandTwentyData,
    greaterThanTwentyData,
  } = roomCapacity;
  csvRows.push([]);
  let averageRoomCapacityData = [];
  averageRoomCapacityData = [
    `${lessThanTenData.toString()}%`,
    `${betweenTenandTwentyData.toString()}%`,
    `${greaterThanTwentyData.toString()}%`,
  ];
  csvRows.push(averageRoomCapacityAnalyticsTitle.join(','));
  const lessThanTenTitle = 'Less Than 10 People'.replace(/ /g, '%20');
  const between10And20Title = 'Between 10 and 20 People'.replace(/ /g, '%20');
  const greaterThan20Title = 'Greater Than 20 People'.replace(/ /g, '%20');
  csvRows.push([[lessThanTenTitle, between10And20Title, greaterThan20Title]]);
  csvRows.push(averageRoomCapacityData.join(','));
};

/**
 * Formats the CSV data for Average Meeting Times
 * Inserts the formatted data into the csv spreadsheet
 *
 * @param {array} csvRows
 *
 * @returns {void}
 */
export const averageMeetingTimeCSV = (csvRows, analytics) => {
  const averageMeetingTimeTitle = 'ANALYTICS FOR AVERAGE MEETING TIME'.replace(/ /g, '%20');
  const averageMeetingTimeAnalyticsTitle = [[averageMeetingTimeTitle]];
  csvRows.push([]);
  const meetingsDurationAnalytics = getMeetingDurationAnalytics(analytics);
  let averageMeetingTimeData = [];
  csvRows.push(averageMeetingTimeAnalyticsTitle.join(','));
  const roomTitle = 'Meeting Room'.replace(/ /g, '%20');
  const meetingsCount = 'Number of Meetings'.replace(/ /g, '%20');
  const averageMeetingTimeTitleString = 'Average Meeting Time'.replace(/ /g, '%20');
  csvRows.push([[roomTitle, meetingsCount, averageMeetingTimeTitleString]]);
  meetingsDurationAnalytics.forEach((element) => {
    averageMeetingTimeData = [
      `${element.roomName.toString()}`.replace(/ /g, '%20'),
      `${element.count.toString()}`,
      `${timeConvert(element.totalDuration)}`.replace(/ /g, '%20'),
    ];
    csvRows.push(averageMeetingTimeData.join(','));
  });
};

/**
 * Formats the CSV data for Average Meeting Duration
 * Inserts the formatted data into the csv spreadsheet
 *
 * @param {array} csvRows
 *
 * @returns {void}
 */
export const averageMeetingDurationsCSV = (csvRows, analytics) => {
  const averageMeetingDurationTitle = 'ANALYTICS FOR AVERAGE MEETING DURATIONS'.replace(
    / /g,
    '%20',
  );
  const averageMeetingDurationAnalyticsTitle = [[averageMeetingDurationTitle]];
  csvRows.push([]);
  const averageMeetingDuration = getSectorWidths(analytics);
  let averageMeetingDurationData = [];
  averageMeetingDurationData = [
    `${averageMeetingDuration[0].toString()}%`,
    `${averageMeetingDuration[1].toString()}%`,
    `${averageMeetingDuration[2].toString()}%`,
    `${averageMeetingDuration[3].toString()}%`,
  ];
  csvRows.push(averageMeetingDurationAnalyticsTitle.join(','));
  const greaterThan60MinutesTitle = 'More Than 60 Minutes'.replace(/ /g, '%20');
  const between45And60MinutesTitle = 'Between 45 and 60 Minutes'.replace(/ /g, '%20');
  const between30And45MinutesTitle = 'Between 30 and 45 Minutes'.replace(/ /g, '%20');
  const below30MinutesTitle = 'Below 30 Minutes'.replace(/ /g, '%20');
  csvRows.push([
    [
      greaterThan60MinutesTitle,
      between45And60MinutesTitle,
      between30And45MinutesTitle,
      below30MinutesTitle,
    ],
  ]);
  csvRows.push(averageMeetingDurationData.join(','));
};
