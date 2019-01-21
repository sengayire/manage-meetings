import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import toastr from 'toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from 'react-toolbox/lib/button';
import moment from 'moment';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import download from 'downloadjs';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import getCSVData from '../../json_requests/getCSVData';
import Calendar from '../../components/commons/Calendar';
import notification from '../../utils/notification';
import AnalyticsAct from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import IconNotifications from '../../assets/images/download_24px.svg';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import getDataAsJPEG from '../../json_requests/getJPEGData';
import downloadAnalyticsData from '../../json_requests/getPdfDownload';

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
  };

  /**
   * this will fetch csv data
   *
   *@returns {void}
   */
  fetchCSVData = () => {
    /** notify user download will start soon */
    notification(
      toastr,
      'success',
      'Fetching csv file. Download will begin shortly',
    )();
    this.toggleMenu();

    /**
     * call the axios api
     *
     * @param {date} startDate
     * @param {date} endDate
     *
     * @returns {void}
     *
     */
    getCSVData(this.state.startDate, this.state.endDate)
      .then((res) => {
        /** this will download and save the csv file */
        fileDownload(res.data, 'analytics_data.csv');
        notification(toastr, 'success', 'CSV File downloaded successfully')();
      })
      /*eslint-disable */
      .catch(error => {
        /** notify user if the server sends back error */
        notification(
          toastr,
          "error",
          "There was a server error. Please try again."
        )();
      });
    /* eslint-enable */
  };

  /**
   * This will fetch data and format it as JPEG
   *
   * @returns {Function}
   */
  fetchDataAsJPEG = () => {
    notification(
      toastr,
      'success',
      'Fetching JPEG file. Download will begin shortly',
    )();
    this.toggleMenu();
    getDataAsJPEG(this.state.startDate, this.state.endDate)
      .then((res) => {
        const { data } = res.data;
        const element = document.createElement('div');
        element.id = 'jpeg';
        element.innerHTML = data;
        document.body.appendChild(element);
        html2canvas(document.getElementById('jpeg')).then((canvas) => {
          element.remove();
          notification(toastr, 'success', 'File downloaded successfully')();
          download(canvas.toDataURL(), 'report.jpeg');
        });
        /* eslint-disable */
      })
      .catch(error => {
        notification(
          toastr,
          "error",
          "A server error occured, Please try again!"
        )();
      });
  };

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
      view: "overview"
    });
  };

  /**
   * Invokes the call to fetch all the activities
   *
   * @returns {void}
   */
  showActivityView = () => {
    this.setState({
      view: "activity"
    });
  };

  /**
   * It toggles the Menu to open and close
   *
   * @returns {void}
   */
  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  /**
   * Downloads a pdf copy of the Analytics data
   * The download is for a specified date range
   *
   * @returns {void}
   */
  downloadPdf = () => {
    const { startDate, endDate } = this.state;
    const { toggleMenu } = this;
    notification(toastr, "success", "Your download will start shortly")();
    toggleMenu();
    return downloadAnalyticsData(startDate, endDate, "html")
      .then(response => {
        const { data } = response.data;
        const div = document.createElement("div");
        div.innerHTML = data;
        document.body.appendChild(div);
        html2canvas(div).then(canvas => {
          const image = canvas.toDataURL("image/png");
          div.remove();
          // eslint-disable-next-line
          const pdf = new jsPDF("p", "pt", "a4");
          pdf.addImage(image, "PNG", 20, 20, 552, 752);

          pdf.save("analytics.pdf");
        });
        // eslint-disable-next-line no-console
      })
      .catch(error =>
        notification(
          toastr,
          "error",
          "A server error occured, Please try again!"
        )()
      );
  };

  render() {
    const { view, calenderOpen, startDate, endDate } = this.state;
    const { user } = this.props;
    //  The dates object is to contain the dates to be passed
    //  to other analytics components
    const dates = {
      startDate: this.state.startDate,
      endDate: this.state.endDate
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
                view === "activity"
                  ? "activity-btn pad-top analysis-btn btn"
                  : "activity-btn pad-top analysis-btn btn btn-color"
              }
              icon={view === "activity" ? overViewBtnToggle() : overViewIcon()}
              onClick={this.showOverview}
              type="button"
              id="overview-button"
            />
            <Button
              className={
                view === "overview"
                  ? "overview-btn  analysis-btn btn "
                  : "overview-btn  analysis-btn btn btn-color"
              }
              icon={
                view === "overview" ? activityIcon() : activityIconBtnToggle()
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
              <div
                className={
                  this.state.menuOpen
                    ? "dropdown-content"
                    : "dropdown-content-null"
                }
              >
                {/* eslint-disable */}
                <span className="download-dropdown-label">Export options </span>
                <span id="download" onClick={this.downloadPdf}>
                  PDF
                </span>
                <span onClick={this.fetchDataAsJPEG}>JPEG</span>
                <span onClick={this.fetchCSVData}>CSV</span>
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
