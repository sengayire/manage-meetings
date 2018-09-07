import mapOfficeDetails from '../../../../src/graphql/mappers/Offices';
import officeDetailsData from '../../../../__mocks__/offices/Offices';

describe('mapOfficeDetails', () => {
  it('should successfully map given inputs', () => {
    const { data } = officeDetailsData;
    const { officeId } = mapOfficeDetails(data);
    expect(officeId).toEqual(1);
  });
});
