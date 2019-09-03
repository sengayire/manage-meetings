import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../commons/Button';
import '../../../assets/styles/custom.scss';
import '../../../assets/styles/topmenu.scss';
import '../../../../src/assets/styles/analyticsPage.scss';
import '../../../assets/styles/table.scss';
import Calendar from '../../commons/Calendar';
import AnalyticsActivityComponent from '../../../containers/AnalyticsActivity';
import AnalyticsOverview from '../../../containers/AnalyticsOverview';
import ExportButton from '../../commons/ExportButton';
import { getUserLocation } from '../../helpers/QueriesHelpers';
import AnalyticsContext from '../../helpers/AnalyticsContext';
import ALL_ANALYTICS from '../../../graphql/queries/analytics';
import { GET_ALL_ROOMS } from '../../../graphql/queries/Rooms';


/**
 * Component for Analytics
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */

const AnalyticsNav = () => {
  const [analyticState, setAnalyticState] = useState({
    activeTab: '',
    showLocations: false,
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    locationChanged: false,
  });

  const getPreviousTab = async () => {
    const tab = await sessionStorage.getItem('analyticActiveTab');
    await setAnalyticState({
      ...analyticState,
      activeTab: tab || 'overview',
    });
  };

  useEffect(() => {
    getPreviousTab();
  }, []);

  const { startDate, endDate } = analyticState;
  const variables = {
    startDate,
    endDate,
    locationId: Number(getUserLocation().id),
  };

  const dateValue = () => ({ startDate, endDate });

  const {
    loading: loadingAnalytics,
    data: analyticsData,
  } = useQuery(ALL_ANALYTICS, {
    variables,
  });
  const {
    loading: loadingRooms,
    data: allRoomsData,
  } = useQuery(GET_ALL_ROOMS);


  let analytics;
  if (analyticsData.allAnalytics && allRoomsData.allRooms) {
    const { allAnalytics } = analyticsData;
    const { allRooms: { rooms } } = allRoomsData;
    analytics = { ...allAnalytics, rooms };
  }


  const calenderToggle = () => {
    const { calenderOpen } = analyticState;
    setAnalyticState({
      ...analyticState,
      calenderOpen: !calenderOpen,
    });
  };
  const sendDateData = (start, end) => {
    calenderToggle();
    setAnalyticState({
      ...analyticState,
      startDate: start,
      endDate: end,
    });
  };

  const toggleView = async () => {
    setAnalyticState((prevAnalyticState) => {
      if (prevAnalyticState.activeTab === 'activity') {
        sessionStorage.setItem('analyticActiveTab', 'overview');
        return ({
          ...prevAnalyticState,
          activeTab: 'overview',
        });
      }
      sessionStorage.setItem('analyticActiveTab', 'activity');
      return ({
        ...prevAnalyticState,
        activeTab: 'activity',
      });
    });
  };

  const renderButtons = buttonTitle => (<Button
    title={buttonTitle.toUpperCase()}
    handleClick={toggleView}
    classProp={`${buttonTitle.toLowerCase()}IconBtn`}
    type={(analyticState.activeTab === `${buttonTitle.toLowerCase()}`) ? null : 2}
    isDisabled={analyticState.activeTab === `${buttonTitle.toLowerCase()}`}
  />);

  return (
    <Fragment>
      <div className="analytics-cover ">
        <div className="btn-left">
          {renderButtons('overview')}
          {renderButtons('activity')}
        </div>
        <div className="btn-right">
          {
              !loadingAnalytics && !loadingRooms && (
                <Fragment>
                  <div>
                    <Calendar
                      sendData={sendDateData}
                      startDate={startDate}
                      endDate={endDate}
                      disabledDateRange="future"
                    />
                  </div>
                  <ExportButton data={{ downloadData: analytics, dateValue: dateValue(), downloadDataName: 'analytics' }} />
                </Fragment>
              )
            }
        </div>
      </div>
      {(analyticState.activeTab === 'overview') && (
      <AnalyticsContext.Provider value={{ fetching: loadingAnalytics || loadingRooms, analytics }}>
        <AnalyticsOverview />
      </AnalyticsContext.Provider>
        )}
      {analyticState.activeTab === 'activity' &&
      <AnalyticsActivityComponent
        queryCompleted={() => { }}
        dateValue={dateValue()}
      />
        }
    </Fragment>
  );
};

export default AnalyticsNav;
