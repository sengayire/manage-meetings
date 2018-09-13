import React from 'react';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import WrappedAddRoomToEpicTower from './AddRoomToEpicTower';
import AddRoomToKampala from './AddRoomToKampala';
import AddRoomStCatherine from './AddRoomNairobi';

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
      <WrappedAddRoomToEpicTower />
    </MenuItem>
    <MenuItem>
      <AddRoomStCatherine />
    </MenuItem>
    <MenuItem>
      <AddRoomToKampala />
    </MenuItem>
    <MenuItem caption="New York" />
  </IconMenu>
);

export default AddRoomMenu;
