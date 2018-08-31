import React from 'react';
import PropTypes from 'prop-types';
import EditUser from './EditUser';
import DeleteButton from '../assets/images/delete.svg';

const People = ({
  people: {
    name, accessLevel, location, picture,
  },
}) => (
  <tr>
    <td><img className="profilePic" src={picture} alt="profilePicture" />{name}</td>
    <td>{location}</td>
    <td>{accessLevel}</td>
    <td>
      <EditUser
        userName={name}
        userLocation={location}
        accessLevel={accessLevel}
      />
      <button><img src={DeleteButton} alt="Delete" /></button>
    </td>
  </tr>
);
People.propTypes = {
  people: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    accessLevel: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};
export default People;
