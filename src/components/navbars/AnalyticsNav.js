/* eslint-disable new-cap,react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import toastr from 'toastr';
import html2canvas from 'html2canvas';
import jsxToString from 'jsx-to-string';
import jsPDF from 'jspdf';
import download from 'downloadjs';
import moment from 'moment';
import Button from '../commons/Button';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import '../../assets/styles/table.scss';
import Calendar from '../../components/commons/Calendar';
import notification from '../../utils/notification';
import AnalyticsActivity from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import ExportButton from '../commons/ExportButton';
import downloadFileString from '../../fixtures/downloadString';
import timeConvert from '../../components/helpers/timeConverter';
import { getUserDetails } from '../helpers/QueriesHelpers';

/**
 * Component for Analytics
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
export class AnalyticsNav extends Component {
  state = {
    isActivity: false,
    location: 'Fetching location...',
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    validatedStartDate: moment().format('MMM DD Y'),
    validatedEndDate: moment().format('MMM DD Y'),
    isFutureDateSelected: false,
    fetching: false,
    error: '',
    componentsDoneLoading: [],
    leastBookedRooms: [],
    mostBookedRooms: [],
    roomCapacity: [],
    averageMeetingDuration: [],
    averageMeetingTime: {},
    checkinsAndCancellations: [],
    totalBookingsCount: [],
    role: 0,
  };

  componentDidMount() {
    this.setUserLocationAndRole();
  }

  componentWillReceiveProps(props) {
    this.setState({ fetching: true, error: props.error });
  }

  /**
   * Sets the current user's location and role
   *
   * @returns {void}
   */
  setUserLocationAndRole = async () => {
    const user = await getUserDetails();
    this.setState({ location: user.location, role: user.roles[0].id });
  }

  /**
   * Updates the state with the data coming from the children
   * components
   *
   * @param {string} type
   * @param {object} analytics
   *
   * @returns {void}
   */
  updateParent = (type, analytics) => {
    this.setState((prevState) => {
      const stateParameter = prevState;
      stateParameter[`${type}`] = analytics;
      stateParameter.fetching = false;
    });
  }

  /**
   * Formats the CSV data for Least and Most Booked Rooms
   * Inserts the formatted data into the csv spreadsheet
   *
   * @param {array} csvRows
   *
   * @returns {void}
   */
  leastAndMostBookedRoomsCSV = (csvRows) => {
    const {
      leastBookedRooms, mostBookedRooms,
    } = this.state;
    const percentOfShare = '% SHARE OF ALL MEETINGS'.replace(/ /g, '%20');
    const mostBookedTitle = 'Most Booked Rooms'.replace(/ /g, '%20');
    const leastBookedTitle = 'Least Booked Rooms'.replace(/ /g, '%20');
    const toWriteData = [['ROOM', 'MEETINGS', percentOfShare], [mostBookedTitle]];
    const mostUsedRoomsList = this.bookedRoomsList({ bookedRooms: mostBookedRooms });
    for (let i = 0; i < mostUsedRoomsList.length; i += 1) {
      toWriteData.push(this.createMeetingArray(mostUsedRoomsList[i]));
    }
    toWriteData.push([leastBookedTitle]);
    const leatUsedRoomsList = this.bookedRoomsList({ bookedRooms: leastBookedRooms });
    for (let i = 0; i < leatUsedRoomsList.length; i += 1) {
      toWriteData.push(this.createMeetingArray(leatUsedRoomsList[i]));
    }
    for (let i = 0; i < toWriteData.length; i += 1) {
      csvRows.push(toWriteData[i].join(','));
    }
  }

  /**
   * Formats the CSV data for Checkins and Cancellations Data
   * Inserts the formatted data into the csv spreadsheet
   *
   * @param {array} csvRows
   *
   * @returns {void}
   */
  percentageCheckinsAndCancellationsCSV = (csvRows) => {
    const checkinsHeaderTitle = 'ANALYTICS FOR CHECKINS'.replace(/ /g, '%20');
    const checkinsAnalyticsTitle = [[checkinsHeaderTitle]];
    csvRows.push([]);
    const { checkins, bookings, checkinsPercentage } =
    this.state.checkinsAndCancellations;
    let checkinsData = [];
    checkinsData = [`${bookings.toString()}`, `${checkins.toString()}`,
      `${Math.round(checkinsPercentage, 1).toString()}%`];
    csvRows.push(checkinsAnalyticsTitle.join(','));
    const bookingsTitle = 'Total Bookings'.replace(/ /g, '%20');
    const checkinsTitle = 'Total Checkins'.replace(/ /g, '%20');
    const percentageCheckinsTitle = 'Percentage Checkins'.replace(/ /g, '%20');
    csvRows.push([[bookingsTitle, checkinsTitle, percentageCheckinsTitle]]);
    csvRows.push(checkinsData.join(','));
    const cancellationsHeaderTitle = 'ANALYTICS FOR CANCELLATIONS'.replace(/ /g, '%20');
    const cancellationsAnalyticsTitle = [[cancellationsHeaderTitle]];
    csvRows.push([]);
    const { cancellations, cancellationsPercentage } =
    this.state.checkinsAndCancellations;
    const cancellationsData = [`${bookings.toString()}`, `${cancellations.toString()}`,
      `${Math.round(cancellationsPercentage, 1).toString()}%`];
    csvRows.push(cancellationsAnalyticsTitle.join(','));
    const cancellationsTitle = 'Total Auto Cancellations'.replace(/ /g, '%20');
    const percentageCancellationsTitle = 'Percentage of Auto Cancellations'.replace(/ /g, '%20');
    csvRows.push([[bookingsTitle, cancellationsTitle, percentageCancellationsTitle]]);
    csvRows.push(cancellationsData.join(','));
  }

  /**
   * Formats the CSV data for Total Bookings
   * Inserts the formatted data into the csv spreadsheet
   *
   * @param {array} csvRows
   *
   * @returns {void}
   */
  totalBookingsCountCSV = (csvRows) => {
    const totalBookingsCountTitle = 'ANALYTICS FOR TOTAL BOOKINGS COUNT'.replace(/ /g, '%20');
    const totalBookingsCountAnalyticsTitle = [[totalBookingsCountTitle]];
    csvRows.push([]);
    const { totalBookingsCount } = this.state;
    let totalBookingsCountData = [];
    csvRows.push(totalBookingsCountAnalyticsTitle.join(','));
    const roomTitle = 'Date';
    const meetingsCount = 'Number of Bookings'.replace(/ /g, '%20');
    csvRows.push([[roomTitle, meetingsCount]]);
    totalBookingsCount.forEach((element) => {
      totalBookingsCountData = [`${element.period.toString()}`.replace(/ /g, '%20'),
        `${element.bookings.toString()}`];
      csvRows.push(totalBookingsCountData.join(','));
    });
  }

  /**
   * Formats the CSV data for Average Meeting Times
   * Inserts the formatted data into the csv spreadsheet
   *
   * @param {array} csvRows
   *
   * @returns {void}
   */
  averageMeetingTimeCSV = (csvRows) => {
    const averageMeetingTimeTitle = 'ANALYTICS FOR AVERAGE MEETING TIME'.replace(/ /g, '%20');
    const averageMeetingTimeAnalyticsTitle = [[averageMeetingTimeTitle]];
    csvRows.push([]);
    const { averageMeetingTime } = this.state;
    let averageMeetingTimeData = [];
    csvRows.push(averageMeetingTimeAnalyticsTitle.join(','));
    const roomTitle = 'Meeting Room'.replace(/ /g, '%20');
    const meetingsCount = 'Number of Meetings'.replace(/ /g, '%20');
    const averageMeetingTimeTitleString = 'Average Meeting Time'.replace(/ /g, '%20');
    csvRows.push([[roomTitle, meetingsCount, averageMeetingTimeTitleString]]);
    averageMeetingTime.MeetingsDurationaAnalytics.forEach((element) => {
      averageMeetingTimeData = [`${element.roomName.toString()}`.replace(/ /g, '%20'), `${element.count.toString()}`,
        `${timeConvert(element.totalDuration)}`.replace(/ /g, '%20')];
      csvRows.push(averageMeetingTimeData.join(','));
    });
  }

  /**
   * Formats the CSV data for Average Room Capacity
   * Inserts the formatted data into the csv spreadsheet
   *
   * @param {array} csvRows
   *
   * @returns {void}
   */
  averageRoomCapacityCSV = (csvRows) => {
    const averageRoomCapacityTitle = 'ANALYTICS FOR AVERAGE ROOM CAPACITY'.replace(/ /g, '%20');
    const averageRoomCapacityAnalyticsTitle = [[averageRoomCapacityTitle]];
    csvRows.push([]);
    const { lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData } =
    this.state.roomCapacity;
    let averageRoomCapacityData = [];
    averageRoomCapacityData = [`${lessThanTenData.toString()}%`,
      `${betweenTenandTwentyData.toString()}%`,
      `${greaterThanTwentyData.toString()}%`];
    csvRows.push(averageRoomCapacityAnalyticsTitle.join(','));
    const lessThanTenTitle = 'Less Than 10 People'.replace(/ /g, '%20');
    const between10And20Title = 'Between 10 and 20 People'.replace(/ /g, '%20');
    const greaterThan20Title = 'Greater Than 20 People'.replace(/ /g, '%20');
    csvRows.push([[lessThanTenTitle, between10And20Title, greaterThan20Title]]);
    csvRows.push(averageRoomCapacityData.join(','));
  }

  /**
   * Formats the CSV data for Average Meeting Duration
   * Inserts the formatted data into the csv spreadsheet
   *
   * @param {array} csvRows
   *
   * @returns {void}
   */
  averageMeetingDurationsCSV = (csvRows) => {
    const averageMeetingDurationTitle = 'ANALYTICS FOR AVERAGE MEETING DURATIONS'.replace(/ /g, '%20');
    const averageMeetingDurationAnalyticsTitle = [[averageMeetingDurationTitle]];
    csvRows.push([]);
    const {
      averageMeetingDuration,
    } = this.state;
    let averageMeetingDurationData = [];
    averageMeetingDurationData = [`${averageMeetingDuration[0].toString()}%`,
      `${averageMeetingDuration[1].toString()}%`,
      `${averageMeetingDuration[2].toString()}%`, `${averageMeetingDuration[3].toString()}%`];
    csvRows.push(averageMeetingDurationAnalyticsTitle.join(','));
    const greaterThan60MinutesTitle = 'More Than 60 Minutes'.replace(/ /g, '%20');
    const between45And60MinutesTitle = 'Between 45 and 60 Minutes'.replace(/ /g, '%20');
    const between30And45MinutesTitle = 'Between 30 and 45 Minutes'.replace(/ /g, '%20');
    const below30MinutesTitle = 'Below 30 Minutes'.replace(/ /g, '%20');
    csvRows.push([[greaterThan60MinutesTitle, between45And60MinutesTitle,
      between30And45MinutesTitle, below30MinutesTitle]]);
    csvRows.push(averageMeetingDurationData.join(','));
  }

  /**
   * It toggles the calendar view
   *
   * @returns {void}
   */
  calenderToggle = () => {
    const { calenderOpen } = this.state;
    this.setState({ calenderOpen: !calenderOpen });
  };

  /**
   * sets state of view to overview
   *
   * @returns {void}
   */
  toggleView = () => {
    this.setState({
      isActivity: !this.state.isActivity,
    });
  };

  /**
   * generates jsx from bookedRoomsList and converts it to a string
   *
   * @param bookedRoomsList Object
   *
   * @returns String
   *
   */
  bookedRooms = ({ bookedRoomsList }) => (
    jsxToString(
      <tbody>
        {bookedRoomsList.map((room, index) => (
          <tr key={index}>
            <td>{room.roomName}</td>
            <td>{room.meetings.toString()}</td>
            <td>{`${room.percentage.toString()}%`}</td>
          </tr>
        ))}
      </tbody>)
  );

  /**
   * generates an array of booked rooms with their meetings and % share of meetings
   *
   * @param bookedRooms Object
   *
   * @returns Array
   *
   */
  bookedRoomsList = ({ bookedRooms }) => {
    const rows = [];
    for (let i = 0; i < bookedRooms.length; i += 1) {
      rows.push({
        room: bookedRooms[i].roomName,
        meetings: bookedRooms[i].meetings.toString(),
        share: bookedRooms[i].percentage.toString(),
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
  createMeetingArray = meetingListItem => ([meetingListItem.room,
    meetingListItem.meetings,
    meetingListItem.share]);

  /**
   * Downloads a csv copy of the Analytics data
   * The download is for a specified date range
   *
   * @returns {void}
   *
   */
  downloadCSV = () => {
    notification(toastr, 'success', 'Your download will start shortly')();
    const csvRows = [];
    this.leastAndMostBookedRoomsCSV(csvRows);
    this.totalBookingsCountCSV(csvRows);
    this.percentageCheckinsAndCancellationsCSV(csvRows);
    this.averageRoomCapacityCSV(csvRows);
    this.averageMeetingTimeCSV(csvRows);
    this.averageMeetingDurationsCSV(csvRows);
    const csvString = csvRows.join('%0A');
    const anchorElement = document.createElement('a');
    anchorElement.href = `data:attachment/csv,${csvString}`;
    anchorElement.download = 'analytics.csv';
    anchorElement.target = '_blank';
    document.body.append(anchorElement);
    anchorElement.click();
  };

  /**
   * generates html string to be downloaded
   *
   * @returns {String}
   */
  createDownloadString = () => {
    const {
      leastBookedRooms, mostBookedRooms,
    } = this.state;
    const { startDate, endDate } = this.state;
    const leastBookedRoomsTbody = this.bookedRooms({ bookedRoomsList: leastBookedRooms });
    const mostBookedRoomsTBody = this.bookedRooms({ bookedRoomsList: mostBookedRooms });
    let downloadString = downloadFileString;
    downloadString = downloadString.replace(/startDate/g, startDate);
    downloadString = downloadString.replace(/endDate/g, endDate);
    downloadString = downloadString.replace(/innerMostBookedRooms/g, mostBookedRoomsTBody);
    downloadString = downloadString.replace(/innerLeastBookedRooms/g, leastBookedRoomsTbody);
    downloadString = downloadString.replace(/averageRoomCapacityData/g, this.averageRoomCapacityData());
    downloadString = downloadString.replace(/averageMeetingsDuration/g, this.averageMeetingDurationData());
    downloadString = downloadString.replace(/totalBookingsCount/g, this.totalBookingsCountData());
    downloadString = downloadString.replace(/percentageCheckins/g, this.checkinsData());
    downloadString = downloadString.replace(/percentageAppBookings/g, this.appBookingsData());
    downloadString = downloadString.replace(/percentageAutoCancellations/g, this.cancellationsData());
    downloadString = downloadString.replace(/averageTimeSpentDuringMeetings/g, this.averageMeetingTime());
    return downloadString;
  };

  /**
   * Downloads a pdf or jpeg copy of the Analytics data
   * The download is for a specified date range
   *
   * @param type String
   *
   * @returns {void}
   *
   */
  fetchDownload(type) {
    notification(toastr, 'success', 'Your download will start shortly')();

    const div = document.createElement('div');
    div.innerHTML = this.createDownloadString();
    document.body.appendChild(div);
    html2canvas(div)
      .then((canvas) => {
        if (type === 'pdf') {
          const imgData = canvas.toDataURL('image/png');
          div.remove();
          const pdf = new jsPDF('p', 'pt', 'a4');
          pdf.addImage(imgData, 'PNG', 20, 20, 550, 720);
          pdf.save('analytics.pdf');
        } else {
          div.remove();
          download(canvas.toDataURL(), 'report.jpeg');
        }
      });
  }

  /**
   * downloads a jpeg format of the analytics data
   *
   * @return {void}
   */
  downloadJpeg = () => {
    this.fetchDownload('jpeg');
  };

  /**
   * downloads a pdf format of the analytics data
   *
   * @return {void}
   */
  downloadPdf = () => {
    this.fetchDownload('pdf');
  };

  /**
   * It updates the array that holds a reference to components whose
   * query has been completed.
   *
   * @param {String} component - name of the component whose query has completed
   */
  handleQueryCompleted = (component) => {
    if (this.state.componentsDoneLoading.indexOf(component) === -1) {
      this.setState(() => ({
        componentsDoneLoading: [...this.state.componentsDoneLoading, component],
      }));
    }
  }

  /**
   * 1. Updates the start and end date in the calendar
   * 2. Toggles the calendar
   *
   * @param {date} start
   * @param {date} end
   *
   * @returns {Function}
   */
  sendDateData = (start, end) => {
    const endDateSelected = moment(end, 'MMM DD YYYY').diff(moment(), 'days', true);
    const stateToUpdate = { startDate: start, endDate: end };
    this.calenderToggle();
    if (endDateSelected > 0) {
      this.setState({ ...stateToUpdate, isFutureDateSelected: true }, () => {
      });
    } else {
      this.setState({
        ...stateToUpdate,
        componentsDoneLoading: [],
        isFutureDateSelected: false,
        validatedStartDate: start,
        validatedEndDate: end,
        fetching: true,
      }, () => {
      });
    }
  };

  /**
   * Fills the average room capacity table with data
   *
   * @returns {JSX}
   */
  averageRoomCapacityData = () => {
    const { lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData } =
    this.state.roomCapacity;
    return jsxToString(
      <tbody>
        <tr>
          <td>{`${lessThanTenData.toString()}`}</td>
          <td>{`${betweenTenandTwentyData.toString()}`}</td>
          <td>{`${greaterThanTwentyData.toString()}`}</td>
        </tr>
      </tbody>);
  }

  /**
   * Fills the average meeting duration table with data
   *
   * @returns {JSX}
   */
  averageMeetingDurationData = () => {
    const {
      averageMeetingDuration,
    } = this.state;
    return jsxToString(
      <tbody>
        <tr>
          <td>{`${averageMeetingDuration[0].toString()}%`}</td>
          <td>{`${averageMeetingDuration[1].toString()}%`}</td>
          <td>{`${averageMeetingDuration[2].toString()}%`}</td>
          <td>{`${averageMeetingDuration[3].toString()}%`}</td>
        </tr>
      </tbody>);
  }

  /**
   * Fills the average meeting times table with data
   *
   * @returns {JSX}
   */
  averageMeetingTime = () => {
    const { MeetingsDurationaAnalytics } = this.state.averageMeetingTime;
    return jsxToString(
      <tbody>
        {MeetingsDurationaAnalytics.map((meeting, index) => (
          <tr key={index}>
            <td>{meeting.roomName.toString()}</td>
            <td>{meeting.count.toString()}</td>
            <td>{timeConvert(meeting.totalDuration)}</td>
          </tr>
      ))}
      </tbody>);
  }

  /**
   * Fills the total booking counts table with data
   *
   * @returns {JSX}
   */
  totalBookingsCountData = () => {
    const { totalBookingsCount } = this.state;
    return jsxToString(
      <tbody>
        {totalBookingsCount.map((totalBookings, index) => (
          <tr key={index}>
            <td>{totalBookings.period}</td>
            <td>{totalBookings.bookings}</td>
          </tr>
        ))}
      </tbody>);
  };

  /**
   * Fills the checkins table with data
   *
   * @returns {JSX}
   */
  checkinsData = () => {
    const { checkins, bookings, checkinsPercentage } =
    this.state.checkinsAndCancellations;
    return jsxToString(
      <tbody>
        <tr>
          <td>{`${bookings.toString()}`}</td>
          <td>{`${checkins.toString()}`}</td>
          <td>{`${Math.round(checkinsPercentage, 2).toString()}%`}</td>
        </tr>
      </tbody>);
  };

  /**
   * Fills the app bookings table with data,
   * currently it renders dummy data until backend
   * endpoint is modified to return this data
   *
   * @returns {JSX}
   */
  appBookingsData = () => {
    const { bookings } =
    this.state.checkinsAndCancellations;
    return jsxToString(
      <tbody>
        <tr>
          <td>{`${bookings.toString()}`}</td>
          <td>0</td>
          <td>0%</td>
        </tr>
      </tbody>);
  };

  /**
   * Fills the auto-cancellations table with data
   *
   * @returns {JSX}
   */
  cancellationsData = () => {
    const { cancellations, bookings, cancellationsPercentage } =
    this.state.checkinsAndCancellations;
    return jsxToString(
      <tbody>
        <tr>
          <td>{`${bookings.toString()}`}</td>
          <td>{`${cancellations.toString()}`}</td>
          <td>{`${Math.round(cancellationsPercentage, 2).toString()}%`}</td>
        </tr>
      </tbody>);
  };

  render() {
    const {
      startDate,
      endDate,
      isActivity,
      isFutureDateSelected,
      validatedStartDate,
      validatedEndDate,
      componentsDoneLoading,
      fetching,
    } = this.state;
    const dates = {
      startDate,
      endDate,
      validatedEndDate,
      validatedStartDate,
      isFutureDateSelected,
    };
    const style = {};
    style.display = componentsDoneLoading.length === 3 ? 'block' : 'none';
    return (
      <Fragment>
        <div className="analytics-cover ">
          <div className="btn-left">
            <Button
              classProp="overviewIconBtn"
              handleClick={this.toggleView}
              title="OVERVIEW"
              type={!isActivity ? null : 2}
              isDisabled={!isActivity}
            />
            <Button
              classProp="activityIconBtn"
              handleClick={this.toggleView}
              title="ACTIVITY"
              type={isActivity ? null : 2}
              isDisabled={isActivity}
            />
          </div>
          <div className="btn-right">
            <Button
              classProp="location-btn"
              title={this.state.location}
              type={2}
            />
            <div style={style}>
              <Calendar
                sendData={this.sendDateData}
              />
            </div>
            {
              !fetching && this.state.role !== '1' &&
              <ExportButton
                jpegHandler={this.downloadJpeg}
                csvHandler={this.downloadCSV}
                pdfHandler={this.downloadPdf}
              />
            }
          </div>
        </div>
        {!isActivity &&
          <AnalyticsOverview
            dateValue={dates}
            queryCompleted={this.handleQueryCompleted}
            updateParent={this.updateParent}
          />
        }
        {isActivity && <AnalyticsActivity dateValue={dates} />}
      </Fragment>
    );
  }
}

export default AnalyticsNav;
