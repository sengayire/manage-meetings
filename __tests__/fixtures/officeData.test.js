import officeData from '../../src/fixtures/officeData';

const officeDataSample = {
  id: '81',
  name: 'The Crest7',
  location: {
    name: 'Kampala',
  },
};

describe('Office data fixtures', () => {
  it('should be an object', () => {
    expect(officeData).toEqual(officeDataSample);
  });
});
