import React, { useContext, useState } from 'react';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMeetingRoom from './AverageMeetingList/QueryAnalyticsPerMeetingRoom';
import Tip from '../commons/Tooltip';
import Pagination from '../commons/Pagination';
import Overlay from '../commons/Overlay';
import ErrorIcon from '../commons/ErrorIcon';
import meetingDurationAnalyticsMock from '../../fixtures/meetingDurationAnalytics';
import AnalyticsContext from '../helpers/AnalyticsContext';
import getMeetingDurationAnalytics from '../helpers/analytics/AverageMeetingList';
import paginate from '../helpers/FrontendPagination';

export const AverageMeetingList = () => {
  const { fetching, analytics } = useContext(AnalyticsContext);
  const [{ perPage, currentPage }, updatePageDetails] = useState({ perPage: 5, currentPage: 1 });

  const tip =
     'The number of meetings in a room,  the average number of attendees to these meetings as well as the average duration of the meetings.';

  const analyticsForMeetingsDurationsMock = {
    meetingDurationAnalytics: meetingDurationAnalyticsMock(3),
  };

  const error = analytics === null;

  let analyticsForMeetingsDurations;

  if (!fetching) {
    analyticsForMeetingsDurations = paginate(
      analytics.analytics,
      { currentPage }, {
        formatter: getMeetingDurationAnalytics,
        dataName: 'meetingDurationAnalytics',
      },
    );
  }

  const analyticsData = fetching
    ? analyticsForMeetingsDurationsMock
    : analyticsForMeetingsDurations;


  const handlePageChange = (perPageData, currentPageData) => updatePageDetails({
    perPage: perPageData,
    currentPage: currentPageData,
  });

  const displayPaginator = !fetching
  && !(analyticsData.meetingDurationAnalytics.length < 5 && currentPage === 1);

  return (
    <div className="average-meeting overlay-container">
      {fetching && <Overlay />}
      <div className="average-meeting-control">
        <h4 className="header-title">Average time spent/Meeting Room</h4>
        <span className="moreVerticalIcon">{Tip(tip)}</span>
      </div>
      <div className="average-meeting-list">
        <div>
          <TableHead
            titles={['Room', 'No. of meetings', 'Average Meeting Duration']}
          />
          <div>
            {
              error ? (
                <ErrorIcon
                  message="No resource found"
                />
              )
              : <QueryAnalyticsPerMeetingRoom
                data={analyticsData}
              />
            }
          </div>
        </div>
      </div>
      {displayPaginator &&
        <div className="average-meeting-pagination">
          <div>
            <Pagination
              totalPages={analyticsForMeetingsDurations.pages}
              hasNext={analyticsForMeetingsDurations.hasNext}
              hasPrevious={analyticsForMeetingsDurations.hasPrevious}
              handleData={handlePageChange}
              isFetching={fetching}
              perPage={perPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default AverageMeetingList;
