import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMeetingRoom, { QueryAnalyticsPerMeetingRoomPagination } from './QueryAnalyticsPerMeetingRoom';
import { getTodaysDate } from '../../utils/Utilities';
import Tip from '../commons/Tooltip';

const AverageMeetingList = ({ dateValue }) => {
  const tip =
    'The number of meetings in a room,  the average number of attendees to these meetings as well as the average duration of the meetings.';

  return (
    <div className="average-meeting">
      <div className="average-meeting-control">
        <h4 className="header-title">Average time spent/Meeting Room</h4>
        <span className="moreVerticalIcon">{Tip(tip)}</span>
      </div>
      <div className="average-meeting-list">
        <table>
          <TableHead
            titles={['Room', 'No. of meetings', 'Average Meeting Duration']}
          />
          <tbody>
            <QueryAnalyticsPerMeetingRoom dateValue={dateValue} />
          </tbody>
        </table>
      </div>
      <div className="average-meeting-pagination">
        <QueryAnalyticsPerMeetingRoomPagination />
      </div>
    </div>
  );
};

AverageMeetingList.propTypes = {
  dateValue: PropTypes.shape({
    dates: PropTypes.object,
  }),
};
AverageMeetingList.defaultProps = {
  dateValue: {
    startDate: `"${getTodaysDate()}"`,
    endDate: `"${getTodaysDate()}"`,
  },
};

export default AverageMeetingList;
