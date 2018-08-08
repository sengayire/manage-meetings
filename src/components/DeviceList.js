import React from 'react';
import '../assets/styles/devicelist.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import Device from './Device';
import devices from '../fixtures/devices';

const deviceListItems = devices.map(device => (
  <Device device={device} key={device.name} />
));

const DeviceList = () => (
  <div className="settings-devices-list">
    <table>
      <ColGroup />
      <TableHead titles={['Name', 'Type', 'Date Added', 'Last Seen', 'Location']} />
      <tbody>
        {deviceListItems}
      </tbody>
    </table>
  </div>
);

export default DeviceList;
