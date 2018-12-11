import React from 'react';
import PropTypes from 'prop-types';
import WrappedDeleteResource from './DeleteResource';
import WrappedEditResource from './EditResource';

const Resource = ({ resource, refetch }) => (
  <tr>
    <td>{resource.name}</td>
    <td>
      <WrappedEditResource resource={resource} refetch={refetch} /> &nbsp;
      <WrappedDeleteResource toDelete={resource} />
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
