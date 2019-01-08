import React from 'react';
import PropTypes from 'prop-types';
import WrappedDeleteResource from './DeleteResource';
import WrappedEditResource from './EditResource';

const Resource = ({ resource, refetch, currentPage }) => (
  <tr>
    <td>{resource.name}</td>
    <td>
      <WrappedEditResource resource={resource} refetch={refetch} currentPage={currentPage} /> &nbsp;
      <WrappedDeleteResource toDelete={resource} refetch={refetch} currentPage={currentPage} />
    </td>
  </tr>
);

Resource.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func,
  currentPage: PropTypes.number,
};

Resource.defaultProps = {
  refetch: null,
  currentPage: 1,
};

export default Resource;
