/* eslint-disable new-cap */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import toastr from 'toastr';
import html2canvas from 'html2canvas';
import jsxToString from 'jsx-to-string';
import jsPDF from 'jspdf';
import { Button } from 'react-toolbox/lib/button';
import moment from 'moment';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import download from 'downloadjs';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import Calendar from '../../components/commons/Calendar';
import notification from '../../utils/notification';
import AnalyticsAct from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import IconNotifications from '../../assets/images/download_24px.svg';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import { getMostUsedAndLeastUsedRooms } from '../../json_requests';
import downloadFileString from '../../fixtures/downloadString';

/**
 * Component for Analytics Activity
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
export class AnalyticsActivity extends Component {
  state = {
    view: 'overview',
    menuOpen: false,
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    calenderOpen: false,
    location: 'Kampala',
    fetching: false,
    leastUsedRooms: [],
    mostUsedRooms: [],
  };

  componentDidMount() {
    this.fetchMostAndLeastUsedRooms();
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
    this.setState({ startDate: start, endDate: end });
    this.calenderToggle();
    this.fetchMostAndLeastUsedRooms();
  };

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
  showOverview = () => {
    this.setState({
      view: 'overview',
    });
  };

  /**
   * Invokes the call to fetch all the activities
   *
   * @returns {void}
   */
  showActivityView = () => {
    this.setState({
      view: 'activity',
    });
  };

  /**
   * It toggles the Menu to open and close
   *
   * @returns {void}
   */
  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }));
  };

  /**
   * fetches Analytics data for a specified date range
   *
   * @returns {Function}
   */
  fetchMostAndLeastUsedRooms = () => {
    const { startDate, endDate } = this.state;
    this.setState({ fetching: true });

    return (getMostUsedAndLeastUsedRooms(startDate, endDate)
      .then((response) => {
        const meetingShares = response.data['Least Used Rooms']['% Share of All Meetings'];
        const meetings = response.data['Least Used Rooms'].Meetings;
        const rooms = response.data['Least Used Rooms'].Room;
        const mostUsedMeetings = response.data['Most Used Rooms'].Meetings;
        const mostUsedRooms = response.data['Most Used Rooms'].Room;
        const mostUsedMeetingShares =
            response.data['Most Used Rooms']['% Share of All Meetings'];
        this.setState({
          leastUsedRooms: [rooms, meetings, meetingShares],
          mostUsedRooms: [
            mostUsedRooms,
            mostUsedMeetings,
            mostUsedMeetingShares,
          ],
          fetching: false,
        });
      })
      .catch(error => this.setState({ fetching: false, error }))
    );
  };

  /**
   * generates jsx from bookedRoomsList and converts it to a string
   *
   * @param bookedRoomsList Object
   *
   * @returns String
   *
   */
  bookedRooms = ({ bookedRoomsList }) => {
    const rooms = bookedRoomsList.length ?
      Object.values(bookedRoomsList[0]) : [];
    const meetings = bookedRoomsList.length
      ? Object.values(bookedRoomsList[1])
      : [];
    const meetingShares = bookedRoomsList.length
      ? Object.values(bookedRoomsList[2])
      : [];

    return (
      jsxToString(
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room}</td>
              <td>{meetings[index].toString()}</td>
              <td>{`${meetingShares[index].toString()}%`}</td>
            </tr>
        ))}
        </tbody>)
    );
  };

  /**
   * generates an array of booked rooms with their meetings and % share of meetings
   *
   * @param bookedRooms Object
   *
   * @returns Array
   *
   */
  bookedRoomsList = ({ bookedRooms }) => {
    const rooms = bookedRooms.length ?
      Object.values(bookedRooms[0]) : [];
    const meetings = bookedRooms.length
      ? Object.values(bookedRooms[1])
      : [];
    const meetingShares = bookedRooms.length
      ? Object.values(bookedRooms[2])
      : [];
    const rows = [];
    for (let i = 0; i < rooms.length; i += 1) {
      rows.push({
        room: rooms[i],
        meetings: meetings[i].toString(),
        share: meetingShares[i].toString(),
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
      leastUsedRooms, mostUsedRooms,
    } = this.state;
    const { toggleMenu } = this;
    toggleMenu();
    notification(toastr, 'success', 'Your download will start shortly')();
    const csvRows = [];
    const toWriteData = [['Room', 'Meetings', '% Share of All Meetings'],
      ['Most Booked Rooms'],
    ];
    const mostUsedRoomsList = this.bookedRoomsList({ bookedRooms: mostUsedRooms });
    for (let i = 0; i < mostUsedRoomsList.length; i += 1) {
      toWriteData.push(this.createMeetingArray(mostUsedRoomsList[i]));
    }
    toWriteData.push(['Least Booked Rooms']);
    const leatUsedRoomsList = this.bookedRoomsList({ bookedRooms: leastUsedRooms });
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
      startDate, endDate, leastUsedRooms, mostUsedRooms,
    } = this.state;
    const leastUsedRoomsTbody = this.bookedRooms({ bookedRoomsList: leastUsedRooms });
    const mostUsedRoomsTBody = this.bookedRooms({ bookedRoomsList: mostUsedRooms });
    let downloadString = downloadFileString;
    downloadString = downloadString.replace(/startDate/g, startDate);
    downloadString = downloadString.replace(/endDate/g, endDate);
    downloadString = downloadString.replace(/innerMostBookedRooms/g, mostUsedRoomsTBody);
    downloadString = downloadString.replace(/innerLeastBookedRooms/g, leastUsedRoomsTbody);
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
    const { toggleMenu } = this;
    toggleMenu();
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

  render() {
    const {
      view, calenderOpen, startDate, endDate,
    } = this.state;
    const { user } = this.props;
    //  The dates object is to contain the dates to be passed
    //  to other analytics components
    const dates = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    /**
     * Displays an icon for Overview button
     *
     * @returns {JSX}
     */
    const overViewIcon = () => (
      <div className="overViewBtn">
        <span id="overview-span">OVERVIEW</span>
      </div>
    );

    /**
     * A button toggler component for Overview Button
     *
     * @returns {JSX}
     */
    const overViewBtnToggle = () => (
      <div className="overViewBtnToggle">
        <span>OVERVIEW</span>
      </div>
    );

    /**
     * Shows the icon for the activity button
     *
     * @returns {JSX}
     */
    const activityIcon = () => (
      <div className="activityIconBtn">
        <span id="activity-span">ACTIVITY</span>
      </div>
    );

    /**
     * The button component for activity
     *
     * @returns {JSX}
     */
    const activityIconBtnToggle = () => (
      <div className="activityIconBtnToggle">
        <span>ACTIVITY</span>
      </div>
    );

    /**
     * Returns the location icon based
     * on whether the user is logged in or not
     *
     * @returns {JSX}
     */
    const locationIcon = () => (
      <div className="locationIconBtn">
        {user.user ? (
          <span>{user.user.location}</span>
        ) : (
          <span>{this.state.location}</span>
        )}
      </div>
    );

    /**
     *  1. Displays an icon for calendar
     *  2. Shows duration = (Start Date - End date)
     *
     *  @returns {JSX}
     */
    const calendarIcon = () => (
      <div className="calendarIconBtn">
        <span>{`${startDate} - ${endDate}`}</span>
      </div>
    );

    return (
      <div>
        <div className="analytics-cover ">
          <div className="btn-left">
            <Button
              className={
                view === 'activity'
                  ? 'activity-btn pad-top analysis-btn btn'
                  : 'activity-btn pad-top analysis-btn btn btn-color'
              }
              icon={view === 'activity' ? overViewBtnToggle() : overViewIcon()}
              onClick={this.showOverview}
              type="button"
              id="overview-button"
            />
            <Button
              className={
                view === 'overview'
                  ? 'overview-btn  analysis-btn btn '
                  : 'overview-btn  analysis-btn btn btn-color'
              }
              icon={
                view === 'overview' ? activityIcon() : activityIconBtnToggle()
              }
              onClick={this.showActivityView}
            />
          </div>
          <div className="btn-right">
            <Button
              className="location-btn analysis-btn "
              icon={locationIcon()}
              id="location-btn"
            />

            <Button
              icon={calendarIcon()}
              className="analysis-btn calendar-btn"
              id="calendar-btn"
              onClick={this.calenderToggle}
            />

            {calenderOpen && (
              <Calendar
                sendDateData={this.sendDateData}
                handleCloseModal={this.calenderToggle}
              />
            )}
            <div className="dropdown">
              {!this.state.fetching && !this.state.error && (
                <button
                  className="dropbtn"
                  id="btnControl"
                  onClick={this.toggleMenu}
                >
                  <img
                    className="dropbtn-img"
                    src={IconNotifications}
                    alt="download icon"
                  />
                </button>
              )}
              <div
                className={
                  this.state.menuOpen
                    ? 'dropdown-content'
                    : 'dropdown-content-null'
                }
              >
                {/* eslint-disable */}
                <span className="download-dropdown-label">Export options </span>
                <span onClick={this.downloadCSV}>CSV</span>
                <span onClick={this.downloadJpeg}>JPEG</span>
                <span onClick={this.downloadPdf}>PDF</span>
              </div>
            </div>
          </div>
        </div>
        {view === "overview" && <AnalyticsOverview dateValue={dates} />}
        {view === "activity" && <AnalyticsAct dateValue={dates} />}
      </div>

    );
  }
}

AnalyticsActivity.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object
  }).isRequired
};

/* This gets the token from the localstorage and select the user
email to pass as a parameter to the query being sent */
const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default graphql(GET_USER_QUERY, {
  name: "user",
  options: /* istanbul ignore next */ () => ({
    variables: {
      // Added the test email in order to pass the variable to the test environment
      email:
        process.env.NODE_ENV === "test"
          ? "sammy.muriuki@andela.com"
          : userData.email
    }
  })
})(AnalyticsActivity);
