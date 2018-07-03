import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Room from './Room';
import '../assets/styles/roomlist.scss';
import { GET_ROOMS_QUERY } from '../graphql/queries/Rooms';
import { formatRoomData } from '../graphql/mappers/Rooms';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import AddRoom from './rooms/AddRoom';

const RoomsList = (props) => {
  const { allRooms, loading, error } = props.data;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="settings-rooms">
      <AddRoom />
      <div className="settings-rooms-list">
        <table>
          <ColGroup />
          <TableHead titles={['Room', 'Location', 'Office', 'Action']} />
          <tbody>
            {allRooms.map(room => (
              <Room room={formatRoomData(room)} key={room.id} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RoomsList.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
};

export default graphql(GET_ROOMS_QUERY, { name: 'data' })(RoomsList);
