import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Wing from "./wings"; // eslint-disable-line
import AddWing from './addWing'; // eslint-disable-line
import '../../assets/styles/officelist.scss';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import MenuTitle from '../commons/MenuTitle';
import Spinner from '../commons/Spinner';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import { GET_ALL_WINGS } from '../../graphql/queries/wings';
import Errors from '../commons/Errors';

/**
 * Get user data from token
*/
const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

/**
 * Wing list component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
export const WingList = (props) => {
  const { allWings, loading, error } = props.allWings;
  if (error) return <Errors message="Data cannot be returned at the moment" />;
  return (
    /* istanbul ignore next */
    loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="settings-offices">
          <div className="settings-offices-control">
            <MenuTitle title="Wings" />
            <AddWing userLocation={props.data.loading ? '' : props.data.user.location} />
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
  data: PropTypes.shape({
    loading: PropTypes.bool,
    user: PropTypes.object,
  }),
};

WingList.defaultProps = {
  allWings: {
    id: 1,
    name: '',
  },
  data: {
    loading: false,
  },
};

/* istanbul ignore next */
const options = () => ({
  variables: {
    email: userData.email,
  },
});

export default compose(
  graphql(GET_ALL_WINGS, { name: 'allWings' }),
  graphql(GET_USER_QUERY, {
    options,
  }),
)(WingList);
