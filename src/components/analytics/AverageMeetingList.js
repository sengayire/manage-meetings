import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMonth, { QueryAnalyticsPerMonthPagination } from './QueryAnalyticsPerMonth';


const AverageMeetingList = ({ dateValue }) => {
  let renderData;
  let dataPagination;
  // render component matching what is picked from the drop down
  switch (dateValue) {
    case 'This Month':
      renderData = <QueryAnalyticsPerMonth />;
      dataPagination = <QueryAnalyticsPerMonthPagination />;
      break;
    default:
      renderData = null;
      dataPagination = null;
  }

  return (
    <div className="average-meeting">
      <div className="average-meeting-control">
        <h4 className="header-title">
      Average time spent/Meeting Room
        </h4>
        <span className="moreVerticalIcon" />
      </div>
      <div className="average-meeting-list">
        <table>
          <TableHead titles={['Room', 'No. of meetings', 'Average Meeting Duration']} />
          <tbody>
            {renderData}
          </tbody>
        </table>
      </div>
      <div className="average-meeting-pagination">
        {dataPagination}
      </div>
    </div>
  );
};

AverageMeetingList.propTypes = {
  dateValue: PropTypes.string.isRequired,
};

export default AverageMeetingList;

