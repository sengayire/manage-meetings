import React from 'react';
import jsxToString from 'jsx-to-string';
import averageRoomCapacity from '../AverageRoomCapacity';
import getSectorWidths from '../AverageMeetingDuration';
import getCheckinsStatistics from '../Checkins';
import timeConvert from '../../timeConverter';
import { getMeetingDurationAnalytics } from '../AverageMeetingList';

/**
   * generates jsx from bookedRoomsList and converts it to a string
   *
   * @param bookedRoomsList Object
   *
   * @returns String
   *
   */
export const bookedRooms = bookedRoomsList =>
  jsxToString(
    <tbody>
      {bookedRoomsList.map(({ roomName, numberOfBookings, bookingsPercentageShare }) => (
        <tr key={roomName}>
          <td>{roomName}</td>
          <td>{numberOfBookings.toString()}</td>
          <td>{`${bookingsPercentageShare.toString()}%`}</td>
        </tr>
      ))}
    </tbody>,
  );

/**
* Fills the average room capacity table with data
*
* @returns {JSX}
*/
export const averageRoomCapacityData = (rooms) => {
  const roomCapacity = averageRoomCapacity(rooms);
  const {
    lessThanTenData,
    betweenTenandTwentyData,
    greaterThanTwentyData,
  } = roomCapacity;
  return jsxToString(
    <tbody>
      <tr>
        <td>{`${lessThanTenData.toString()}`}</td>
        <td>{`${betweenTenandTwentyData.toString()}`}</td>
        <td>{`${greaterThanTwentyData.toString()}`}</td>
      </tr>
    </tbody>,
  );
};


  /**
   * Fills the average meeting duration table with data
   *
   * @returns {JSX}
   */
export const averageMeetingDurationData = (analytics) => {
  const averageMeetingDuration = getSectorWidths(analytics);
  return jsxToString(
    <tbody>
      <tr>
        <td>{`${averageMeetingDuration[0].toString()}%`}</td>
        <td>{`${averageMeetingDuration[1].toString()}%`}</td>
        <td>{`${averageMeetingDuration[2].toString()}%`}</td>
        <td>{`${averageMeetingDuration[3].toString()}%`}</td>
      </tr>
    </tbody>,
  );
};

  /**
   * Fills the auto-cancellations table with data
   *
   * @returns {JSX}
   */
export const cancellationsData = (analytics) => {
  const { autoCancellations: cancellations, bookings } = getCheckinsStatistics(analytics);
  const {
    autoCancellationsPercentage,
  } = analytics;
  return jsxToString(
    <tbody>
      <tr>
        <td>{`${bookings.toString()}`}</td>
        <td>{`${cancellations.toString()}`}</td>
        <td>{`${Math.round(autoCancellationsPercentage, 2).toString()}%`}</td>
      </tr>
    </tbody>,
  );
};

/**
 * Fills the average meeting times table with data
 *
 * @returns {JSX}
*/
export const averageMeetingTime = (analytics) => {
  const meetingsDurationAnalytics = getMeetingDurationAnalytics(analytics);

  return jsxToString(
    <tbody>
      {meetingsDurationAnalytics.map(({ roomName, totalDuration, count }) => (
        <tr key={roomName}>
          <td>{roomName.toString()}</td>
          <td>{count.toString()}</td>
          <td>{timeConvert(totalDuration)}</td>
        </tr>
      ))}
    </tbody>,
  );
};

/**
 * Fills the total booking counts table with data
 *
 * @returns {JSX}
 */
export const totalBookingsCountData = bookingsCount =>
  jsxToString(
    <tbody>
      {bookingsCount.map(({ totalBookings, period }) => (
        <tr key={period}>
          <td>{period}</td>
          <td>{totalBookings}</td>
        </tr>
      ))}
    </tbody>,
  );

/**
 * Fills the checkins table with data
 *
 * @returns {JSX}
 */
export const checkinsData = (analytics) => {
  const { checkins, bookings } = getCheckinsStatistics(analytics);
  const { checkinsPercentage } = analytics;
  return jsxToString(
    <tbody>
      <tr>
        <td>{`${bookings.toString()}`}</td>
        <td>{`${checkins.toString()}`}</td>
        <td>{`${Math.round(checkinsPercentage, 2).toString()}%`}</td>
      </tr>
    </tbody>,
  );
};


/**
 * Fills the app bookings table with data,
 * currently it renders dummy data until backend
 * endpoint is modified to return this data
 *
 * @returns {JSX}
 */
export const appBookingsData = (analytics) => {
  const { checkins, bookings } = getCheckinsStatistics(analytics);
  const { appBookingsPercentage } = analytics;
  return jsxToString(
    <tbody>
      <tr>
        <td>{`${bookings.toString()}`}</td>
        <td>{`${checkins.toString()}`}</td>
        <td>{`${Math.round(appBookingsPercentage, 2).toString()}%`}</td>
      </tr>
    </tbody>,
  );
};
