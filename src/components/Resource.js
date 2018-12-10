import React from 'react';
import PropTypes from 'prop-types';
import { DeleteResource } from './DeleteResource';
import { EditResource } from './EditResource';

const Resource = ({ resource, refetch }) => (
  <tr>
    <td>{resource.name}</td>
    <td>
      <EditResource resource={resource} refetch={refetch} /> &nbsp;
      <DeleteResource toDelete={resource} />
    </td>
  </tr>
);

Resource.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func,
};

Resource.defaultProps = {
  refetch: null,
};


export default Resource;
