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

const MostBookedRooms = () => {
  const [mostBookedRoomsStartDate, setMostBookedRoomsStartDate] = useState(dateUtils.oneWeekAgo);
  const maxRooms = 5;
  const getVariables = variables => ({
    startDate: variables.startDate,
    endDate: variables.endDate || dateUtils.today,
    locationId: variables.locationId || Number(getUserLocation().id),
  });
  const { loading: mostBookedRoomsLoading, data: mostBookedRoomsData } = useQuery(ALL_ANALYTICS, {
    variables: getVariables({ startDate: mostBookedRoomsStartDate }),
  });

  const mostBookedRooms = getAnalyticsData(mostBookedRoomsData).analytics;

  return (
    <div className="most_booked_rooms-container">
      <div className="insights-message">
        <p className="insights-rooms-message">Most Booked Rooms</p>
        <div className="insights-rooms-dropdown">
          <InsightsDropdown setStartDate={setMostBookedRoomsStartDate} date={dateUtils} />
        </div>
      </div>
      {mostBookedRoomsLoading ? (
        <Fragment>
          <div>
            <Spinner size="small" />
          </div>
        </Fragment>
      ) : (
        <div className="insights-booked-rooms">
          <div className="insights-rooms">
            {(mostBookedRooms || []).map(
              (mostBookedRoom, index) =>
                index < maxRooms && (
                  <div className="room" key={mostBookedRoom.roomName}>
                    <div className="roomPicture">
                      <img src={pic} alt="room pic" />
                    </div>
                    <p>
                      {mostBookedRoom.roomName} {Math.ceil(mostBookedRoom.bookingsPercentageShare)}%
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
export default MostBookedRooms;
