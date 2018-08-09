import React from 'react';
import PropTypes from 'prop-types';
import { formatRoomData } from '../../graphql/mappers/Rooms';
import Room from '../../components/Room';

const TableBody = props => (
  <tbody>
    {props.content.rooms.map(room => (
      <Room
        room={formatRoomData(room)}
        key={room.id}
        locations={props.location}
      />
                ))}
  </tbody>
);

TableBody.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string.isRequired,
};

export default TableBody;
