import React from 'react';
import { graphql, compose } from 'react-apollo';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import PropTypes from 'prop-types';
import '../../assets/styles/peopleList.scss';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import People from './People';
import Pagination from '../commons/Pagination';
import { GET_LOCATIONS_QUERY } from '../../graphql/queries/Rooms';
import UPDATE_ROLES_MUTATION from '../../graphql/mutations/People';
import { GET_PEOPLE_QUERY, GET_ROLES_QUERY } from '../../graphql/queries/People';
import { formatPeopleData } from '../../graphql/mappers/People';
import MenuTitle from '../MenuTitle';


const locationMenuCaret = () => (
  <div className="sort-by-caret" />
);

const handleErrorMessage = (...errors) => {
  const errorMessage = errors.find(e => e !== undefined).message;
  return errorMessage;
};

export class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: { ...props.data.users },
    };
  }

  componentWillReceiveProps(props) {
    const { users } = props.data;
    this.setState({
      users,
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
          users: fetchMoreResult.users,
        });
      },
    });
  }

  render() {
    const { editRole } = this.props;
    const { loading, error } = this.props.data;
    const { users } = this.state;
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
    if (loading || loadingLocations || loadingRoles) return <div>Loading...</div>;
    if (error || locationsError || rolesError) {
      const errorMessage = handleErrorMessage(error, locationsError, rolesError);
      return <div>{errorMessage}</div>;
    }
    return (
      <div className="settings-people">
        <div className="settings-people-list">
          <div className="action-menu">
            <MenuTitle title="People" />
            <span className="sort-by">
          Sort by: <span className="location">Location</span>
              <IconMenu position="topRight" className="people-sort-dropdown" icon={locationMenuCaret()}>
                <MenuItem caption="Location" disabled />
                <MenuDivider />
                <MenuItem className="profile-menu" caption="All" />
                {
                allLocations.map(location => (
                  <MenuItem className="profile-menu" key={location.id} caption={location.name} />
              ))
            }
              </IconMenu>
            </span>
          </div>
          <table>
            <ColGroup />
            <TableHead titles={['Name', 'Location', 'Access Level', 'Action']} />
            <tbody>
              {
            users.users.map(person => (
              <People
                people={formatPeopleData(person)}
                allRoles={roles}
                key={person.id}
                editRole={editRole}
              />
            ))
          }
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={users.pages}
          hasNext={users.hasNext}
          hasPrevious={users.hasPrevious}
          handleData={this.handleData}
        />
      </div>
    );
  }
}

PeopleList.propTypes = {
  data: PropTypes.shape({
    users: PropTypes.shape({
      users: PropTypes.array,
      pages: PropTypes.number,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchMore: PropTypes.func,
  }).isRequired,
  locations: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
  roles: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      role: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
  editRole: PropTypes.func.isRequired,
};

export default compose(
  graphql(GET_PEOPLE_QUERY, {
    options: () => ({
      /* istanbul ignore next */
      /* Reasoning: no explicit way of testing configuration options */
      variables: {
        page: 1,
        perPage: 5,
      },
    }),
  }),
  graphql(GET_ROLES_QUERY, { name: 'roles' }),
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
  graphql(UPDATE_ROLES_MUTATION, {
    name: 'editRole', options: { refetchQueries: [{ query: GET_PEOPLE_QUERY }] },
  }),
)(PeopleList);
