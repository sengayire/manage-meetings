import React from 'react';
import { mount } from 'enzyme';
import WelcomePage from '../../../src/components/setup/WelcomePage';

describe('Admin welcome page component', () => {
  const user = {
    user: {
      id: '214',
      firstName: 'test',
      roles: [{ id: 2, role: 'Admin' }],
    },
  };

  const handleClick = jest.fn();
  const wrappedComponent = mount(<WelcomePage user={user} handleClick={handleClick} />);

  it('should render div elements', () => {
    expect(wrappedComponent.find('div')).toHaveLength(7);
  });

  it('should render button', () => {
    expect(wrappedComponent.find('button')).toHaveLength(1);
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
    button.simulate('click');
    expect(handleClick.mock.calls.length).toBe(1);
  });
});
