import React from 'react';
import PropTypes from 'prop-types';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import EditUser from '../EditUser';
import DeleteButton from '../../assets/images/delete.svg';

const accessMenuCaret = () => (
  <span className="access-by-caret" />
);

const People = ({
  people: {
    name, accessLevel, location, picture,
  }, allRoles,
}) => (
  <tr>
    <td><img className="profilePic" src={picture} alt="profilePicture" />{name}</td>
    <td>{location}</td>
    <td>
      <span>
        {accessLevel}
        <IconMenu
          position="topRight"
          className="people-access-dropdown"
          icon={accessMenuCaret()}
        >
          {
              allRoles.map(role => (
                <MenuItem className={`access-menu ${role.role === accessLevel ? 'selected' : ''}`} key={role.id} caption={role.role} />
              ))
            }
        </IconMenu>
      </span>
    </td>
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
  allRoles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
  })).isRequired,
};
export default People;
