import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import toastr from 'toastr';
import Resource from './Resource';
import AddResourceComponent from './AddResource';
import '../assets/styles/resourcelist.scss';
import { GET_RESOURCES_QUERY } from '../graphql/queries/Resources';
import { formatResourceData } from '../graphql/mappers/Resources';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import Pagination from './commons/Pagination';
import MenuTitle from './MenuTitle';
import Spinner from './commons/Spinner';
import notification from '../utils/notification';

export class ResourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allResources: { ...props.data.allResources },
      dataFetched: true, // true when there is an active internet connection
      currentPage: 1,
    };
  }

  componentWillReceiveProps(props) {
    const { allResources } = props.data;
    this.setState({
      allResources,
    });
  }

  handleData = (perPage, page) => {
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data.fetchMore({
      variables: {
        page,
        perPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          allResources: fetchMoreResult.allResources,
          currentPage: page,
        });
      },
    }).then(() => this.setState({ dataFetched: true }))
      .catch(() => {
        this.setState({ dataFetched: false });
        notification(
          toastr,
          'error',
          'You seem to be offline, check your internet connection.',
        )();
      });
  }

  render() {
    const { loading, error, refetch } = this.props.data;
    const { allResources, currentPage } = this.state;

    if (loading) return <Spinner />;

    if (error) return <div>{error.message}</div>;

    return (
      <div className="settings-resource">
        <div className="settings-resource-list">
          <div className="settings-resource-control">
            <MenuTitle title="Resources" />
            <AddResourceComponent />
          </div>
          <table>
            <ColGroup />
            <TableHead titles={['Resource', 'Action']} />
            <tbody>
              {allResources.resources.map(resource => (
                <Resource
                  currentPage={currentPage}
                  resource={formatResourceData(resource)}
                  refetch={refetch}
                  key={resource.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={allResources.pages}
          hasNext={allResources.hasNext}
          hasPrevious={allResources.hasPrevious}
          handleData={this.handleData}
          dataFetched={this.state.dataFetched}
        />
      </div>
    );
  }
}


ResourceList.propTypes = {
  data: PropTypes.shape({
    allResources: PropTypes.shape({
      resources: PropTypes.array,
    }),
    refetch: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchMore: PropTypes.func,
  }).isRequired,
};

export default graphql(GET_RESOURCES_QUERY, {
  options: () => ({
    /* istanbul ignore next */
    /* Reasoning: no explicit way of testing configuration options */
    variables: {
      page: 1,
      perPage: 5,
    },
  }),
})(ResourceList);
