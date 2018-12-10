import React from 'react';
import { shallow } from 'enzyme';
import ExportButton from '../../../src/components/roomFeedback/ExportButton';


describe('Export button', () => {
  it('should render export button', () => {
    const wrapper = shallow(<ExportButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
