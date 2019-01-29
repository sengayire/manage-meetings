import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import '../../assets/styles/addRoomMenu.scss';
import AddBlock from './BlockActions';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { GET_USER_QUERY } from '../../graphql/queries/People';

const menuText = () => (
  <div className="addBlockBtn">
    <span>Add Block</span>
  </div>
);

export const AddBlockMenu = (props) => {
  const { offices: { offices }, user: { loading, user }, refetch } = props;
  return (
    <IconMenu className="add-block-menu" icon={menuText()}>
      <MenuItem caption="Select Office" disabled />
      <MenuDivider />
      <div className="add-block-menu-list">
        {(offices && !loading) &&
          offices.filter(office => office.location.name === user.location)
          .map(office => (
            <MenuItem key={office.id}>
              <AddBlock office={office} refetch={refetch} />
            </MenuItem>
          ),
        )}
      </div>
    </IconMenu>
  );
};

/* This gets the token from the localstorage and select the user
email to pass as a parameter to the query being sent */
const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

AddBlockMenu.propTypes = {
  offices: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  refetch: PropTypes.func,
  user: PropTypes.shape({
    location: PropTypes.string,
  }),
};

AddBlockMenu.defaultProps = {
  refetch: null,
  user: { location: 'Nairobi' },
};

export default compose(
  graphql(GET_USER_QUERY, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email: userData.email,
      },
    }),
  }),
)(AddBlockMenu);
