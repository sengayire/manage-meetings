import React from 'react';
import { mount } from 'enzyme';
import ImageLoader from '../../../src/components/commons/ImageLoader';
import Spinner from '../../../src/components/commons/Spinner';

describe('Image loader component tests', () => {
  const props = {
    source: 'path/to/image',
    altText: 'test image',
  };
  const mountedWrapper = mount(<ImageLoader {...props} />);

  it('should render component', () => {
    expect(mountedWrapper.find(Spinner)).toBeDefined();
    expect(mountedWrapper.find('img')).toBeDefined();
  });

  it('should hide spinner after image has loaded', () => {
    mountedWrapper.find('img').simulate('load');
    expect(mountedWrapper.find(Spinner).length).toBe(0);
  });
});
