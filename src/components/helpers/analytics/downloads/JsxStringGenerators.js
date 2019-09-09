/* eslint-disable react/no-unknown-property */
import React from 'react';
import jsxToString from 'jsx-to-string';
import timeConvert from '../../timeConverter';
import getMeetingDurationAnalytics from '../AverageMeetingList';
import { getAverageTime } from '../../../analytics/AverageMeetingList/QueryAnalyticsPerMeetingRoom';

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
    <div class="table-download booked-rooms-download">
      <div class="table-flex-download table-header-download">
        <div>Room</div>
        <div>Meetings</div>
        <div>% Share of All Meetings</div>
      </div>
      {bookedRoomsList.map(({ roomName, numberOfBookings, bookingsPercentageShare }) => (
        <div key={roomName} class="table-flex-download table-body-download">
          <div>{roomName}</div>
          <div>{numberOfBookings.toString()}</div>
          <div>{`${Math.round(bookingsPercentageShare).toString()}%`}</div>
        </div>
      ))}
    </div>,
  );


/**
 * Fills the average meeting times table with data
 *
 * @returns {JSX}
*/
export const averageMeetingTime = (analytics) => {
  const meetingsDurationAnalytics = getMeetingDurationAnalytics(analytics);

  return jsxToString(
    <div class="table-download booked-rooms-download">
      <div class="table-flex-download table-header-download">
        <div>Room</div>
        <div>No. Of Meetings</div>
        <div>Average Meeting Duration</div>
      </div>
      {meetingsDurationAnalytics.map(({ roomName, totalDuration, count }) => (
        <div key={roomName} class="table-flex-download table-body-download">
          <div>{roomName.toString()}</div>
          <div>{count.toString()}</div>
          <div>{timeConvert(getAverageTime(totalDuration, count))}</div>
        </div>
      ))}
    </div>,
  );
};

/**
 * Fills the total booking counts table with data
 *
 * @returns {JSX}
 */
export const totalBookingsCountData = bookingsCount =>
  jsxToString(
    <div class="table-download booked-rooms-download">
      <div class="table-flex-download table-header-download total-bookings-count-table-download">
        <div>Period</div>
        <div>Bookings</div>
      </div>
      {bookingsCount.map(({ totalBookings, period }) => (
        <div key={period} class="table-flex-download table-body-download total-bookings-count-table-download">
          <div>{period}</div>
          <div>{totalBookings.toString()}</div>
        </div>
      ))}
    </div>,
  );

