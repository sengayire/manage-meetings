import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Button from '../commons/Button';
import '../../assets/styles/custom.scss';
import '../../assets/styles/topmenu.scss';
import '../../../src/assets/styles/analyticsPage.scss';
import '../../assets/styles/table.scss';
import Calendar from '../../components/commons/Calendar';
import AnalyticsActivityComponent from '../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../containers/AnalyticsOverview';
import ExportButton from '../commons/ExportButton';
import { getUserDetails, getAllAnalytics, getAllRooms } from '../helpers/QueriesHelpers';
import AnalyticsContext from '../helpers/AnalyticsContext';

/**
 * Component for Analytics
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
class AnalyticsNav extends Component {
  state = {
    isActivity: false,
    location: 'Fetching location...',
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    fetching: true,
  };

  async componentDidMount() {
    await this.setUserLocation();
    await this.getAnalytics();
  }

  componentDidUpdate(prevProps, prevState) {
    const { startDate, endDate } = this.state;
    const { startDate: prevStartDate, endDate: prevEndDate } = prevState;
    if (prevStartDate !== startDate || prevEndDate !== endDate) {
      this.getAnalytics();
    }
  }

  /**
   * Sets the current user's location and role
   *
   * @returns {void}
   */
  setUserLocation = async () => {
    const user = await getUserDetails();
    if (user) {
      this.setState({ location: user.location });
    }
  };

  getAnalytics = async () => {
    const dateValue = this.dateValue();
    const { allAnalytics: analytics } = await getAllAnalytics(dateValue);
    const { allRooms: { rooms } } = await getAllRooms();
    this.setState({
      fetching: false,
      analytics: { ...analytics, rooms },
    });
  };

  dateValue = () => {
    const {
      startDate,
      endDate,
      isFutureDateSelected,
    } = this.state;

    return {
      startDate,
      endDate,
      isFutureDateSelected,
    };
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
  toggleView = () => {
    this.setState({
      isActivity: !this.state.isActivity,
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
    this.calenderToggle();
    this.setState({
      startDate: start,
      endDate: end,
      fetching: true,
    });
  };


  render() {
    const {
      analytics,
      isActivity,
      fetching,
      location,
      startDate,
      endDate,
    } = this.state;
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
            <Button classProp="location-btn" title={location} type={2} />
            {
              !fetching && (
                <Fragment>
                  <div>
                    <Calendar
                      sendData={this.sendDateData}
                      startDate={startDate}
                      endDate={endDate}
                      disabledDateRange="future"
                    />
                  </div>
                  <ExportButton data={{ downloadData: analytics, dateValue: this.dateValue(), downloadDataName: 'analytics' }} />
                </Fragment>
              )
            }
          </div>
        </div>
        {!isActivity && (
          <AnalyticsContext.Provider value={{ fetching, analytics }}>
            <AnalyticsOverview />
          </AnalyticsContext.Provider>
        )}
        {isActivity &&
          <AnalyticsActivityComponent
            queryCompleted={() => { }}
            dateValue={this.dateValue()}
          />
        }
      </Fragment>
    );
  }
}

export default AnalyticsNav;
