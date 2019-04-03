import * as cookieMethod from '../../../src/utils/Cookie';
import getUserDetails from '../../../src/components/helpers/QueryHelper';

describe('Unit test for the getUserDetals method', () => {
  it('should call only the readQuery method and return user details'
    + ' when the user details is in the store', async () => {
    const mockedClient = {
      readQuery: jest.fn().mockImplementationOnce(() => ({ user: { data: 'some-userData' } })),
      query: jest.fn(),
    };
    const response = await getUserDetails(mockedClient);
    expect(response.data).toBe('some-userData');
    expect(mockedClient.readQuery.mock.calls.length).toBe(1);
    expect(mockedClient.query.mock.calls.length).toBe(0);
  });
  it('should call the query method and fetch data from the server'
    + ' if user details are not fond in the cache', async () => {
    jest.spyOn(cookieMethod, 'decodeTokenAndGetUserData').mockImplementationOnce(() => ({
      UserInfo: { userData: { email: 'some-email-address' } },
    }));
    const mockedClient = {
      readQuery: jest.fn().mockImplementationOnce(() => { throw Error(); }),
      query: jest.fn().mockImplementationOnce(() => ({ data: { user: 'some-user-Data' } })),
    };
    const response = await getUserDetails(mockedClient);
    expect(response).toBe('some-user-Data');
    expect(mockedClient.readQuery.mock.calls.length).toBe(1);
    expect(mockedClient.query.mock.calls.length).toBe(1);
  });
});
