/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import AnalyticsNav from '../../../src/components/navbars/AnalyticsNav';
import { getUserLocation } from '../../../src/components/helpers/QueriesHelpers';

jest.mock('../../../src/components/helpers/QueriesHelpers');

getUserLocation.mockReturnValue({
  name: 'Lagos', id: 1,
});


jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('AnalyticsNav Component', () => {
  it('should update startDate and endDate', () => {
    const componentWrapper = shallow(
      <MockedProvider mocks={[]} addTypename={false}>
        <AnalyticsNav
          resetLocation={() => {}}
          locationChanged={false}
        />
      </MockedProvider>);
    componentWrapper.instance();
  });
});
