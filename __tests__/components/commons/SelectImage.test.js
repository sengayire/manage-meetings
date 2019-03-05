import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectImage from '../../../src/components/commons/SelectImage';

describe('Select Image', () => {
  let event;
  beforeEach(() => {
    event = {
      target: {
        files: [{
          name: 'newImageToUpload.png',
          size: 1024,
          type: 'image/jpeg',
          webKitRelativePath: '',
        }],
      },
    };
  });

  it('should render properly', () => {
    const wrapper = mount(<SelectImage imageUrl="" updateThumbnailState={jest.fn()} />);
    expect(wrapper.find('.image-select')).toBeDefined();
  });

  it('should render input element', () => {
    const wrapper = mount(<SelectImage imageUrl="path/to/image.jpg" updateThumbnailState={jest.fn()} />);
    expect(wrapper.find('input')).toBeDefined();
  });

  it('should not select files larger than 200KB', () => {
    window.URL.createObjectURL = jest.fn();
    const wrapper = mount(
      <SelectImage
        updateThumbnailState={jest.fn()}
        thumbnailName=""
        imageUrl=""
      />,
    );
    event.target.files[0].size = 5000000;
    const input = wrapper.find('input');
    input.simulate('change', event);
    expect(wrapper.find('.placeholder')).toBeDefined();
  });

  it('should not select images with disallowed extentions', () => {
    window.URL.createObjectURL = jest.fn();
    const wrapper = mount(
      <SelectImage
        updateThumbnailState={jest.fn()}
        thumbnailName=""
        imageUrl=""
      />,
    );
    event.target.files[0].type = 'application/pdf';
    const input = wrapper.find('input');
    input.simulate('change', event);
    expect(wrapper.find('.placeholder')).toBeDefined();
  });

  it('should not shorten thumbnail name', () => {
    window.URL.createObjectURL = jest.fn();
    const wrapper = shallow(
      <SelectImage
        updateThumbnailState={jest.fn()}
        thumbnailName=""
        imageUrl=""
      />,
    );
    event.target.files[0].name = 'IAmAnImageAndMyNameIsVeryVeryVeryLong';
    const input = wrapper.find('input');
    input.simulate('change', event);
    expect(wrapper.contains('IAmAnImageAndMyNameIsV...')).toBeDefined();
  });

  it('should render an img element', () => {
    window.URL.createObjectURL = jest.fn();
    event.target.files[0].size = 1024;
    const wrapper = shallow(
      <SelectImage
        updateThumbnailState={jest.fn()}
        thumbnailName=""
        imageUrl=""
      />,
    );
    const input = wrapper.find('input');
    input.simulate('change', event);
    expect(wrapper.find('img')).toBeDefined();
  });

  it('should render an placeholder if there is no image file', () => {
    window.URL.createObjectURL = jest.fn();
    event.target.files = [];
    const wrapper = shallow(
      <SelectImage
        updateThumbnailState={jest.fn()}
        thumbnailName=""
        imageUrl=""
      />,
    );
    const input = wrapper.find('input');
    input.simulate('change', event);
    expect(wrapper.find('.placeholder')).toBeDefined();
  });
});
