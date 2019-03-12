import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../../assets/styles/peopleList.scss';
import TableHead from '../helpers/TableHead';
import People from './People';
import Pagination from '../commons/Pagination';
import { GET_LOCATIONS_QUERY } from '../../graphql/queries/Rooms';
import UPDATE_ROLES_MUTATION from '../../graphql/mutations/People';
import {
  GET_PEOPLE_QUERY,
  GET_ROLES_QUERY,
} from '../../graphql/queries/People';
import { formatPeopleData } from '../../graphql/mappers/People';
import MenuTitle from '../commons/MenuTitle';
import Spinner from '../commons/Spinner';
import Sort from '../commons/Sort';
import notification from '../../utils/notification';
import Overlay from '../commons/Overlay';
import DataNotFound from '../commons/DataNotFound';
import ErrorIcon from '../../components/commons/ErrorIcon';

export class PeopleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: { ...props.people.users },
      hideDropdownMenu: false,
      optionName: null,
      id: '',
      dataFetched: true, // true when there is an active internet connection
      isFetching: false,
      currentPage: 1,
    };
  }

  componentWillReceiveProps(props) {
    const { users } = props.people;
    this.setState({
      users,
      hideDropdownMenu: false,
    });
  }

  /**
   * It initiates the call to fetch users and updates the state
   *
   * @param {number} perPage
   * @param {number} page
   * @param {string} optionName
   * @param {number} id
   *
   * @returns {void}
   */
  fetchPeople = (
    perPage,
    page,
    optionName = this.state.optionName,
    id = this.state.id,
  ) => {
    this.setState({ isFetching: true });
    this.props.people
      .fetchMore({
        variables: {
          page,
          perPage,
          locationId: optionName === 'location' ? id : 0,
          roleId: optionName === 'access' ? id : 0,
        },
        updateQuery: /* istanbul ignore next */ (prev, { fetchMoreResult }) => {
          this.setState({
            users: fetchMoreResult.users,
            hideDropdownMenu: false,
            currentPage: page,
          });
        },
      })
      .then(() => this.setState({ dataFetched: true, isFetching: false }))
      .catch(() => {
        this.setState({ dataFetched: false, isFetching: false });
        notification(
          toastr,
          'error',
          'You seem to be offline, check your internet connection.',
        )();
      });
  };

  /**
   * It sets state and calls fetchPeople
   *
   * @param {string} optionName
   * @param {number} id
   *
   * @returns {void}
   */
  sortPeople = (optionName, id) => () => {
    this.setState({
      id,
      optionName,
      hideDropdownMenu: true,
    });
    this.fetchPeople(5, 1, optionName, id);
  };

  render() {
    const { editRole } = this.props;
    const { loading, error, refetch } = this.props.people;
    const { users, isFetching, currentPage } = this.state;
    const {
      allLocations,
      loading: loadingLocations,
      error: locationsError,
    } = this.props.locations;
    const {
      roles,
      loading: loadingRoles,
      error: rolesError,
    } = this.props.roles;
    if (loading || loadingLocations || loadingRoles) return <Spinner />;
    if (error && error.message === 'GraphQL error: No users found') return <DataNotFound />;
    return (
      <div className="settings-people">
        <div
          className={`action-menu ${isFetching ? 'disabled-buttons' : null}`}
        >
          <MenuTitle title="People" />
          <Sort
            sortOptions={{ location: allLocations, access: roles }}
            fetchSortedData={this.sortPeople}
            hideDropdownMenu={this.state.hideDropdownMenu}
            withChildren
          />
        </div>
        <div className="settings-people-list">
          {isFetching ? <Overlay /> : null}
          {!(error || locationsError || rolesError) ?
            <div className="table">
              <TableHead titles={['Name', 'Location', 'Access Level']} />
              <div className="table__body">
                {this.props.people.users &&
                users.users.map(person => (
                  <People
                    people={formatPeopleData(person)}
                    allRoles={roles}
                    key={person.id}
                    refetch={refetch}
                    currentPage={currentPage}
                    editRole={editRole}
                  />
                ))}
              </div>
            </div>
          : <ErrorIcon />
          }
        </div>
        {!error && <Pagination
          totalPages={users.pages}
          hasNext={users.hasNext}
          hasPrevious={users.hasPrevious}
          handleData={this.fetchPeople}
          dataFetched={this.state.dataFetched}
          isFetching={isFetching}
          currentPage={currentPage}
        />}
      </div>
    );
  }
}

PeopleList.propTypes = {
  people: PropTypes.shape({
    users: PropTypes.shape({
      users: PropTypes.array,
      pages: PropTypes.number,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
  }).isRequired,
  locations: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      }),
    ),
    PropTypes.object,
  ]).isRequired,
  roles: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        role: PropTypes.string,
      }),
    ),
    PropTypes.object,
  ]).isRequired,
  editRole: PropTypes.func.isRequired,
};

export default compose(
  graphql(GET_PEOPLE_QUERY, {
    name: 'people',
    options: () => ({
      /* istanbul ignore next */
      /* Reasoning: no explicit way of testing configuration options */
      variables: {
        page: 1,
        perPage: 5,
        locationId: 0,
        roleId: 0,
      },
    }),
  }),
  graphql(GET_ROLES_QUERY, { name: 'roles' }),
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
  graphql(UPDATE_ROLES_MUTATION, {
    name: 'editRole',
  }),
)(PeopleList);
