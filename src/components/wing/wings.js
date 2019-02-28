import React from 'react';
import PropTypes from 'prop-types';
import DeleteWing from './DeleteWing'; //eslint-disable-line
import EditWing from './EditWing'; //eslint-disable-line

/**
 * Wing component
 *
 * @param {object} wing
 *
 * @returns {JSX}
 */
export const Wing = ({ wing }) => (
  <div className="table__row">
    <span>{wing.name}</span>
    <span>{wing.floor && wing.floor.block.name}</span>
    <span>{wing.floor && wing.floor.name}</span>
    <span>
      <EditWing id="edit-modal" wingName={wing.name} wingId={wing.id} wingBlock={wing.block} />
      &nbsp;
      <DeleteWing wingName={wing.name} id="delete-modal" wingId={wing.id} />
    </span>
  </div>
);
Wing.propTypes = {
  wing: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default Wing;
