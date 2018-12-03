import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import queryPerMeetingRoomData from '../../../__mocks__/analytics/queryPerMeetingRoomData';
import AverageMeetingList from '../../../src/components/analytics/AverageMeetingList';

const date = { startDate: '01 Nov 2018', endDate: '03 Nov 2018' };
describe('AverageMeetingList component for case: This month', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={queryPerMeetingRoomData} addTypename={false}>
        <AverageMeetingList dateValue={date} />
      </MockedProvider>,
    );
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
