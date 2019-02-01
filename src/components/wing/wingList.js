import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Wing from "./wings"; // eslint-disable-line
import AddWing from "./addWing"; // eslint-disable-line
import '../../assets/styles/officelist.scss';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import { GET_ALL_WINGS } from '../../graphql/queries/wings';
import MenuTitle from '../commons/MenuTitle';
import Spinner from '../commons/Spinner';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';

/**
 * Wing list component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
export const WingList = (props) => {
  const { allWings, loading } = props.allWings;
  const { user } = props.user;
  if (user) saveItemInLocalStorage('access', user.roles[0].id);

  return (
    /* istanbul ignore next */
    loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="settings-offices">
          <div className="settings-offices-control">
            <MenuTitle title="Wings" />
            <AddWing />
          </div>
          <div className="settings-offices-list">
            <table>
              <ColGroup />
              <TableHead titles={['Wing', 'Block', 'Floor', 'Action']} />
              <tbody>
                {allWings &&
                  allWings.map(wing => (
                    <Wing wing={wing} key={wing.name} wingId={wing.id} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

WingList.propTypes = {
  allWings: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

WingList.defaultProps = {
  allWings: {
    id: 1,
    name: '',
  },
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(GET_ALL_WINGS, { name: 'allWings' }),
  graphql(GET_USER_ROLE, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email:
          process.env.NODE_ENV === 'test'
            ? 'sammy.muriuki@andela.com'
            : userData.email,
      },
    }),
  }),
)(WingList);
