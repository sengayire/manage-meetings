import React from 'react';
import PropTypes from 'prop-types';
import timeConvert from '../../helpers/timeConverter';

export const getAverageTime = (time, count) => (
  count === 0 ? 0 : Math.round(time / count)
);


/**
 * Component for QueryAnalyticsPerMeetingRoom
 *
 * @param {Object} data
 *
 * @returns {JSX}
 */
const QueryAnalyticsPerMeetingRoom = ({ data }) =>
  data.meetingDurationAnalytics.map(({ roomName, count, totalDuration }, index) => (
    <div className="table__row--analytics" key={(index + 1).toString()}>
      <span>{roomName}</span>
      <span>{count}</span>
      <span>{timeConvert(getAverageTime(totalDuration, count))}</span>
    </div>
  ));

QueryAnalyticsPerMeetingRoom.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default QueryAnalyticsPerMeetingRoom;
