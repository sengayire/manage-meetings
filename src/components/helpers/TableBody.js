import React from 'react';
import PropTypes from 'prop-types';
import { formatRoomData } from '../../graphql/mappers/Rooms';
import Room from '../rooms/Room';

/**
 * Component that builds the body of a table
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const TableBody = props => (
  <div className="table_body">
    {props.rooms &&
      props.rooms.map(room => (
        <Room
          currentPage={props.currentPage}
          room={formatRoomData(room)}
          key={room.id}
          locations={props.location}
          refetch={props.refetch}
        />
      ))}
  </div>
);
TableBody.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number,
  refetch: PropTypes.func,
};

TableBody.defaultProps = {
  currentPage: 1,
  refetch: null,
};

export default TableBody;
