import React from 'react';
import { mount } from 'enzyme';
import RoomsList from '../../src/components/RoomsList';

describe('RoomList Component', () => {
  it('renders correctly from memory', () => {
    expect(mount.bind(null, <RoomsList />)).not.toThrow();
  });
});
