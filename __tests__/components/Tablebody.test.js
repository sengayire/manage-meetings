import React from 'react';
import { shallow } from 'enzyme';
import TableBody from '../../src/components/helpers/TableBody';

describe('Pagination Component', () => {
  const props = {
    content: {
      rooms: [{
        id: '3',
        name: 'Gulu',
        floor: {
          block: {
            offices: {
              name: 'The Crest',
              location: {
                name: 'Kampala',
                id: '1',
              },
            },
          },
        },
      }],
    },
    location: [],
  };
  const bodyWrapper = shallow(<TableBody {...props} />);

  it('renders without crashing', () => {
    expect(bodyWrapper).toMatchSnapshot();
  });
});

