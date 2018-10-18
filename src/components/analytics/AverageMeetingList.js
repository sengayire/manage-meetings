import React from 'react';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import avaerageMeetings from '../../fixtures/analytics';
import Pagination from '../commons/Pagination';

const meetingListItems = avaerageMeetings.map(meeting => (
  <tr key={meeting.id}>
    <td>{meeting.name}</td>
    <td>{meeting.meetingsCount}</td>
    <td>{meeting.attendees}</td>
    <td>{meeting.duration}</td>
  </tr>
));

const AvarageMeetingList = () => (
  <div className="average-meeting">
    <div className="average-meeting-control">
      <h4 className="header-title">
      Average time spent/Meeting Room
      </h4>
      <span className="moreVerticalIcon" />
    </div>
    <div className="average-meeting-list">
      <table>
        <TableHead titles={['Room', 'No. of meetings', 'Average No. of Attendees', 'Average Meeting Duration']} />
        <tbody>
          {meetingListItems}
        </tbody>
      </table>
    </div>
    <div className="average-meeting-pagination">
      <Pagination
        totalPages={50}
        hasNext
        hasPrevious={false}
        handleData={() => {}}
        reverse
      />
    </div>
  </div>
);

export default AvarageMeetingList;

