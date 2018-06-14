import {
  decodeTokenAndGetUserData,
  parseCookie,
  deleteCookie,
} from '../../src/utils/Cookie';

describe('Cookie file methods', () => {
  it('pasrseCookie should parse a cookie string and return a cookie object', () => {
    const cookieString = 'name=mrm%20dev; id=12';
    const expectedResult = { name: 'mrm dev', id: '12' };
    const result = parseCookie(cookieString);
    expect(result).toEqual(expectedResult);
  });

  it('decodeTokenAndGetUserData should return null if no token', () => {
    const userData = decodeTokenAndGetUserData();
    expect(userData).toBe(null);
  });

  it('deleteCookie should delete the specified key in the cookie', () => {
    document.cookie = 'name=mrm%20dev; id=12';
    deleteCookie('name');
    expect(parseCookie(document.cookie)).toEqual({ name: '' });
  });
});
