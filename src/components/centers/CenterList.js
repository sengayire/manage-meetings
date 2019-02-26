import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import MenuTitle from '../commons/MenuTitle';
import AddCenter from './AddCenter'; // eslint-disable-line
import { GET_ALL_CENTERS } from '../../graphql/queries/centers';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import Location from './Center';
import Spinner from '../commons/Spinner';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import DataNotFound from '../commons/DataNotFound';
import Errors from '../commons/Errors';

export const CenterList = (props) => {
  const {
    loading, refetch, allLocations, error,
  } = props.data;
  const { user } = props.user;

  if (loading) {
    return <Spinner />;
  }
  if (user && user.roles) saveItemInLocalStorage('access', user.roles[0].id);
  return (
    <div className="settings-locations">
      <div className="settings-locations-control">
        <MenuTitle title="Centers" />
        <AddCenter refetch={refetch} />
      </div>
      <div className="settings-locations-list">
        {
        !error ?
        (
          allLocations.length < 1
          ? <DataNotFound /> :
          <table>
            <ColGroup />
            <TableHead titles={['Center', 'Country', 'Abbreviation', 'Action']} />
            <tbody>
              {allLocations && allLocations.map(location => (
                <Location
                  location={location}
                  key={location.id}
                  refetch={refetch}
                />
             ))}
            </tbody>
          </table>
        ) :
          <Errors message="Data cannot be returned at the moment" />
      }
      </div>
    </div>
  );
};

CenterList.propTypes = {
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

CenterList.defaultProps = {
  data: {
    loading: true,
  },
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(GET_ALL_CENTERS),
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
)(CenterList);
