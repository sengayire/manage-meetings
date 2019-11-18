import React, { useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import '../../../assets/styles/insightsPage.scss';
import ALL_ANALYTICS from '../../../graphql/queries/analytics';
import { getUserLocation } from '../../helpers/QueriesHelpers';
import InsightsDropdown from './../insightsComponents/insightsDropdown';
import dateUtils from '../../../utils/dateUtils';
import pic from '../../../assets/images/ubuntu.jpg';
import Spinner from '../../commons/Spinner';
import { getAnalyticsData } from '../../helpers/analytics/getData';

const LeastBookedRooms = () => {
  const [leastBookedRoomsStartDate, setLeastBookedRoomsStartDate] = useState(dateUtils.oneWeekAgo);
  const maxRooms = 5;
  const getVariables = variables => ({
    startDate: variables.startDate,
    endDate: variables.endDate || dateUtils.today,
    locationId: variables.locationId || Number(getUserLocation().id),
  });
  const { loading: leastBookedRoomsLoading, data: leastBookedRoomsData } = useQuery(ALL_ANALYTICS, {
    variables: getVariables({ startDate: leastBookedRoomsStartDate }),
  });

  const leastBookedRooms = getAnalyticsData(leastBookedRoomsData).analytics;

  return (
    <div className="least_booked_rooms-container">
      <div className="insights-message">
        <p className="insights-rooms-message">Least Booked Rooms</p>
        <div className="insights-rooms-dropdown">
          <InsightsDropdown setStartDate={setLeastBookedRoomsStartDate} date={dateUtils} />
        </div>
      </div>
      {leastBookedRoomsLoading ? (
        <Fragment>
          <div>
            <Spinner size="small" />
          </div>
        </Fragment>
      ) : (
        <div className="insights-booked-rooms">
          <div className="insights-rooms">
            {(leastBookedRooms || []).reverse().map(
              (leastBookedRoom, index) =>
                index < maxRooms && (
                  <div className="room" key={leastBookedRoom.roomName}>
                    <div className="roomPicture">
                      <img src={pic} alt="room pic" />
                    </div>
                    <p>
                      {leastBookedRoom.roomName}{' '}
                      {Math.ceil(leastBookedRoom.bookingsPercentageShare)}%
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeastBookedRooms;
