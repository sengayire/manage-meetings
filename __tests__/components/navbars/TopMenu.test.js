import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import { TopMenuComponent } from '../../../src/components/navbars/TopMenu';
import notification from '../../../src/utils/notification';


jest.mock('../../../src/utils/Cookie');
jest.mock('../../../src/utils/notification');

describe('TopMenu Component', () => {
  let wrapper;
  const history = {
    push: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<TopMenuComponent history={history} />);
  });

  it('Should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should update user info', () => {
    wrapper.instance().updateUserInfo({
      firstName: 'foo',
      lastName: 'bar',
    });

    expect(wrapper.state('firstName')).toBe('foo');
  });

  it('Should show error if searchng without criteria', () => {
    notification.mockImplementation(() => () => {});
    wrapper.find('Input').dive().find('input').simulate('keydown', {
      keyCode: 13,
      preventDefault: jest.fn(),
    });
    expect(notification).toHaveBeenCalledWith(toastr, 'error', 'Please select search criteria');
  });

  it('Should show options', () => {
    wrapper.find('Input').dive().find('input').simulate('focus');
    expect(wrapper.state('showOptions')).toBe(true);
  });

  it('Should handle query input', () => {
    wrapper.find('Input').dive().find('input').simulate('change', { target: { value: 'foo' } });
    expect(wrapper.state('query')).toBe('foo');
  });

  it('Should set search criteria', () => {
    const mockFocusFunc = jest.spyOn(wrapper.instance(), 'setFocus').mockImplementation(() => {});
    wrapper.find('button').at(0).simulate('click');
    expect(mockFocusFunc).toHaveBeenCalled();
    expect(wrapper.state('component')).toBe('rooms');
  });

  it('Should handle search', () => {
    wrapper.find('Input').dive().find('input').simulate('keydown', {
      keyCode: 13,
      preventDefault: jest.fn(),
    });
    expect(history.push).toHaveBeenLastCalledWith({
      pathname: '/setup',
      state: {
        component: 'rooms',
        query: 'foo',
      },
    });
  });
});
