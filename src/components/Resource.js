import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-toolbox/lib/button';
import DeleteResource from './DeleteResource';

const Resource = ({ resource }) => (
  <tr>
    <td>{resource.name}</td>
    <td>{resource.rooms}</td>
    <td className="action-buttons">
      <Button label="Edit" flat />
      <DeleteResource toDelete={resource} />
    </td>
  </tr>
);

Resource.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rooms: PropTypes.number.isRequired,
  }).isRequired,
};

export default Resource;
