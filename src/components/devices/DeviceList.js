import React from 'react';
import '../../assets/styles/devicelist.scss';
import TableHead from '../helpers/TableHead';
import Device from './Device';
import devices from '../../fixtures/devices';

const deviceListItems = devices.map(device => <Device device={device} key={device.name} />);

/**
 * Device List Component
 *
 * @returns {JSX}
 */
const DeviceList = () => (
  <div className="settings-devices-list">
    <div className="settings-devices-control" />
    <div className="table">
      <TableHead titles={['Name', 'Type', 'Date Added', 'Last Seen', 'Location']} />
      <div className="table__body">{deviceListItems}</div>
    </div>
  </div>
);

export default DeviceList;
