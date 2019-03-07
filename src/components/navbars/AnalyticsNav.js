/* eslint-disable new-cap,react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import toastr from 'toastr';
import html2canvas from 'html2canvas';
import jsxToString from 'jsx-to-string';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import download from 'downloadjs';
import moment from 'moment';
import Button from '../commons/Button';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import Calendar from '../../components/commons/Calendar';
import notification from '../../utils/notification';
import AnalyticsActivity from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import ExportButton from '../commons/ExportButton';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import downloadFileString from '../../fixtures/downloadString';
import { LEAST_BOOKED_ROOMS_ANALYTICS, MOST_BOOKED_ROOMS_ANALYTICS } from '../../graphql/queries/analytics';

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
    fetching: true,
    isFutureDateSelected: false,
    componentsDoneLoading: [],
  };

  componentWillReceiveProps(props) {
    this.setState({ fetching: true });
    const { loading, error } = props.leastBookedAnalytics;
    if (!loading && !error) {
      const { analytics } = props.leastBookedAnalytics.analyticsForBookedRooms;
      this.setState({ leastBookedRooms: analytics, fetching: false });
    }

    if (!props.mostBookedAnalytics.loading && !props.mostBookedAnalytics.error) {
      const { analytics } = props.mostBookedAnalytics.analyticsForBookedRooms;
      this.setState({ mostBookedRooms: analytics, fetching: false });
    }
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
    const {
      leastBookedRooms, mostBookedRooms,
    } = this.state;

    notification(toastr, 'success', 'Your download will start shortly')();
    const csvRows = [];
    const toWriteData = [['Room', 'Meetings', '% Share of All Meetings'],
      ['Most Booked Rooms'],
    ];
    const mostUsedRoomsList = this.bookedRoomsList({ bookedRooms: mostBookedRooms });
    for (let i = 0; i < mostUsedRoomsList.length; i += 1) {
      toWriteData.push(this.createMeetingArray(mostUsedRoomsList[i]));
    }
    toWriteData.push(['Least Booked Rooms']);
    const leatUsedRoomsList = this.bookedRoomsList({ bookedRooms: leastBookedRooms });
    for (let i = 0; i < leatUsedRoomsList.length; i += 1) {
      toWriteData.push(this.createMeetingArray(leatUsedRoomsList[i]));
    }
    for (let i = 0; i < toWriteData.length; i += 1) {
      csvRows.push(toWriteData[i].join(','));
    }
    const csvString = csvRows.join('%0A'); // add new line return at end of each line
    const a = document.createElement('a');
    a.href = `data:attachment/csv,${csvString}`;
    a.download = 'analytics.csv';
    document.body.append(a);
    a.click();
  };

  /**
   * generates html string to be downloaded
   *
   * @returns {String}
   *
   */
  createDownloadString = () => {
    const {
      startDate, endDate, leastBookedRooms, mostBookedRooms,
    } = this.state;
    const leastBookedRoomsTbody = this.bookedRooms({ bookedRoomsList: leastBookedRooms });
    const mostBookedRoomsTBody = this.bookedRooms({ bookedRoomsList: mostBookedRooms });
    let downloadString = downloadFileString;
    downloadString = downloadString.replace(/startDate/g, startDate);
    downloadString = downloadString.replace(/endDate/g, endDate);
    downloadString = downloadString.replace(/innerMostBookedRooms/g, mostBookedRoomsTBody);
    downloadString = downloadString.replace(/innerLeastBookedRooms/g, leastBookedRoomsTbody);
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

  downloadJpeg = () => {
    this.fetchDownload('jpeg');
  };

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
    const stateToUpdate = { startDate: start, endDate: end, fetching: true };
    this.calenderToggle();
    if (endDateSelected > 0) {
      this.setState({ ...stateToUpdate, isFutureDateSelected: true }, () => {
        this.props.leastBookedAnalytics.refetch({ startDate: start, endDate: end });
        this.props.mostBookedAnalytics.refetch({ startDate: start, endDate: end });
      });
    } else {
      this.setState({
        ...stateToUpdate,
        componentsDoneLoading: [],
        isFutureDateSelected: false,
        validatedStartDate: start,
        validatedEndDate: end,
      }, () => {
        this.props.leastBookedAnalytics.refetch({ startDate: start, endDate: end });
        this.props.mostBookedAnalytics.refetch({ startDate: start, endDate: end });
      });
    }
  };

  render() {
    const {
      startDate,
      endDate,
      isActivity,
      fetching,
      error,
      isFutureDateSelected,
      validatedStartDate,
      validatedEndDate,
      componentsDoneLoading,
    } = this.state;
    const { user: { user } } = this.props;
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
              title={
                user ? user.location : this.state.location
              }
              type={2}
            />
            <div style={style}>
              <Calendar
                sendData={this.sendDateData}
              />
            </div>
            {
              !fetching && !error &&
              <ExportButton
                jpegHandler={this.downloadJpeg}
                csvHandler={this.downloadCSV}
                pdfHandler={this.downloadPdf}
              />
            }
          </div>
        </div>
        {!isActivity && <AnalyticsOverview
          dateValue={dates}
          queryCompleted={this.handleQueryCompleted}
        />
        }
        {isActivity && <AnalyticsActivity dateValue={dates} />}
      </Fragment>
    );
  }
}

AnalyticsNav.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  mostBookedAnalytics: PropTypes.shape({
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    analyticsForMostBookedRooms: PropTypes.shape({
      analytics: PropTypes.array,
    }),
  }).isRequired,
  leastBookedAnalytics: PropTypes.shape({
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    analyticsForLeastBookedRooms: PropTypes.shape({
      analytics: PropTypes.array,
    }),
  }).isRequired,
};

/* This gets the token from the localstorage and select the user
email to pass as a parameter to the query being sent */
const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

const bookedRoomsOptions = () => ({
  variables: {
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
  },
});

export default compose(
  graphql(GET_USER_QUERY, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
      // Added the test email in order to pass the variable to the test environment
        email:
        process.env.NODE_ENV === 'test'
          ? 'sammy.muriuki@andela.com'
          : userData.email,
      },
    }),
  }),
  graphql(MOST_BOOKED_ROOMS_ANALYTICS, {
    name: 'mostBookedAnalytics',
    options: bookedRoomsOptions,
  }),
  graphql(LEAST_BOOKED_ROOMS_ANALYTICS, {
    name: 'leastBookedAnalytics',
    options: bookedRoomsOptions,
  }),
)(AnalyticsNav);
