import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Resource from './Resource';
import AddResourceComponent from './AddResource';
import { GET_RESOURCES_QUERY } from '../../graphql/queries/Resources';
import { formatResourceData } from '../../graphql/mappers/Resources';
import TableHead from '../helpers/TableHead';
import Pagination from '../commons/Pagination';
import MenuTitle from '../commons/MenuTitle';
import Spinner from '../commons/Spinner';
import notification from '../../utils/notification';
import Overlay from '../commons/Overlay';
import { getUserDetails } from '../helpers/QueriesHelpers';
import DataNotFound from '../commons/DataNotFound';
import ErrorIcon from '../../components/commons/ErrorIcon';

/**
 * Resource List Component
 *
 * @returns {JSX}
 */
export class ResourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allResources: { ...props.data.allResources },
      dataFetched: true, // true when there is an active internet connection
      currentPage: 1,
      isFetching: false,
      location: '',
    };
  }

  componentDidMount() {
    this.setUserLocation();
  }

  componentWillReceiveProps(props) {
    const { allResources } = props.data;
    this.setState({
      allResources,
    });
  }

  /**
   * Sets the current user's location
   *
   * @returns {void}
   */
  setUserLocation = async () => {
    const user = await getUserDetails();
    this.setState({ location: user.location });
  }

  /**
   * Queries resources list
   *
   * @param {Integer} perPage
   * @param {Integer} page
   *
   * @returns {void}
   */

  handleData = (perPage, page) => {
    this.setState({ isFetching: true });
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data
      .fetchMore({
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
      })
      .then(() => this.setState({ dataFetched: true, isFetching: false }))
      .catch(() => {
        this.setState({ dataFetched: false, isFetching: false });
        notification(toastr, 'error', 'You seem to be offline, check your internet connection.')();
      });
  };

  render() {
    const { loading, error, refetch } = this.props.data;
    const {
      allResources, currentPage, isFetching, location,
    } = this.state;

    if (loading) return <Spinner />;
    if (error && error.message === 'GraphQL error: No more resources') return <DataNotFound />;

    return (
      <div className="settings-resource">
        <div className={`settings-resource-control ${isFetching ? 'disabled-buttons' : null}`}>
          <MenuTitle title="Resources" />
          <AddResourceComponent userLocation={location} refetch={refetch} />
        </div>
        <div className="settings-resource-list">
          {isFetching ? <Overlay /> : null}
          {!error ? (
            <div className="table">
              <TableHead titles={['Resource', 'Action']} />
              <div className="table__body">
                {allResources &&
                  allResources.resources.map(resource => (
                    <Resource
                      currentPage={currentPage}
                      resource={formatResourceData(resource)}
                      refetch={refetch}
                      key={resource.id}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <ErrorIcon />
          )}
        </div>
        {!error && (
          <Pagination
            currentPage={currentPage}
            totalPages={allResources.pages}
            hasNext={allResources.hasNext}
            hasPrevious={allResources.hasPrevious}
            handleData={this.handleData}
            dataFetched={this.state.dataFetched}
            isFetching={isFetching}
          />
        )}
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

export default compose(
  graphql(GET_RESOURCES_QUERY, {
    options: () => ({
      /* istanbul ignore next */
      /* Reasoning: no explicit way of testing configuration options */
      variables: {
        page: 1,
        perPage: 5,
      },
    }),
  }),
)(ResourceList);
