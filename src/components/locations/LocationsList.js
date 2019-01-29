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

export const LocationsList = (props) => {
  const {
    loading, refetch, allLocations,
  } = props.data;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="settings-locations">
      <div className="settings-locations-control">
        <MenuTitle title="Locations" />
        <AddLocation refetch={refetch} />
      </div>
      <div className="settings-locations-list">
        <table>
          <ColGroup />
          <TableHead titles={['Location', 'Country', 'abbreviation']} />
          <tbody>
            {allLocations && allLocations.map(location => (
              <Location
                location={location}
                key={location.id}
              />
             ))}
          </tbody>
        </table>
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
};

LocationsList.defaultProps = {
  data: {
    loading: true,
  },
};

export default compose(
  graphql(GET_ALL_LOCATIONS),
)(LocationsList);
