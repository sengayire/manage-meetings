/* eslint-disable no-unused-vars */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ADD_ROOM } from '../../../src/graphql/mutations/Rooms';
import AddRooms, {
  renderRoomType,
  renderNameRoms,
  handleFiles,
  handleOnTextChange,
  selectFloor,
  handleInput,
} from '../../../src/components/onboarding/addRooms/AddRooms';


describe('AddRooms component', () => {
  it('should render room type', () => {
    renderRoomType('Meeting call', jest.fn(), {});
  });
  it('should render room handle files input', () => {
    handleFiles({ fileList: [], base64: '' }, '234', [{ id: '234', name: 'rfrftr' }], jest.fn(),
      {},
    );
  });
  it('should render room handleOnTextChaange', () => {
    handleOnTextChange('10', jest.fn(), {}, []);
  });
  it('should render room handle on text change', () => {
    selectFloor('WestAF', jest.fn(), {});
  });
});
