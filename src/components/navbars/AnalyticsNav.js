import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import moment from 'moment';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import Calendar from '../../components/commons/Calendar';
import AnalyticsAct from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import IconNotifications from '../../assets/images/download_24px.svg';

export class AnalyticsActivity extends Component {
  state = {
    view: 'overview',
    menuOpen: false,
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    calenderOpen: false,
  };

  sendDateData = (start, end) => {
    this.setState({ startDate: start, endDate: end });
    this.calenderToggle();
  };

  calenderToggle = () => {
    const { calenderOpen } = this.state;
    this.setState({ calenderOpen: !calenderOpen });
  }

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

  render() {
    const {
      view, calenderOpen, startDate, endDate,
    } = this.state;

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
        <span>Nairobi</span>
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
                  ? 'activity-btn pad-top analysis-btn btn  '
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
                onClick={() => this.toggleMenu()}
                onBlur={() => this.toggleMenu()}
              >
                <img
                  className="dropbtn-img"
                  src={IconNotifications}
                  alt="download icon"
                />
              </button>
              <div className={this.state.menuOpen ? 'dropdown-content' : 'dropdown-content-null'}>
                <a href="/" className="download-dropdown-label" >Export options </a>
                <a href="/analytics">PDF</a>
                <a href="/analytics">JPEG</a>
                <a href="/analytics">CSV</a>
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

export default AnalyticsActivity;
