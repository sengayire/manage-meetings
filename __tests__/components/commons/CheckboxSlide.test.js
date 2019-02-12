import React from 'react';
import { shallow } from 'enzyme';
import CheckboxSlider from '../../../src/components/commons/CheckboxSlide';

describe('The CheckboxSlider renders without crashing', () => {
  const event = {
    target: {
      nextSibling: {
        classList: {
          contains: jest.fn(() => true),
          remove: jest.fn(),
          add: jest.fn(),
        },
      },
    },
  };
  const props = {
    checked: true,
    disabled: jest.fn(),
    questionId: 1,
    updateQuestion: jest.fn(input => Promise.resolve(input)),
  };

  it('should render the CheckboxSlider without crashing', () => {
    const wrapper = shallow(<CheckboxSlider {...props} />);
    expect(wrapper.length).toBeTruthy();
  });

  it('should change class name to false', () => {
    props.checked = false;
    const wrapper = shallow(<CheckboxSlider {...props} />);
    wrapper.find('input').simulate('change', event);
    expect(event.target.nextSibling.classList.add).toBeCalledWith('false');
    expect(props.updateQuestion).toBeCalled();
  });

  it('should change class name to checked', () => {
    event.target.nextSibling.classList.contains = jest.fn(() => false);
    const wrapper = shallow(<CheckboxSlider {...props} />);
    wrapper.find('input').simulate('change', event);
    expect(event.target.nextSibling.classList.add).toBeCalledWith('checked');
    expect(props.updateQuestion).toBeCalled();
  });

  it('should throw error on query fail', () => {
    props.updateQuestion = jest.fn(params => Promise.reject(params));
    event.target.nextSibling.classList.contains = jest.fn(() => true);
    const wrapper = shallow(<CheckboxSlider {...props} />);
    wrapper.find('input').simulate('change', event);
    expect(props.updateQuestion).toBeCalled();
  });

  it('should call the update question mutation', async () => {
    event.target.nextSibling.classList.contains = jest.fn(() => false);
    const wrapper = shallow(<CheckboxSlider {...props} />);
    await wrapper.find('input').simulate('change', event);
    expect(event.target.nextSibling.classList.contains).toBeCalledWith('checked');
    expect(props.updateQuestion).toBeCalled();
  });
});
