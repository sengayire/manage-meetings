import browserHistory from '../../src/utils/history';

describe('History', () => {
  const expectedBrowserHistoryObjectKeys = [
    'action',
    'block',
    'createHref',
    'go',
    'goBack',
    'goForward',
    'length',
    'listen',
    'location',
    'push',
    'replace',
  ];

  it('should render correct history object', () => {
    const browserHistoryKeys = Object.keys(browserHistory);
    expect(browserHistoryKeys.sort()).toEqual(expectedBrowserHistoryObjectKeys);
  });
});
