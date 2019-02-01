import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import MenuTitle from '../commons/MenuTitle';
import AddLocation from './AddLocation'; // eslint-disable-line
import { GET_ALL_LOCATIONS } from '../../graphql/queries/locations';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import Location from './Location';
import Spinner from '../commons/Spinner';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import DataNotFound from '../commons/DataNotFound';

export const LocationsList = (props) => {
  const {
    loading, refetch, allLocations, error,
  } = props.data;
  const { user } = props.user;

  if (loading) {
    return <Spinner />;
  }
  if (user) saveItemInLocalStorage('access', user.roles[0].id);

  if (error) return <div>{error.message}</div>;
  return (
    <div className="settings-locations">
      <div className="settings-locations-control">
        <MenuTitle title="Locations" />
        <AddLocation refetch={refetch} />
      </div>
      <div className="settings-locations-list">
        {
          allLocations.length < 1
          ? <DataNotFound /> :
          <table>
            <ColGroup />
            <TableHead titles={['Location', 'Country', 'abbreviation']} />
            <tbody>
              {
                allLocations.map(location => (
                  <Location
                    location={location}
                    key={location.id}
                  />
              ))
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

LocationsList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    refetch: PropTypes.func,
    allLocations: PropTypes.array,
  }),
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

LocationsList.defaultProps = {
  data: {
    loading: true,
  },
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(GET_ALL_LOCATIONS),
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
)(LocationsList);
