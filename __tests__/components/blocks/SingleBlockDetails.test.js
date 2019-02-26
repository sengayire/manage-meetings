import React from 'react';
import { shallow } from 'enzyme';
import SingleBlockDetails from '../../../src/components/blocks/SingleBlockDetails';
import { singleBlockData } from '../../../src/fixtures/blocksData';

describe('SingleBlockDetails Component', () => {
  const blockWrapper = shallow(<SingleBlockDetails block={singleBlockData} />);

  it('renders the correct content', () => {
    const td = blockWrapper.find('td');
    expect(td).toHaveLength(4);
  });
});
