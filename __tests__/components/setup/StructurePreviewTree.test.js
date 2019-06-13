import React from 'react';
import { shallow, mount } from 'enzyme';
import StructurePreviewTree from '../../../src/components/setup/StructurePreviewTree';
import mockData, { sampleData, event } from '../../../__mocks__/setup/StructurePreviewTree';
import testData from '../../../__mocks__/setup/Setup';
import * as deleteStructure from '../../../src/components/helpers/mutationHelpers/Preview';

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

describe('Unit test for structure preview tree component when data is defined', () => {
  const handleClick = jest.fn();
  const updateStructure = jest.fn();
  const data = sampleData;
  const props = { data, handleClick, updateStructure };
  const wrapper = mount(<StructurePreviewTree {...props} />);

  it('should find preview-structure-tree and tree in the DOM ', () => {
    expect(wrapper.find('.preview-structure-tree')).toHaveLength(1);
    expect(wrapper.find('.tree')).toHaveLength(1);
  });

  it('should return structure ids when getStructureIds is called', () => {
    const response = wrapper.instance().getStuctureIds(sampleData[1].children);
    expect(response).toEqual(['afcf2ecc-4a6b-4f5a-8579-ea904ae584ct']);
  });

  it('should update the isLoading state when toggleLoading is called', () => {
    wrapper.instance().toggleLoading();
    wrapper.update();
    expect(wrapper.state().isLoading).toEqual(true);
  });

  it('should set confirm that the error state is empty when structure delete is successful', async () => {
    wrapper.setState({
      confirmDelete: 'DELETE',
    });
    wrapper.update();
    jest.spyOn(deleteStructure, 'deleteOfficeStructure').mockResolvedValue(true);
    await wrapper.instance().structureDelete(testData.allStructures)();
    expect(wrapper.state().success).toEqual('success');
  });

  it('should set the error state when the confirm text !== DELETE', async () => {
    wrapper.setState({
      confirmDelete: 'test',
    });
    wrapper.update();
    jest.spyOn(deleteStructure, 'deleteOfficeStructure').mockRejectedValue(true);
    await wrapper.instance().structureDelete(testData.allStructures)();
    expect(wrapper.state().error).toEqual('type DELETE in capital letter in the box to delete the entire office structure');
  });

  it('should run the catch block when there is an error in deleting the structure', async () => {
    wrapper.setState({
      confirmDelete: 'DELETE',
    });
    wrapper.update();
    jest.spyOn(deleteStructure, 'deleteOfficeStructure').mockRejectedValue(false);
    await wrapper.instance().structureDelete(testData.allStructures)();
    expect(wrapper.state().error).toEqual('Network error, kindly try again!');
  });

  it('should set the state of confirmDelete to the input value', () => {
    wrapper.instance().handleChange(event);
    expect(wrapper.state().confirmDelete).toEqual('DELETE');
  });
});

describe('Unit test for structure preview tree component when data is undefined', () => {
  const handleClick = jest.fn();
  const updateStructure = jest.fn();
  const props = { handleClick, updateStructure };
  const wrapper = shallow(<StructurePreviewTree {...props} />);

  it('should find a div with a class no-structure when there is no data to display', () => {
    wrapper.instance().goBackToSetup(handleClick);
    expect(wrapper.find('.no-structure')).toHaveLength(1);
  });
});
