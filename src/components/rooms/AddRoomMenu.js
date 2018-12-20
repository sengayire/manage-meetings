import React from 'react';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import WrappedAddRoomToEpicTower from './AddRoomToEpicTower';
import AddRoomToKampala from './AddRoomToKampala';
import AddRoomToNairobi from './AddRoomNairobi';
import '../../assets/styles/addRoomMenu.scss';

/**
 * The button for adding rooms
 *
 * @returns {JSX}
 */
const menuText = () => (
  <div className="addRoomBtn">
    <span>Add Room</span>
  </div>
);

/**
 * Displays the components in which rooms can be added
 *
 * @returns {JSX}
 */
const AddRoomMenu = () => (
  <IconMenu className="add-room-menu" icon={menuText()}>
    <MenuItem caption="Select Office" disabled />
    <MenuDivider />
    <MenuItem>
      <WrappedAddRoomToEpicTower />
    </MenuItem>
    <MenuItem>
      <AddRoomToNairobi />
    </MenuItem>
    <MenuItem>
      <AddRoomToKampala />
    </MenuItem>
    <MenuItem caption="New York" />
  </IconMenu>
);

export default AddRoomMenu;
