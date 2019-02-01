import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import AddFloorComponent from './AddFloor';
import Spinner from '../commons/Spinner';
import { GET_ALL_OFFICES_QUERY } from '../../graphql/queries/Offices';

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
    data: PropTypes.shape({
      allOffices: PropTypes.shape({
        office: PropTypes.array,
      }),
      loading: PropTypes.bool,
      error: PropTypes.object,
    }),
    refetch: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
  };

  static defaultProps = {
    data: {},
    currentPage: 1,
  };

  /**
 * Loops through all offices and returns each one of them as a menu item.
 *
 * @returns {JSX}
 */
  getOffice = () => {
    const { loading, allOffices: { offices } = {}, error } = this.props.data;
    if (loading) return <Spinner />;
    if (error) return <div>{error.message}</div>;
    return (
      offices.map(office => (
        <MenuItem key={office.id}>
          <AddFloorComponent
            theOffice={office.name}
            refetch={this.props.refetch}
            blocks={office.blocks}
            currentPage={this.props.currentPage}
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
        {this.getOffice()}
      </IconMenu>
    );
  }
}

export default graphql(GET_ALL_OFFICES_QUERY, {
  /* istanbul ignore next */
  /* Reasoning: no explicit way of testing configuration options */
  options: () => ({
    variables: {
      page: 1,
      perPage: 50,
    },
  }),
})(AddFloorMenu);
