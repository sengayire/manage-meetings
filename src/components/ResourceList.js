import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Resource from './Resource';
import AddResource from './AddResource';
import '../assets/styles/resourcelist.scss';
import { GET_RESOURCES_QUERY } from '../graphql/queries/Resources';
import { formatResourceData } from '../graphql/mappers/Resources';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';

const ResourceList = (props) => {
  const { allResources, loading, error } = props.data;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="settings-resource">
      <div className="settings-resource-list">
        <AddResource />
        <table>
          <ColGroup />
          <TableHead titles={['Resource', 'Action']} />
          <tbody>
            {allResources.resources.map(resource => (
              <Resource
                resource={formatResourceData(resource)}
                key={resource.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


ResourceList.propTypes = {
  data: PropTypes.shape({
    allResources: PropTypes.shape({
      resources: PropTypes.array,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
};

export default graphql(GET_RESOURCES_QUERY, { name: 'data' })(ResourceList);
