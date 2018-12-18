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

export class AnalyticsActivity extends Component {
  state = {
    view: 'overview',
    menuOpen: false,
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    calenderOpen: false,
    location: 'Kampala',
  };

  /** this will fetch csv data */
  fetchCSVData = () => {
  //  notify user download will start soon
    notification(toastr, 'success', 'Fetching csv file. Download will begin shortly')();
    this.toggleMenu();

    // call the axios api
    getCSVData(this.state.startDate, this.state.endDate)
      .then((res) => {
        // this will download and save the csv file
        fileDownload(res.data, 'analytics_data.csv');
        notification(toastr, 'success', 'CSV File downloaded successfully')();
      })
      /*eslint-disable */
      .catch((error) => {
        // notify user if the server sends back error
        notification(toastr, 'error', 'There was a server error. Please try again.')();
      });
      /* eslint-enable */
  }
  fetchDataAsJPEG = () => {
    notification(toastr, 'success', 'Fetching JPEG file. Download will begin shortly')();
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
      }).catch((error) => {
        notification(toastr, 'error', 'A server error occured, Please try again!')();
      });
  }

  sendDateData = (start, end) => {
    this.setState({ startDate: start, endDate: end });
    this.calenderToggle();
  };

  calenderToggle = () => {
    const { calenderOpen } = this.state;
    this.setState({ calenderOpen: !calenderOpen });
  };

  showOverview = () => {
    this.setState({
      view: 'overview',
    });
  };

  showActivityView = () => {
    this.setState({
      view: 'activity',
    });
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }));
  };
  
  downloadPdf = () => {
    const { startDate, endDate } = this.state;
    const { toggleMenu } = this;
    notification(toastr, 'success', 'Your download will start shortly')();
    toggleMenu();
    return (downloadAnalyticsData(startDate, endDate, 'html').then((response) => {
      const { data } = response.data;
      const div = document.createElement('div');
      div.innerHTML = data;
      document.body.appendChild(div);
      html2canvas(div).then((canvas) => { 
        const image = canvas.toDataURL('image/png');
        div.remove();
        // eslint-disable-next-line
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addImage(image, 'PNG', 20, 20, 552, 752);
        
        pdf.save('analytics.pdf');
      });
      // eslint-disable-next-line no-console
      }).catch(error => console.log(error))
      );
    }

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

    const overViewIcon = () => (
      <div className="overViewBtn">
        <span id="overview-span">OVERVIEW</span>
      </div>
    );

    const overViewBtnToggle = () => (
      <div className="overViewBtnToggle">
        <span >OVERVIEW</span>
      </div>
    );
    const activityIcon = () => (
      <div className="activityIconBtn">
        <span id="activity-span">ACTIVITY</span>
      </div>
    );
    const activityIconBtnToggle = () => (
      <div className="activityIconBtnToggle">
        <span>ACTIVITY</span>
      </div>
    );
    const locationIcon = () => (
      <div className="locationIconBtn">
        {user.user ? <span>{user.user.location}</span> : <span>{this.state.location}</span>}
      </div>
    );
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
              icon={view === 'overview' ? activityIcon() : activityIconBtnToggle()}
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
              />)}


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
              <div className={this.state.menuOpen ? 'dropdown-content' : 'dropdown-content-null'}>
                {/* eslint-disable */}
                <span className="download-dropdown-label" >Export options </span>
                <span id="download" onClick ={this.downloadPdf}>PDF</span>
                <span onClick={this.fetchDataAsJPEG}>JPEG</span>
                <span onClick={this.fetchCSVData} >CSV</span>
              </div>
            </div>
          </div>
        </div>

        {view === 'overview' && <AnalyticsOverview dateValue={dates} />}
        {view === 'activity' && <AnalyticsAct dateValue={dates} />}
      </div>
    );
  }
}

AnalyticsActivity.propTypes = {
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
      email: process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email,
    },
  }),
})(AnalyticsActivity);

