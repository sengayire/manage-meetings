import React from 'react';
import { mount, shallow } from 'enzyme';
// eslint-disable-next-line
import fetch from 'unfetch';
import { MockedProvider } from 'react-apollo/test-utils';
// eslint-disable-next-line
import BlocksList, { BlocksList as ListOfBlocks } from '../../../src/components/blocks/BlocksList';
import defaultUserRole from '../../../src/fixtures/user';

const blocks = {
  allBlocks: [
    {
      id: '5',
      name: 'Container',
      offices: {
        name: 'The Dojo 2',
        id: '2',
      },
    },
  ],
};

const offices = {
  allOffices: {
    offices: [
      {
        id: '81',
        name: 'The Crest7',
        location: {
          name: 'Kampala',
        },
      }],
    error: 'GraphQL error: No more offices',
  },
};

describe('blockslist Component', () => {
  const wrapper = mount(
    <MockedProvider>
      <BlocksList
        allBlocks={blocks}
        allOffices={offices}
        user={defaultUserRole}
      />
    </MockedProvider>,
  );


  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders settings-rooms', () => {
    const blocksList = shallow(<ListOfBlocks
      allBlocks={blocks}
      allOffices={offices}
      user={defaultUserRole}
    />,
    );
    const settings = blocksList.find('.settings-rooms');
    expect(settings).toHaveLength(1);
  });

  it('set user prop to empty', () => {
    const blocksList = shallow(<ListOfBlocks
      allBlocks={blocks}
      allOffices={offices}
      user={{}}
    />,
    );
    expect(blocksList.props().user).toBeFalsy();
  });

  it('should render the DataNotFound component when there is no data in the database', () => {
    const props = {
      allOffices: {
        laoding: false,
        error: { message: 'GraphQL error: No more offices' },
      },
      allBlocks: {
        laoding: false,
        error: { message: 'error' },
      },
      user: {
        laoding: false,
        error: { message: 'error' },
      },
    };
    const blocksList = shallow(<ListOfBlocks {...props} />,
    );
    expect(blocksList.find('DataNotFound')).toHaveLength(1);
  });
});
