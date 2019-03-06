import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import notification from '../../utils/notification';

/**
 * Shows the menuCart besides the Access Level on the people's table
 *
 * @returns {JSX}
 */
const accessMenuCaret = () => <span className="access-by-caret" />;

/**
 * Component that shows people and their attributes
 *
 * @param {Object} people - name, email, accessLevel, location, and picture
 * @param {Object} allRoles
 * @param {function} editRole
 *
 * @returns {void}
 */
const People = ({
  people: {
    email, name, accessLevel, location, picture,
  },
  allRoles,
  refetch,
  currentPage,
  editRole,
}) => {
  const editRoleFunction = (roleId) => {
    const variables = { variables: { email, roleId } };
    editRole(variables)
      .then(() => {
        notification(
          toastr,
          'success',
          `'${name}' role has been changed successfully`,
        )();
        refetch({ page: currentPage });
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  };
  return (
    <div className="table__row">
      <span>
        <img className="profilePic" src={picture} alt="profilePicture" />
        {name}
      </span>
      <span>{location}</span>
      <span>
        <span>
          {accessLevel}
          <IconMenu
            position="topRight"
            className="people-access-dropdown"
            icon={accessMenuCaret()}
          >
            {allRoles.map(role => (
              <MenuItem
                className={`access-menu ${
                  role.role === accessLevel ? 'selected' : ''
                }`}
                key={role.id}
                caption={role.role}
                onClick={() => editRoleFunction(role.id)}
              />
            ))}
          </IconMenu>
        </span>
      </span>
    </div>
  );
};

People.propTypes = {
  people: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    accessLevel: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  allRoles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      role: PropTypes.string,
    }),
  ).isRequired,
  editRole: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default People;
