import React from 'react';
import { shallow } from 'enzyme';
import DeleteBlockModal from '../../../src/components/blocks/DeleteBlockModal';

const props = {
  handleModalStateChange: jest.fn(),
  handleCloseModal: jest.fn(),
  handleDeleteBlock: jest.fn(),
  block: {
    name: 'Udi',
    id: '1',
  },
  closeModal: false,

};

describe('DeleteBlockModal Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DeleteBlockModal {...props} />,
    );
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
