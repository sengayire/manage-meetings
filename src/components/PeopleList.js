import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import '../assets/styles/peopleList.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import People from './People';
import Pagination from './commons/Pagination';
import { GET_PEOPLE_QUERY } from '../graphql/queries/People';
import { formatPeopleData } from '../graphql/mappers/People';

const PeopleList = (props) => {
  const { users, loading, error } = props.data;
  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="settings-people">
      <div className="settings-people-list">
        <div className="action-menu">
          <p className="sort-by">Sort by: <span className="location">Location</span></p>
        </div>
        <table>
          <ColGroup />
          <TableHead titles={['Name', 'Location', 'Access Level', 'Action']} />
          <tbody>
            {
            users.users.map(person => (
              <People people={formatPeopleData(person)} key={person.id} />
            ))
          }
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={users.pages}
      />
    </div>
  );
};

PeopleList.propTypes = {
  data: PropTypes.shape({
    users: PropTypes.shape({
      users: PropTypes.array,
      pages: PropTypes.number,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
};

export default graphql(GET_PEOPLE_QUERY, { name: 'data' })(PeopleList);
