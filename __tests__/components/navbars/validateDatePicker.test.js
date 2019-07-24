/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsNav from '../../../src/components/navbars/AnalyticsNav';
import { getUserLocation } from '../../../src/components/helpers/QueriesHelpers';

jest.mock('../../../src/components/helpers/QueriesHelpers');

getUserLocation.mockReturnValue({
  name: 'Lagos', id: 1,
});


jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('AnalyticsNav Component', () => {
  it('should update startDate and endDate', () => {
    const componentWrapper = shallow(<AnalyticsNav />);
    const analyticNavWrapper = componentWrapper.instance();
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.startDate).toEqual('05 Nov 2018');
    expect(analyticNavWrapper.state.endDate).toEqual('06 Nov 2018');
  });
});
