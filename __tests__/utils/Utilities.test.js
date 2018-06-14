import {
  parseQueryString,
  getItemFromLocalStorage,
  saveItemInLocalStorage,
} from '../../src/utils/Utilities';

describe('parseQueryString Method', () => {
  it('should return an object containing key value pairs of the string params', () => {
    expect(parseQueryString('?error=we%20&e=45')).toEqual({
      error: 'we ',
      e: '45',
    });
  });

  it('should work with starting ?', () => {
    expect(parseQueryString('error=we%20&e=45')).toEqual({
      error: 'we ',
      e: '45',
    });
    expect(parseQueryString('')).toEqual({});
  });
});

describe('getItemFromLocalStorage', () => {
  it('should raise an exception when user has no access to localstorage', () => {
    expect(getItemFromLocalStorage('ke')).toBe(null);
  });
  it('should get items fron local storage', () => {
    global.localStorage = { getItem: jest.fn(() => JSON.stringify('here')) };
    expect(getItemFromLocalStorage('key')).toBe('here');
  });
});

describe('saveItemInLocalStorage(', () => {
  it('should raise an exception when user has no access to localstorage', () => {
    global.localStorage = undefined;
    expect(saveItemInLocalStorage('key', 'value')).toBe(null);
  });
  it('should set items to local storage', () => {
    global.localStorage = { setItem: jest.fn() };
    expect(saveItemInLocalStorage('key', 'value')).toBe(true);
  });
});

