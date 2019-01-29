import React from 'react';
import '../../assets/styles/devicelist.scss';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import Device from './Device';
import devices from '../../fixtures/devices';
import MenuTitle from '../commons/MenuTitle';

const deviceListItems = devices.map(device => (
  <Device device={device} key={device.name} />
));

/**
 * Device List Component
 *
 * @returns {JSX}
 */
const DeviceList = () => (
  <div className="settings-devices-list">
    <div className="settings-devices-control">
      <MenuTitle title="Devices" />
    </div>
    <table>
      <ColGroup />
      <TableHead
        titles={['Name', 'Type', 'Date Added', 'Last Seen', 'Location']}
      />
      <tbody>{deviceListItems}</tbody>
    </table>
  </div>
);

export default DeviceList;
