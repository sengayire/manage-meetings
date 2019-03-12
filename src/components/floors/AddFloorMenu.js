import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import AddFloorComponent from './AddFloor';
import Spinner from '../commons/Spinner';
import GET_ALL_BLOCKS from '../../graphql/queries/Blocks';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import ErrorIcon from '../../components/commons/ErrorIcon';

/* This gets the token from the localstorage and select the user
email to pass as a parameter to the query being sent */
const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

/**
 * Renders the add office button
 *
 * @returns {JSX}
 */
const menuText = () => (
  <div className="addRoomBtn">
    <span>Add Floor</span>
  </div>
);

/**
 * Drop down list of offices to which floors can be added
 *
 * @returns {JSX}
 */
export class AddFloorMenu extends React.Component {
  static propTypes = {
    allBlocks: PropTypes.shape({
      allBlocks: PropTypes.array,
      loading: PropTypes.bool,
      error: PropTypes.object,
    }),
    refetch: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
  };

  static defaultProps = {
    allBlocks: {},
    currentPage: 1,
  };

  /**
 * Loops through all offices and returns each one of them as a menu item.
 *
 * @returns {JSX}
 */
  getBlocks = () => {
    const { loading, allBlocks, error } = this.props.allBlocks;
    const { user: { user } } = this.props;
    if (loading) return <Spinner />;
    if (error) return <ErrorIcon message="cannot fetch data" />;
    const allBlocksList = allBlocks.filter(block => block.offices.location.name === user.location);
    return (
      allBlocksList.map(block => (
        <MenuItem key={block.id}>
          <AddFloorComponent
            theOffice={block.name}
            refetch={this.props.refetch}
            blocks={block.offices.location.name === 'Nairobi' && allBlocks}
            currentPage={this.props.currentPage}
            officeId={parseInt(block.id, 10)}
          />
        </MenuItem>
      ))
    );
  }

  render() {
    return (
      <IconMenu className="add-room-menu" icon={menuText()}>
        <MenuItem caption="Select Office" disabled />
        <MenuDivider />
        {this.getBlocks()}
      </IconMenu>
    );
  }
}

AddFloorMenu.propTypes = {
  user: PropTypes.shape({
    location: PropTypes.string,
  }),
};

AddFloorMenu.defaultProps = {
  user: { location: 'Nairobi' },
};

export default compose(
  graphql(GET_ALL_BLOCKS, {
    name: 'allBlocks',
  }),
  graphql(GET_USER_QUERY, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email: userData ? userData.email : 'test.email@gmail.com',
      },
    }),
  }),
)(AddFloorMenu);
