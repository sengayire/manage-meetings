import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import queryPerMonthData from '../../../__mocks__/analytics/queryPerMonthData';
import AverageMeetingList from '../../../src/components/analytics/AverageMeetingList';

describe('AverageMeetingList component', () => {
  it('should render correctly', async () => {
    const wrapper = mount((
      <MockedProvider mocks={queryPerMonthData} addTypename={false}>
        <AverageMeetingList dateValue="This Month" />
      </MockedProvider>
    ));

    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
