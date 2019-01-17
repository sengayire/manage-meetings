import React from 'react';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

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
const AddFloorMenu = () => (
  <IconMenu className="add-room-menu" icon={menuText()}>
    <MenuItem caption="Select Office" disabled />
    <MenuDivider />
    <MenuItem caption="To The Crest" />
    <MenuItem caption="To Epic Tower" />
    <MenuItem caption="To St.Catherines" />
    <MenuItem caption="Kigali Office" />
  </IconMenu>
);

export default AddFloorMenu;
