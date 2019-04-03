import React from 'react';
import { shallow } from 'enzyme';
import PreviewComponent from '.../../../src/components/setup/Preview';
import { props, flattenedData } from '../../../src/fixtures/Preview';

describe('Preview page component', () => {
  const wrapper = shallow(<PreviewComponent {...props} />);

  it('should return flatten data when save & submit button is clicked ', () => {
    const locationId = wrapper.instance().getUserLocationId();
    expect(locationId).toBe(3);
    const structuredData = wrapper.instance().formatLocationStructureData();
    expect(flattenedData.length).toEqual(structuredData.length);
  });
});
