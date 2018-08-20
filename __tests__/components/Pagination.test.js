import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../src/components/commons/Pagination';

describe('Pagination Component', () => {
  const props = {
    totalPages: 4,
  };
  const paginationWrapper = shallow(<Pagination {...props} />);

  it('renders without crashing', () => {
    expect(paginationWrapper).toMatchSnapshot();
  });

  it('updates page state on input change', () => {
    expect(paginationWrapper.instance().state.page).toEqual(1);
    expect(paginationWrapper.instance().state.perPage).toEqual(5);

    const select = paginationWrapper.find('select').first();
    select.simulate('change', {
      preventDefault: jest.fn(),
      target: {
        name: 'page',
        value: 2,
      },
    });
    expect(paginationWrapper.instance().state.page).toEqual(2);
  });

  it('updates perPage state on input change', () => {
    expect(paginationWrapper.instance().state.perPage).toEqual(5);

    const select = paginationWrapper.find('select').first();

    select.simulate('change', {
      preventDefault: jest.fn(),
      target: {
        name: 'perPage',
        value: 10,
      },
    });
    expect(paginationWrapper.instance().state.perPage).toEqual(10);
  });
});

