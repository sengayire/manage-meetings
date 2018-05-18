import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ContentBlock from '../../src/components/ContentBlock';

describe('ContentBlock Component', () => {
  const wrapper = shallow(<ContentBlock />);

  it('Should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentBlock />, div);
  });
  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
