import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import AddFloorComponent from './AddFloor';
import Spinner from '../commons/Spinner';
import GET_ALL_BLOCKS from '../../graphql/queries/Blocks';

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
    if (loading) return <Spinner />;
    if (error) return <div>{error.message}</div>;
    return (
      allBlocks.map(block => (
        <MenuItem key={block.id}>
          <AddFloorComponent
            theOffice={block.name}
            refetch={this.props.refetch}
            blocks={block.offices.location.name === 'Nairobi' && allBlocks}
            currentPage={this.props.currentPage}
            officeId={block.id}
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

export default compose(
  graphql(GET_ALL_BLOCKS, {
    name: 'allBlocks',
  }),
)(AddFloorMenu);
