import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import notification from '../../utils/notification';

const accessMenuCaret = () => (
  <span className="access-by-caret" />
);

const People = ({
  people: {
    email, name, accessLevel, location, picture,
  }, allRoles, editRole,
}) => {
  const editRoleFunction = (roleId) => {
    const variables = { variables: { email, roleId } };
    editRole(variables)
      .then(() => {
        notification(
          toastr, 'success',
          `'${name}' role has been changed successfully`,
        )();
      })
      .catch(err => notification(toastr, 'error', err.graphQLErrors[0].message)());
  };
  return (
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
                <MenuItem
                  className={`access-menu ${role.role === accessLevel ? 'selected' : ''}`}
                  key={role.id}
                  caption={role.role}
                  onClick={() => editRoleFunction(role.id)}
                />
              ))
            }
          </IconMenu>
        </span>
      </td>
    </tr>
  );
};

People.propTypes = {
  people: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    accessLevel: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  allRoles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
  })).isRequired,
  editRole: PropTypes.func.isRequired,
};

export default People;
