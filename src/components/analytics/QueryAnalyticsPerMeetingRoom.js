import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Pagination from '../commons/Pagination';
import MEETING_DURATION_ANALYTICS from '../../graphql/queries/analytics';
import timeConvert from '../helpers/timeConverter';

const QueryAnalyticsPerMeetingRoom = ({ dateValue }) => (
  <Query query={MEETING_DURATION_ANALYTICS} variables={dateValue}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <tr>
            <th colSpan="3">
              <ProgressBar type="linear" mode="indeterminate" />
            </th>
          </tr>
        );
      }
      if (error) {
        return (
          <tr>
            <td>Error...</td>
          </tr>
        );
      }
      const { MeetingsDurationaAnalytics } = data.analyticsForMeetingsDurations;

      return MeetingsDurationaAnalytics.map(
        ({ roomName, count, totalDuration }) => (
          <tr key={roomName}>
            <td>{roomName}</td>
            <td>{count}</td>
            <td>{timeConvert(totalDuration)}</td>
          </tr>
        ),
      );
    }}
  </Query>
);

QueryAnalyticsPerMeetingRoom.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
};
export const QueryAnalyticsPerMeetingRoomPagination = () => (
  <Pagination
    totalPages={50}
    hasNext
    hasPrevious={false}
    handleData={() => {}}
    reverse
  />
);

export default QueryAnalyticsPerMeetingRoom;
