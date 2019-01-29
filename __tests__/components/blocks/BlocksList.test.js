import React from 'react';
import { mount, shallow } from 'enzyme';
// eslint-disable-next-line
import fetch from 'unfetch';
import { MockedProvider } from 'react-apollo/test-utils';
// eslint-disable-next-line
import BlocksList, { BlocksList as ListOfBlocks } from '../../../src/components/blocks/BlocksList';

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
  },
};

describe('blockslist Component', () => {
  const wrapper = mount(
    <MockedProvider>
      <BlocksList
        allBlocks={blocks}
        allOffices={offices}
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
    />,
    );
    const settings = blocksList.find('.settings-rooms');
    expect(settings).toHaveLength(1);
  });
});
