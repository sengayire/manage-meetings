import React from 'react';
import { shallow } from 'enzyme';
import BlockModal from '../../../src/components/blocks/BlockModal';

const props = {
  handleModalStateChange: jest.fn(),
  handleCloseModal: jest.fn(),
  closeModal: false,
  handleSubmit: jest.fn(),
  handleFormInputChange: jest.fn(),
  office: {
    id: '1',
    name: 'Udi',
    location: {
      name: 'Lagos',
    },
  },
  editing: false,
};

describe('BlockModal Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BlockModal {...props} />,
    );
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
