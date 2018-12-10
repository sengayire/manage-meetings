import React from 'react';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

const menuText = () => (
  <div className="addRoomBtn">
    <span>Add Floor</span>
  </div>
);

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
