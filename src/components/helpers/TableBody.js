import React from 'react';
import PropTypes from 'prop-types';
import { formatRoomData } from '../../graphql/mappers/Rooms';
import Room from '../../components/Room';

const TableBody = props => (
  <tbody className="bundle">
    {props.rooms.map(room => (
      <Room
        room={formatRoomData(room)}
        key={room.id}
        locations={props.location}
      />
    ))}
  </tbody>
);
TableBody.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;

