import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { ApolloConsumer } from 'react-apollo';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import notification from '../../utils/notification';
import { getAllLocationsFromCache } from '../helpers/QueriesHelpers';
import { changeUserLocation } from '../helpers/mutationHelpers/people';
import { defaultUserIcon } from '../../utils/images/images';

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
  allRoles, perPage, refetch, currentPage, editRole,
}) => {
  const editLocationFunction = async (locId, emailOfUser) => {
    const response = await changeUserLocation(locId, emailOfUser);
    notification(
      toastr,
      'success',
      `${response.changeUserLocation.user.name}'s location has been changed to ${response.changeUserLocation.user.location}`,
    )();
    refetch({ page: currentPage, perPage });
  };

  const editRoleFunction = (roleId) => {
    const variables = { variables: { email, roleId } };
    editRole(variables)
      .then(() => {
        notification(
          toastr,
          'success',
          `'${name}' role has been changed successfully`,
        )();
        refetch({ page: currentPage, perPage });
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  };
  return (
    <ApolloConsumer>
      {
        client => (
          <div className="table__row">
            <span>
              <img
                className="profilePic"
                id={email}
                alt="alt"
                onError={() => {
                  const element = document.getElementById(email);
                  if (element.alt === 'alt') element.src = defaultUserIcon;
                  element.alt = 'profile';
                }}
                src={picture}
              />
              {name}
            </span>
            <span>{location}
              <IconMenu
                position="topRight"
                className="people-access-dropdown"
                icon={accessMenuCaret()}
              >
                {getAllLocationsFromCache().map(loc => (
                  <MenuItem
                    className={`access-menu ${
                      loc.name === location ? 'selected' : ''
                      }`}
                    key={loc.name}
                    caption={loc.name}
                    onClick={() => {
                      client.writeData({ data: { userLocation: loc } });
                      editLocationFunction(loc.id, email);
                    }
                    }
                  />
                ))}
              </IconMenu>
            </span>
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
        )}
    </ApolloConsumer>);
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
  perPage: PropTypes.number.isRequired,
};

export default People;
