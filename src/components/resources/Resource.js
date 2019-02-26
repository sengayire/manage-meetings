import React from 'react';
import PropTypes from 'prop-types';
import WrappedDeleteResource from './DeleteResource';
import WrappedEditResource from './EditResource';

/**
 * Component that shows resources in a table
 *
 * @param {Object} resourcesObject
 *
 * @returns {JSX}
 */
const Resource = ({ resource, refetch, currentPage }) => (
  <div className="table__row">
    <span>{resource.name}</span>
    <span>
      <WrappedEditResource resource={resource} refetch={refetch} currentPage={currentPage} /> &nbsp;
      <WrappedDeleteResource toDelete={resource} refetch={refetch} currentPage={currentPage} />
    </span>
  </div>
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
