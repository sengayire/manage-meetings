import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import '../assets/styles/roomlist.scss';
import { GET_ROOMS_QUERY, GET_LOCATIONS_QUERY } from '../graphql/queries/Rooms';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import TableBody from './helpers/TableBody';
import Pagination from './commons/Pagination';

const paginator = (data, perPage, page) => {
  const newList = Object.assign([], data);
  const start = perPage * (page - 1);
  const end = perPage * page;
  return ({
    rooms: newList.slice(start, end),
    size: 15,
  });
};

const getTotalPages = (totalResults, perPage) => (
  Math.ceil((totalResults) / perPage)
);

class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 5,
      page: 1,
    };
    this.setPage = this.setPage.bind(this);
  }

  setPage = (perPage, page) => {
    this.setState({ perPage, page });
  };

  render() {
    const { allRooms, loading, error } = this.props.data;
    const {
      allLocations: locations,
      loading: loadingLocations,
      error: locationsError,
    } = this.props.locations;
    const { page, perPage } = this.state;

    const paginatedRooms = paginator(allRooms, perPage, page);

    if (loading || loadingLocations) return <div>Loading...</div>;

    if (error || locationsError) {
      return <div>{error ? error.message : locationsError.message}</div>;
    }

    return (
      <div className="settings-rooms">
        <div className="settings-rooms-control">
          <button id="modal-button" className="button filterBtn">
            {'Filter'}
          </button>
        </div>
        <div className="settings-rooms-list">
          <table>
            <ColGroup />
            <TableHead titles={['Room', 'Location', 'Office', 'Action']} />
            <TableBody content={paginatedRooms} location={locations} />
          </table>
        </div>
        <Pagination
          setPage={this.setPage}
          totalPages={getTotalPages(paginatedRooms.size, this.state.perPage)}
        />
      </div>
    );
  }
}

RoomsList.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
  locations: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
};

export default compose(
  graphql(GET_ROOMS_QUERY, { name: 'data' }),
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
)(RoomsList);
