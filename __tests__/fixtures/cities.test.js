import allCites from '../../src/fixtures/cities';

describe('Cities fixtures', () => {
  it('should be an array', () => {
    expect(Array.isArray(allCites)).toBe(true);
  });
});
