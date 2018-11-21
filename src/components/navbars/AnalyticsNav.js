import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { IconMenu } from 'react-toolbox/lib/menu';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import AnalyticsAct from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import IconNotifications from '../../assets/images/download_24px.svg';

export class AnalyticsActivity extends Component {
  state = {
    view: 'overview',
    menuOpen: false,
    value: 'Today',
  };

  handleStateChange = (event) => {
    event.preventDefault();
    // logic goes here
  };

  handleChange = (value) => {
    this.setState({ value });
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

  render() {
    const { view } = this.state;

    const overViewIcon = () => (
      <div className="overViewBtn">
        <span id="overview-span">OVERVIEW</span>
      </div>
    );

    const overViewBtnToggle = () => (
      <div className="overViewBtnToggle">
        <span>OVERVIEW</span>
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
        <span>{this.state.value}</span>
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
            <IconMenu
              icon={calendarIcon()}
              className="calendar-btn analysis-btn "
              type="button"
              id="calendar-btn"
            >
              <RadioGroup
                value={this.state.value}
                onChange={this.handleChange}
                className="radio-wrapper"
              >
                <div className="date-label">Date options</div>
                <RadioButton value="Today" label="Today" />
                <RadioButton value="Tomorrow" label="Tomorrow" />
                <RadioButton value="This Week" label="This Week" className="radioGroup-test1" />
                <RadioButton value="This Month" label="This Month" />
                <RadioButton value="Pick Date" label="Pick a Date" />
              </RadioGroup>
            </IconMenu>

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
                <a href="/" className="download-dropdown-label" disabled >Export options </a>
                <a href="/analytics">PDF</a>
                <a href="/analytics">JPEG</a>
                <a href="/analytics">CSV</a>
              </div>
            </div>
          </div>
        </div>

        {view === 'overview' && (
          <AnalyticsOverview dateValue={this.state.value} />
        )}
        {view === 'activity' && <AnalyticsAct />}
      </div>
    );
  }
}

export default AnalyticsActivity;
