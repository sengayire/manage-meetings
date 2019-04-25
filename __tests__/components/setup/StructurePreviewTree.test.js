import React from 'react';
import { shallow } from 'enzyme';
import StructurePreviewTree from '../../../src/components/setup/StructurePreviewTree';
import mockData, { sampleData } from '../../../__mocks__/setup/StructurePreviewTree';

describe('Unit test for structure preview tree component', () => {
  const handleClick = jest.fn();
  const data = mockData;
  const props = { data, handleClick };
  const wrapper = shallow(<StructurePreviewTree {...props} />);

  it('should return an empty array when an empty data is passed to dataTree function', () => {
    const emptyData = wrapper.instance().dataTree([]);
    expect(emptyData).toHaveLength(0);
  });

  it('should call the dataTree function', () => {
    const dataTreeSpy = jest.spyOn(wrapper.instance(), 'dataTree');
    wrapper.instance().dataTree(data);
    expect(dataTreeSpy).toHaveBeenCalled();
  });

  it('should call the getNestedChildren function', () => {
    const getNestedChildrenSpy = jest.spyOn(wrapper.instance(), 'getNestedChildren');
    wrapper.instance().getNestedChildren();
    expect(getNestedChildrenSpy).toHaveBeenCalled();
  });

  it('should call the renderLevels function', () => {
    const renderLevelsSpy = jest.spyOn(wrapper.instance(), 'renderLevels');
    wrapper.instance().renderLevels(data);
    expect(renderLevelsSpy).toHaveBeenCalled();
  });

  it('should call the getNestedChildren based on the argument length', () => {
    const getNestedChildrenSpy = jest.spyOn(wrapper.instance(), 'getNestedChildren');
    wrapper.instance().getNestedChildren(sampleData, sampleData[0].parentId);
    expect(getNestedChildrenSpy).toHaveBeenCalledTimes(4);
  });

  it('should call the renderEditButton function', () => {
    const renderEditButtonSpy = jest.spyOn(wrapper.instance(), 'renderEditButton');
    wrapper.instance().renderEditButton(handleClick);
    expect(renderEditButtonSpy).toHaveBeenCalled();
  });
});

describe('Unit test for structure preview tree component when data is undefined', () => {
  const data = '';
  const props = { data };
  const wrapper = shallow(<StructurePreviewTree {...props} />);

  it('should find preview-structure-tree and tree in the DOM ', () => {
    expect(wrapper.find('.preview-structure-tree')).toHaveLength(1);
    expect(wrapper.find('.tree')).toHaveLength(1);
  });
});
