import {
  decodeTokenAndGetUserData,
  parseCookie,
} from '../../src/utils/Cookie';
import { mockToken } from '../../__mocks__/utilities';

describe('Cookie file methods', () => {
  it('pasrseCookie should parse a cookie string and return a cookie object', () => {
    const cookieString = 'name=mrm%20dev; id=12';
    const expectedResult = { name: 'mrm dev', id: '12' };
    const result = parseCookie(cookieString);
    expect(result).toEqual(expectedResult);
  });

  it('clearCookies should clear all cookie key-value and return true', () => {
    global.document.cookie = 'name=mrm%20dev; id=12';
    // const expectedResult = { name: 'mrm dev', id: '12' };
    // const result = parseCookie(cookieString);
    // expect(result).toEqual(expectedResult);
  });

  it('decodeTokenAndGetUserData should return null if no token', () => {
    const userData = decodeTokenAndGetUserData();
    expect(userData).toBe(null);
  });

  it('decodeTokenAndGetUserData should return user if a valid token is used', () => {
    const data = decodeTokenAndGetUserData(mockToken);
    expect(data).toBeTruthy();
    expect(Object.keys(data)).toEqual(['UserInfo', 'iat', 'exp', 'aud', 'iss']);
  });

  it('should clear local storage and cookies incase of invalid token', () => {
    const invalidToken = 'hgygh ghg hghgb hghbh';
    window.location.reload = jest.fn();
    const data = decodeTokenAndGetUserData(invalidToken);
    expect(data).toBe(null);
  });
});
