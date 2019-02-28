import React from 'react';
import { shallow } from 'enzyme';
import ExportButton from '../../../src/components/commons/ExportButton';

describe('Unit test for the ExportButton functional component', () => {
  it('should render a DropDown component', () => {
    const props = {
      jpegHandler: jest.fn(),
      csvHandler: jest.fn(),
      pdfHandler: jest.fn(),
    };
    const wrapper = shallow(<ExportButton {...props} />);
    expect(wrapper.find('Dropdown').length).toEqual(1);
  });
});
