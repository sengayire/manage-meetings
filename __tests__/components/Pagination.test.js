import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../src/components/commons/Pagination';

describe('Pagination Component', () => {
  const props = {
    totalPages: 4,
    hasNext: true,
    hasPrevious: false,
    handleData: jest.fn(),
  };
  const paginationWrapper = shallow(<Pagination {...props} />);

  it('renders without crashing', () => {
    expect(paginationWrapper).toMatchSnapshot();
  });

  it('updates the page when a page input is provided', () => {
    const preventDefault = jest.fn();

    paginationWrapper.instance().handleChange({ preventDefault, target: { name: 'page', value: 3 } });
    expect(paginationWrapper.instance().state.page).toEqual(3);
  });

  it('updates perPage when a perPage input is provided', () => {
    const preventDefault = jest.fn();

    paginationWrapper.instance().handleChange({ preventDefault, target: { name: 'perPage', value: 10 } });
    expect(paginationWrapper.instance().state.perPage).toEqual(10);
  });

  it('navigates to the next page when next button is clicked', () => {
    paginationWrapper.find('#next').simulate('click');
    expect(paginationWrapper.instance().state.page).toEqual(2);
  });

  it('navigates to the previous page when previous button is clicked', () => {
    paginationWrapper.setState({ page: 5 });
    paginationWrapper.find('#previous').simulate('click');
    expect(paginationWrapper.instance().state.page).toEqual(4);
  });
  it('enables previous button if there is a next input', () => {
    const newProps = {
      totalPages: 4,
      hasNext: true,
      hasPrevious: true,
      handleData: jest.fn(),
    };
    const newPaginationWrapper = shallow(<Pagination {...newProps} />);
    expect(newPaginationWrapper.instance().props.hasPrevious).toEqual(true);
  });
  it('disables next button if there is no next input', () => {
    const newProps = {
      totalPages: 4,
      hasNext: false,
      hasPrevious: true,
      handleData: jest.fn(),
    };
    const newPaginationWrapper = shallow(<Pagination {...newProps} />);
    expect(newPaginationWrapper.instance().props.hasNext).toEqual(false);
  });
});
