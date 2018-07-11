import React from 'react';
import PropTypes from 'prop-types';
import DeleteResource from './DeleteResource';
import EditResource from './EditResource';

const Resource = ({ resource }) => (
  <tr>
    <td>{resource.name}</td>
    <td className="action-buttons">
      <EditResource resourceName={resource.name} />
      <DeleteResource toDelete={resource} />
    </td>
  </tr>
);

Resource.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Resource;
