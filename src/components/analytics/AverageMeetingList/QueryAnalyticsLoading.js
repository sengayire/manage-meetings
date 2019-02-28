import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import TableHead from '../../helpers/TableHead';
import '../../../assets/styles/averageMeetinglist.scss';

/**
 * Component for loading query analytics
 *
 * @returns {JSX}
 */
const QueryAnalyticsLoading = () => (
  <div className="average-meeting">
    <div className="average-meeting-control">
      <h4 className="header-title">Average time spent/Meeting Room</h4>
    </div>
    <div className="average-meeting-list">
      <div className="table">
        <TableHead
          titles={['Room', 'No. of meetings', 'Average Meeting Duration']}
        />
        <div className="table__body">
          <div className="table__row--loading">
            <ProgressBar type="linear" mode="indeterminate" />
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
);

export default QueryAnalyticsLoading;
