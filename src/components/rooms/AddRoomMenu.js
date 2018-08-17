import React from 'react';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import AddRoomToEpicTower from './AddRoomToEpicTower';
import AddRoomToKampala from './AddRoomToKampala';
import AddRoomNairobi from './AddRoomNairobi';

import '../../assets/styles/addRoomMenu.scss';

const menuText = () => (
  <div className="addRoomBtn">
    <span>Add Room</span>
  </div>
);

const AddRoomMenu = () => (
  <IconMenu className="add-room-menu" icon={menuText()}>
    <MenuItem caption="Select Office" disabled />
    <MenuDivider />
    <MenuItem>
      <AddRoomToEpicTower />
    </MenuItem>
    <MenuItem>
      <AddRoomNairobi />
    </MenuItem>
    <MenuItem>
      <AddRoomToKampala />
    </MenuItem>
    <MenuItem caption="New York" />
  </IconMenu>
);

export default AddRoomMenu;
