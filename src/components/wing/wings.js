import React from 'react';
import PropTypes from 'prop-types';
import DeleteWing from "./DeleteWing"; //eslint-disable-line
import EditWing from "./EditWing"; //eslint-disable-line

/**
 * Wing component
 *
 * @param {object} wing
 *
 * @returns {JSX}
 */
export const Wing = ({ wing }) => (
  <tr>
    <td>{wing.name}</td>
    <td>{wing.floor.block.name}</td>
    <td>{wing.floor.name}</td>
    <td>
      <EditWing
        id="edit-modal"
        wingName={wing.name}
        wingId={wing.id}
        wingBlock={wing.block}
      />
      &nbsp;
      <DeleteWing wingName={wing.name} id="delete-modal" wingId={wing.id} />
    </td>
  </tr>
);
Wing.propTypes = {
  wing: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default Wing;
