import React from 'react';
import PropTypes from 'prop-types';
import EditButton from '../assets/images/edit.svg';
import DeleteButton from '../assets/images/delete.svg';
import ProfileImg from '../assets/images/profile_icon.svg';

const People = ({
  people: {
    name, accessLevel, location,
  },
}) => (
  <tr>
    <td><img className="profilePic" src={ProfileImg} alt="profilePicture" />{name}</td>
    <td>{location}</td>
    <td>{accessLevel}</td>
    <td>
      <img src={EditButton} alt="Edit" />
      <img src={DeleteButton} alt="Delete" />
    </td>
  </tr>
);
People.propTypes = {
  people: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    accessLevel: PropTypes.string.isRequired,
  }).isRequired,
};
export default People;
