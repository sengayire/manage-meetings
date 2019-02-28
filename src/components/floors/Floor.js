import React from 'react';
import PropTypes from 'prop-types';
import DeleteFloor from './DeleteFloor'; //eslint-disable-line
import EditFloor from './EditFloor'; //eslint-disable-line

/**
 * Floor Component
 *
 * @param {Object} floor
 *
 * @returns {JSX}
 */
export const Floor = ({ floor, refetch }) => (
  <div className="table__row">
    <span>{floor.name}</span>
    <span>{floor.block}</span>
    <span>
      <EditFloor
        id="edit-modal"
        floorName={floor.name}
        floorId={floor.id}
        floorLocation={floor.office}
      />
      &nbsp;
      <DeleteFloor floorName={floor.name} id="delete-modal" floorId={floor.id} refetch={refetch} />
    </span>
  </div>
);

Floor.propTypes = {
  floor: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Floor;
