import React from 'react';
import '../assets/styles/roomFeedback.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import MenuTitle from './MenuTitle';
import AddQuestion from './AddQuestion';
import Feedback from './Feedback';
import feedbackList from '../fixtures/roomFeebdack';

/**
 * Component for Room Feedback
 *
 * @returns {JSX}
 */
const RoomFeedback = () => (
  <div className="room-feedback">
    <div className="room-feedback__control">
      <MenuTitle title="ROOM FEEDBACK" />
      <AddQuestion />
    </div>
    <div className="room-feedback__list">
      <table>
        <ColGroup />
        <TableHead titles={['Question', 'Type', 'Responses', 'Start Date', 'Duration', 'Action', 'Status']} />
        <tbody>
          {
            <Feedback
              feedback={feedbackList}
            />
          }
        </tbody>
      </table>
    </div>
  </div>
);

export default RoomFeedback;
