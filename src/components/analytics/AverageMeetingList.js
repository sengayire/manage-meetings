import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMonth, { QueryAnalyticsPerMonthPagination } from './QueryAnalyticsPerMonth';
import QueryAnalyticsPerWeek, { QueryAnalyticsPerWeekPagination } from './QueryAnalyticsPerWeek';
import QueryAnalyticsPerDay, { QueryAnalyticsPerDailyPagination } from './QueryAnalyticsPerDay';
import Tip from '../commons/Tooltip';

const AverageMeetingList = ({ dateValue }) => {
  let renderData;
  let dataPagination;
  let tip =
    'The number of meetings in a room,  the average number of attendees to these meetings as well as the average duration of the meetings.';
  // render component matching what is picked from the drop down
  switch (dateValue) {
    case 'This Month':
      renderData = <QueryAnalyticsPerMonth />;
      dataPagination = <QueryAnalyticsPerMonthPagination />;
      break;
    case 'This Week':
      renderData = <QueryAnalyticsPerWeek />;
      dataPagination = <QueryAnalyticsPerWeekPagination />;
      break;
    case 'Today':
      renderData = <QueryAnalyticsPerDay />;
      dataPagination = <QueryAnalyticsPerDailyPagination />;
      break;
    default:
      renderData = null;
      dataPagination = null;
      tip = null;
  }

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
          <tbody>{renderData}</tbody>
        </table>
      </div>
      <div className="average-meeting-pagination">{dataPagination}</div>
    </div>
  );
};

AverageMeetingList.propTypes = {
  dateValue: PropTypes.shape({
    dates: PropTypes.object,
  }),
};
AverageMeetingList.defaultProps = {
  dateValue: {},
};

export default AverageMeetingList;
