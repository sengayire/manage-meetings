import React from 'react';
import { shallow } from 'enzyme';
import BlockTableBody from '../../../src/components/blocks/BlockTbody';
import blockData from '../../../src/fixtures/blocksData';

describe('BlockTableBody Component', () => {
  const blocks = [blockData];
  const blockWrapper = shallow(<BlockTableBody blocks={blocks} />);

  it('renders the correct content', () => {
    const td = blockWrapper.find('.table__body');
    expect(td).toHaveLength(1);
  });
});
