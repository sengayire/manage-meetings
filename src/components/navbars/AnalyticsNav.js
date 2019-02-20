/* eslint-disable new-cap */
import React, { Component, Fragment } from 'react';
import toastr from 'toastr';
import html2canvas from 'html2canvas';
import jsxToString from 'jsx-to-string';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
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
import { getMostUsedAndLeastUsedRooms } from '../../json_requests';
import downloadFileString from '../../fixtures/downloadString';

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
    location: 'Kampala',
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    leastUsedRooms: [],
    mostUsedRooms: [],
    fetching: false,
  };

  componentDidMount() {
    this.fetchMostAndLeastUsedRooms();
  }

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
            <tr key={room.id}>
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
   * It updates the state with the selected start and end date
   *
   * @returns {void}
   */
  sendDateData = (start, end) => {
    this.setState({ startDate: start, endDate: end });
    this.fetchMostAndLeastUsedRooms();
  };

  render() {
    const { startDate, endDate, isActivity } = this.state;
    const { user: { user } } = this.props;
    const dates = {
      startDate,
      endDate,
    };

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
            <Calendar
              sendData={this.sendDateData}
            />
            {
              !this.state.fetching && !this.state.error &&
              <ExportButton
                jpegHandler={this.downloadJpeg}
                csvHandler={this.downloadCSV}
                pdfHandler={this.downloadPdf}
              />
            }
          </div>
        </div>
        {!isActivity && <AnalyticsOverview dateValue={dates} />}
        {isActivity && <AnalyticsActivity dateValue={dates} />}
      </Fragment>
    );
  }
}

AnalyticsNav.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

/* This gets the token from the localstorage and select the user
email to pass as a parameter to the query being sent */
const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default graphql(GET_USER_QUERY, {
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
})(AnalyticsNav);
