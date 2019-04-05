import { getUserDetails } from '../../../src/components/helpers/QueriesHelpers';

describe('Unit test for the getUserDetails method', () => {
  it('should call only the readQuery method and return user details'
    + ' when the user details is in the store', async () => {
    const mockedClient = {
      readQuery: jest.fn().mockImplementationOnce(() => ({ user: { data: { email: 'converge@andela.com' } } })),
      query: jest.fn(),
    };
    const response = await getUserDetails(mockedClient);
    expect(response.data).toBe('user');
    expect(mockedClient.readQuery.mock.calls.length).toBe(1);
    expect(mockedClient.query.mock.calls.length).toBe(0);
  });
});
