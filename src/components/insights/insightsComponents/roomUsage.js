import React, { useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import '../../../assets/styles/insightsPage.scss';
import ALL_ANALYTICS from '../../../graphql/queries/analytics';
import { getUserLocation } from '../../helpers/QueriesHelpers';
import InsightsDropdown from './../insightsComponents/insightsDropdown';
import dateUtils from '../../../utils/dateUtils';
import Spinner from '../../commons/Spinner';
import { getAnalyticsData } from '../../helpers/analytics/getData';

const UsedRooms = () => {
  const [usedRoomsStartDate, setUsedRoomsStartDate] = useState(dateUtils.oneWeekAgo);
  const getVariables = variables => ({
    startDate: variables.startDate,
    endDate: variables.endDate || dateUtils.today,
    locationId: variables.locationId || Number(getUserLocation().id),
  });
  const { loading: usedRoomsLoading, data: usedRoomsData } = useQuery(ALL_ANALYTICS, {
    variables: getVariables({ startDate: usedRoomsStartDate }),
  });

  const {
    roomNumber,
    totalDurationInMinutes,
    totalCheckins,
    totalCancellations,
    totalAutoCancellations,
    totalBookingsPercentageShare,
  } = getAnalyticsData(usedRoomsData);

  return (
    <div className="used-rooms-container">
      <div className="insights-message">
        <p className="insights-rooms-message">How Meeting Rooms Were Used</p>
        <div className="insights-rooms-dropdown">
          <InsightsDropdown setStartDate={setUsedRoomsStartDate} date={dateUtils} />
        </div>
      </div>

      {usedRoomsLoading ? (
        <Fragment>
          <div>
            <Spinner size="small" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="insights-used-rooms">
            <div className="rooms hours-booked">
              <p>{Math.ceil(totalDurationInMinutes / 60)}</p>
              <small>hours booked</small>
            </div>
            <div className="rooms utilization">
              <p>{totalBookingsPercentageShare / roomNumber} %</p>
              <small>utilization</small>
            </div>
            <div className="rooms check-ins">
              <p>{totalAutoCancellations}</p>
              <small>missed</small>
            </div>
            <div className="rooms cancelled">
              <p>{totalCheckins}</p>
              <small>check-ins</small>
            </div>
            <div className="rooms cancelled">
              <p>{totalCancellations}</p>
              <small>cancelled</small>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UsedRooms;
