import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import moment from 'moment';
import { ANALYTICS_FOR_DAILY_ROOM_EVENTS } from '../../../src/graphql/queries/analytics';
import AnalyticsActivityComponent from '../../../src/containers/AnalyticsActivity';

describe('AnalyticsActivity component', () => {
  let today;
  let wrapper;
  const props = {
    dateValue: {
      startDate: moment().format('MMM DD Y'),
      endDate: moment().format('MMM DD Y'),
    },
  };
  const mocks = dayParam => [
    {
      request: {
        query: ANALYTICS_FOR_DAILY_ROOM_EVENTS,
        variables: {
          startDate: moment().format('MMM DD Y'),
          endDate: moment().format('MMM DD Y'),
        },
      },
      result: {
        data: {
          analyticsForDailyRoomEvents: {
            DailyRoomEvents: [
              {
                day: dayParam ? moment().format('ddd MMM DD Y') : 'Mon Mar 11 2019',
                events: [
                  {
                    eventSummary: 'Ndiga<>Agnes 1:1',
                    startTime: '07:45:00',
                    endTime: '08:45:00',
                    eventId: 'ro6e569lbuu9ntmhunjn1s7q30_20190311T074500Z',
                    noOfParticipants: 4,
                    roomName: 'Krypton',
                  },
                  {
                    eventSummary: 'Weekly LearnTech sprint planning',
                    startTime: '10:00:00',
                    endTime: '11:30:00',
                    eventId: '6u18pcpvnh27v54r9dopk23b9t_20190311T100000Z',
                    noOfParticipants: 8,
                    roomName: 'Krypton',
                  },
                  {
                    eventSummary: 'Sims Leads <> PM Weekly Sync',
                    startTime: '12:00:00',
                    endTime: '13:00:00',
                    eventId: 'kq1826jcd6j9htpjn5o4fnjjho_20190311T120000Z',
                    noOfParticipants: 7,
                    roomName: 'Krypton',
                  },
                ],
              },
            ],
          },
        },
      },
    },
  ];

  it('renders loading state correctly', () => {
    today = true;
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocks(today)}>
        <AnalyticsActivityComponent {...props} />
      </MockedProvider>,
    );
    expect(wrapper.find('Spinner').exists()).toBe(true);
    expect(wrapper.find('.centered').exists()).toBe(true);
    expect(wrapper.find('.spinner').exists()).toBe(true);
    wrapper.unmount();
  });

  it("renders correctly after loading for today's meeting data", async () => {
    today = true;
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocks(today)}>
        <AnalyticsActivityComponent {...props} />
      </MockedProvider>,
    );
    await wait(0);
    wrapper.update();
    expect(wrapper.find('Query').length).toEqual(1);
    expect(wrapper.find('.meeting-title').exists()).toBe(true);
    expect(wrapper.find('.meeting-title').children().length).toBe(4);
    expect(wrapper.find('.activity').exists()).toBe(true);
    expect(wrapper.find('.activity-info-row').exists()).toBe(true);
  });
  it('renders correctly after loading for other days meeting data', async () => {
    today = false;
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocks(today)}>
        <AnalyticsActivityComponent {...props} />
      </MockedProvider>,
    );
    await wait(0);
    wrapper.update();
    expect(wrapper.find('Query').length).toEqual(1);
    expect(wrapper.find('.meeting-title').exists()).toBe(true);
    expect(wrapper.find('.meeting-title').children().length).toBe(4);
    expect(wrapper.find('.activity').exists()).toBe(true);
    expect(wrapper.find('.activity-info-row').exists()).toBe(true);
  });
});
