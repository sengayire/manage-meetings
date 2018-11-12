import React from 'react';
import { Query } from 'react-apollo';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Pagination from '../commons/Pagination';
import { ANALYTICS_MEETING_ROOM_PER_DAY } from '../../graphql/queries/analytics';
import timeConvert from '../helpers/timeConverter';

const QueryAnalyticsPerDay = () => (
  <Query query={ANALYTICS_MEETING_ROOM_PER_DAY}>
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

      const { MeetingsDurationaAnalytics } = data.dailyDurationsOfMeetings;

      return MeetingsDurationaAnalytics.map(({ roomName, count, totalDuration }) => (
        <tr key={roomName}>
          <td>{roomName}</td>
          <td>{count}</td>
          <td>{timeConvert(totalDuration)}</td>
        </tr>
      ));
    }}
  </Query>
);

export const QueryAnalyticsPerDailyPagination = () => (
  <Pagination totalPages={50} hasNext hasPrevious={false} handleData={() => {}} reverse />
);

export default QueryAnalyticsPerDay;
