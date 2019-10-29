import React from 'react';
import { shallow } from 'enzyme';
import SingleInputWithAddIcon from '../../../src/components/commons/InputAddIcon/InputWithPlusIcon';

describe.only('Input with plus icon component', () => {
  const props = {
    inputPlaceholder: 'Building',
    pressed: jest.fn(),
    name: 'building_1',
    onTextChange: jest.fn(),
    values: {},
    errors: {},
  };
  const wrapper = shallow(<SingleInputWithAddIcon {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive inputPlaceHolderProps', () => {
    expect(wrapper.props().children[0].props.placeholder).toBe(props.inputPlaceholder);
  });

  it('should call pressed when click plus icon', () => {
    wrapper.props().children[0].props.icon.props.onClick();
    expect(props.pressed).toHaveBeenCalled();
  });

  it('Should call onTextChange when user start typing in the text input', () => {
    wrapper.props().children[0].props.onChange();
    expect(props.onTextChange).toHaveBeenCalled();
  });

  it('Should call onTextChange When input lose focus', () => {
    wrapper.props().children[0].props.onBlur();
    expect(props.onTextChange).toHaveBeenCalled();
  });

  it('Should receive value from props', () => {
    props.values = {
      building_1: 'WestAf',
    };
    const component = shallow(<SingleInputWithAddIcon {...props} />);
    expect(component.props().children[0].props.value).toBe('WestAf');
  });

  it('Should receive errors from props', () => {
    props.errors = {
      building_1: '"the building name" should be at least 2 characters in length',
    };

    const component = shallow(<SingleInputWithAddIcon {...props} />);
    expect(component.props().children[0].props.error).toBeTruthy();
    expect(component.find('.building-error-area-style').text()).toBe('"the building name" should be at least 2 characters in length');
  });
});
