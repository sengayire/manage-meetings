import React from 'react';
import { shallow } from 'enzyme';
import { SelectInput } from '../../../src/components/commons';

describe('SelectInput component', () => {
  const sampleOptions = [
    { value: 1, displayText: 'hello' },
    { value: 2, displayText: 'how are you' },
  ];
  const handleOptionsSelectChange = jest.fn();
  const handleChildrenSelectChange = jest.fn();
  const optionsWrapper = shallow(<SelectInput
    name="testSelect"
    id="testSelect"
    value="1"
    onChange={handleOptionsSelectChange}
    labelText="Select Something"
    options={sampleOptions}
  />);

  const childrenWrapperCode = (
    <SelectInput
      name="testSelect"
      id="testSelect"
      value="1"
      onChange={handleChildrenSelectChange}
      labelText="Select Something"
    >
      <option value={sampleOptions[0].value}>
        {sampleOptions[0].displayText}
      </option>
      <option value={sampleOptions[1].value}>
        {sampleOptions[1].displayText}
      </option>
    </SelectInput>
  );

  const childrenWrapper = shallow(childrenWrapperCode);

  const emptyWrapper = shallow(<SelectInput
    name="testSelect"
    id="testSelect"
    value="1"
    onChange={handleOptionsSelectChange}
    labelText="Select Something"
  />);

  it('should render properly when given options prop', () => {
    expect(childrenWrapper).toMatchSnapshot();
  });

  it('should render properly when given children', () => {
    expect(optionsWrapper).toMatchSnapshot();
  });

  it('should call console.warn when given neither option nor children', () => {
    global.console.warn = jest.fn();
    expect(emptyWrapper).toMatchSnapshot();
  });

  it('should not render placeholder when its not provided', () => {
    expect(emptyWrapper.find('option')).toHaveLength(0);
  });


  it('should render plaveholder when provided', () => {
    emptyWrapper.setProps({ placeholder: 'Hello' });
    emptyWrapper.update();
    const option = emptyWrapper.find('option');
    expect(emptyWrapper).toMatchSnapshot();
    expect(option).toHaveLength(1);
    expect(option.prop('children')).toBe('Hello');
  });

  it('should display value if displayText isn\'t given in options', () => {
    const newOptions = [{ value: 1 }, { value: 2 }];
    optionsWrapper.setProps({ options: newOptions });
    optionsWrapper.update();
    const options = optionsWrapper.find('options');
    options.map((option, index) => (
      expect(option.props().children).toEqual(newOptions[index].value)
    ));
    expect(optionsWrapper).toMatchSnapshot();
  });
});

