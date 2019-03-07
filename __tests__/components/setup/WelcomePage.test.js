import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_USER_ROLE } from '../../../src/graphql/queries/People';
import WelcomePage from '../../../src/components/setup/WelcomePage';

describe('Admin welcome page component', () => {
  const mocks = [
    {
      request: {
        query: GET_USER_ROLE,
        name: 'user',
        variables: {
          email: 'davis.kimame@andela.com',
        },
      },
      result: {
        data: {
          user: {
            id: '214',
            roles: [{ id: 2, role: 'Admin' }],
          },
        },
      },
    },
  ];

  const wrappedComponent = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <WelcomePage />
    </MockedProvider>,
  );

  it('should first render a spinner', () => {
    expect(wrappedComponent.find('Spinner').exists()).toBeTruthy();
  });

  it('should render div elements', () => {
    expect(wrappedComponent.find('div')).toHaveLength(3);
  });

  it('should render button', async () => {
    await wait();
    wrappedComponent.update();
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

  it('should render an in-active button if user is a default user', async () => {
    const defaultUserMock = mocks;
    defaultUserMock[0].result.data.user.roles[0].role = 'Default User';
    const wrapper = mount(
      <MockedProvider mocks={defaultUserMock} addTypename={false}>
        <WelcomePage />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    const button = wrapper.find('Button');
    expect(button.find('[disabled=true]')).toHaveLength(1);
  });
});
