import React from 'react';
import { shallow } from 'enzyme';
import TableBody from '../../../src/components/helpers/TableBody';

describe('Pagination Component', () => {
  const props = {
    rooms: [
      {
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
      },
    ],
    location: [],
  };
  const props2 = {
    rooms: [
      {
        id: '3',
        name: 'Gulu',
        floor: {
          block: { },
        },
      },
    ],
    location: [],
  };

  const bodyWrapper = shallow(<TableBody {...props} />);
  const bodyWrapper2 = shallow(<TableBody {...props2} />);

  it('renders without crashing', () => {
    expect(bodyWrapper).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    expect(bodyWrapper2).toMatchSnapshot();
  });
});

