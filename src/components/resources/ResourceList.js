import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Resource from './Resource';
import AddResourceComponent from './AddResource';
import '../../assets/styles/resourcelist.scss';
import { GET_RESOURCES_QUERY } from '../../graphql/queries/Resources';
import { formatResourceData } from '../../graphql/mappers/Resources';
import TableHead from '../helpers/TableHead';
import Pagination from '../commons/Pagination';
import MenuTitle from '../commons/MenuTitle';
import Spinner from '../commons/Spinner';
import notification from '../../utils/notification';
import Overlay from '../commons/Overlay';
import { GET_USER_ROLE, GET_USER_QUERY } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import defaultUserRole from '../../fixtures/user';
import DataNotFound from '../commons/DataNotFound';
import Errors from '../commons/Errors';

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
    };
  }

  componentWillReceiveProps(props) {
    const { allResources } = props.data;
    this.setState({
      allResources,
    });
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
    const { allResources, currentPage, isFetching } = this.state;
    const { user } = this.props.user;
    if (loading) return <Spinner />;
    else if (error && error.message === 'GraphQL error: No more resources') return <DataNotFound />;
    else if (user) saveItemInLocalStorage('access', user.roles[0].id);
    return (
      <div className="settings-resource">
        <div className={`settings-resource-control ${isFetching ? 'disabled-buttons' : null}`}>
          <MenuTitle title="Resources" />
          <AddResourceComponent userLocation={this.props.userLocation.user} refetch={refetch} />
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
            <Errors message="Data cannot be returned at the moment" />
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
  user: PropTypes.shape({
    user: PropTypes.object,
  }),
  userLocation: PropTypes.shape({
    user: PropTypes.object,
  }),
};

ResourceList.defaultProps = {
  user: defaultUserRole,
  userLocation: {
    user: {
      location: '',
    },
  },
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

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
  graphql(GET_USER_ROLE, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email: process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email,
      },
    }),
  }),
  graphql(GET_USER_QUERY, {
    name: 'userLocation',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email: process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email,
      },
    }),
  }),
)(ResourceList);
