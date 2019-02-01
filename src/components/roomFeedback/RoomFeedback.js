import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import '../../assets/styles/roomFeedback.scss';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import MenuTitle from '../commons/MenuTitle';
import AddQuestion from './AddQuestion';
import Feedback from './Feedback';
import feedbackList from '../../fixtures/roomFeebdack';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';

/**
 * Component for Room Feedback
 *
 * @returns {JSX}
 */
export const RoomFeedback = (props) => {
  const { user } = props.user;
  if (user) saveItemInLocalStorage('access', user.roles[0].id);

  return (
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
};

RoomFeedback.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};


const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
export default graphql(GET_USER_ROLE, {
  name: 'user',
  options: /* istanbul ignore next */ () => ({
    variables: {
      email:
        process.env.NODE_ENV === 'test'
          ? 'sammy.muriuki@andela.com'
          : userData.email,
    },
  }),
})(RoomFeedback);
