import React from 'react';
import { mount, shallow } from 'enzyme';
import AnalyticsNav from '../../../src/components/navbars/AnalyticsNav';

describe('AnalyticsNav Component', () => {
  const toggleMenu = jest.fn();
  const wrapper = mount(<AnalyticsNav onClick={toggleMenu} onBlur={toggleMenu} />);
  const shallowNav = shallow(<AnalyticsNav />);

  const event = {
    preventDefault: jest.fn(),
  };

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(100);
  });
  it('should have a IconMenu', () => {
    const IconMenu = wrapper.find('IconMenu');
    expect(IconMenu).toHaveLength(1);
  });
  it('should have a IconMenu', () => {
    const RadioGroup = wrapper.find('RadioGroup');
    expect(RadioGroup).toHaveLength(1);
  });
  it('should have a RadioButton', () => {
    const RadioButton = wrapper.find('RadioButton');
    expect(RadioButton).toHaveLength(5);
  });
  it('should have a button', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(5);
  });

  it('should have a button', () => {
    wrapper.setState({
      view: 'overview',
      value: '',
    });
    const action = wrapper.instance();
    const showOverview = jest.spyOn(wrapper.instance(), 'showOverview');
    action.showOverview();
    expect(wrapper.state().view).toEqual('overview');
    wrapper.update();
    expect(showOverview).toBeCalled();
  });

  it('should have a button', () => {
    shallowNav.setState({
      view: 'overview',
    });
    const action = wrapper.instance();
    const showActivityView = jest.spyOn(wrapper.instance(), 'showActivityView');
    action.showActivityView();
    expect(wrapper.state().view).toEqual('activity');
    wrapper.update();
    expect(showActivityView).toBeCalled();
  });

  it('should have a button', () => {
    wrapper.setState({
      value: 'Today',
    });
    const action = wrapper.instance();
    action.showActivityView();
    expect(wrapper.state().value).toEqual('Today');
  });

  it('should call handleChange', () => {
    const action = wrapper.instance();
    const handleChange = jest.spyOn(wrapper.instance(), 'handleChange');
    action.handleChange('Today');
    expect(handleChange).toBeCalled();
  });
  it('should call handleStateChange', () => {
    const action = wrapper.instance();
    const handleStateChange = jest.spyOn(
      wrapper.instance(),
      'handleStateChange',
    );
    action.handleStateChange(event);
    expect(handleStateChange).toBeCalled();
  });
  it('should show overViewIcon', () => {
    wrapper.setState({
      view: 'overview',
      value: '',
    });
    const overviewSpan = wrapper.find('#overview-span');
    expect(overviewSpan).toHaveLength(1);
    wrapper.update();
  });
  it('should show activityIcon', () => {
    wrapper.setState({
      view: 'overview',
      value: '',
    });
    const activitySpan = wrapper.find('#activity-span');
    expect(activitySpan).toHaveLength(1);
  });
  it('should call toggleMenu at onClick', () => {
    wrapper.setState({ menuOpen: false });
    const dropBtn = wrapper.find('#btnControl');
    dropBtn.simulate('click');
    expect(wrapper.state().menuOpen).toEqual(true);
  });
  it('should call toggleMenu at onBlur', () => {
    wrapper.setState({ menuOpen: true });
    const dropBtn = wrapper.find('#btnControl');
    dropBtn.simulate('blur');
    expect(wrapper.state().menuOpen).toEqual(false);
  });
});
