import countries from '../../src/fixtures/countries';

describe('Countries fixtures', () => {
  it('should be an array', () => {
    expect(Array.isArray(countries)).toBe(true);
  });
});
