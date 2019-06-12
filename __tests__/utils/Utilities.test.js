import {
  parseQueryString,
  getItemFromLocalStorage,
  saveItemInLocalStorage,
  removeItemFromLocalStorage,
  thisWeek,
  getFirstDayOfTheMonth,
  getTodaysDate,
  compressArray,
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

describe('removeItemInLocalStorage(', () => {
  it('should raise an exception when user has no access to localstorage', () => {
    global.localStorage = undefined;
    expect(removeItemFromLocalStorage('key')).toBe(null);
  });
  it('should remove items to local storage', () => {
    global.localStorage = { removeItem: jest.fn() };
    expect(removeItemFromLocalStorage('key')).toBe(true);
  });
  it('should return the date of the current week', () => {
    const date = thisWeek();
    expect(date).toBeInstanceOf(Object);
    expect(date.weekEnd).toMatch(/\w{3}\s\d{2}\s\d{4}/);
    expect(date.weekStart).toMatch(/\w{3}\s\d{2}\s\d{4}/);
  });
  it('should return the date of the current week', () => {
    // Mock the system date for a weekend day (Saturday)
    const fakeDate = new Date('2018-11-17');
    global.Date = jest.fn(() => fakeDate);

    const date = thisWeek();
    expect(date).toBeInstanceOf(Object);
    expect(date.weekEnd).toMatch(/\w{3}\s\d{2}\s\d{4}/);
    expect(date.weekStart).toMatch(/\w{3}\s\d{2}\s\d{4}/);
  });
  it('should return the date of the current week', () => {
    // Mock the system date for a week day (Tuesday)
    const fakeDate = new Date('2018-12-11');
    global.Date = jest.fn(() => fakeDate);

    const date = thisWeek();
    expect(date).toBeInstanceOf(Object);
    expect(date.weekEnd).toMatch(/\w{3}\s\d{2}\s\d{4}/);
    expect(date.weekStart).toMatch(/\w{3}\s\d{2}\s\d{4}/);
  });
  describe('Get the first/current day of the month', () => {
    it('should return the first day of the month', () => {
      const firstDay = getFirstDayOfTheMonth();
      const today = getTodaysDate();
      expect(firstDay.length).toBe(11);
      expect(today.length).toBe(11);
    });
  });
  it('should compress array', () => {
    const compressed = compressArray(['a', 'a', 'b']);
    expect(compressed[0].count).toBe(2);
  });
});
