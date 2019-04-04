import React from 'react';
import { mount } from 'enzyme';
import WelcomePage from '../../../src/components/setup/WelcomePage';
import * as QueryHelper from '../../../src/components/helpers/QueriesHelpers';

describe('Admin welcome page component', () => {
  const user = {
    user: {
      id: '214',
      roles: [{ id: 2, role: 'Admin' }],
    },
  };

  const handleClick = jest.fn();
  const wrappedComponent = mount(<WelcomePage handleClick={handleClick} />);

  it('should first render a spinner', () => {
    expect(wrappedComponent.find('Spinner').exists()).toBeTruthy();
  });

  it('should render div elements', () => {
    expect(wrappedComponent.find('div')).toHaveLength(3);
  });

  it('should render button', () => {
    wrappedComponent.setState({
      user: {
        id: '214',
        roles: [{ id: 2, role: 'Admin' }],
      },
    });
    expect(wrappedComponent.find('button')).toHaveLength(1);
  });

  it('should call update the state when getUserInformation is called', async () => {
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => user.user);
    await wrappedComponent.instance().getUsersInformation();
    wrappedComponent.update();
    expect(wrappedComponent.state('user')).toBe(user.user);
  });

  it('should render the image served from firebase', () => {
    const image = wrappedComponent.find('.image img').getDOMNode();
    expect(
      image.getAttribute('src').search('https://firebasestorage.googleapis.com'),
    ).not.toBeLessThan(0);
  });

  it('should render an active button if user is an admin', () => {
    const button = wrappedComponent.find('Button');
    expect(button.find('[disabled=false]')).toHaveLength(1);
  });

  it('should call click event handler on clicking the button', () => {
    const button = wrappedComponent.find('Button');
    const func = wrappedComponent.instance().props.handleClick;
    button.simulate('click');
    expect(func).toHaveBeenCalled();
  });

  it('should render an in-active button if user is a default user', async () => {
    user.user.roles[0].role = 'Default User';
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => user.user);
    await wrappedComponent.instance().getUsersInformation();
    wrappedComponent.update();
    const button = wrappedComponent.find('Button');
    expect(button.find('[disabled=true]')).toHaveLength(1);
  });
});
