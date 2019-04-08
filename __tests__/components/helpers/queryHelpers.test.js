import { getUserDetails, getRoomList } from '../../../src/components/helpers/QueriesHelpers';
import * as CookieHelper from '../../../src/utils/Cookie';
import allRooms from '../../../__mocks__/rooms/Rooms';

describe('Unit test for the getUserDetails method', () => {
  it(
    'should call only the readQuery method and return user details' +
      ' when the user details is in the store',
    async () => {
      const mockedClient = {
        readQuery: jest
          .fn()
          .mockImplementationOnce(() => ({ user: { email: 'converge@andela.com' } })),
        query: jest.fn(),
      };
      jest.spyOn(CookieHelper, 'decodeTokenAndGetUserData').mockImplementationOnce(() => ({
        UserInfo: {
          userData: {
            firstName: 'Kimame',
          },
        },
      }));
      expect(mockedClient.readQuery.mock.calls.length).toBe(0);
      const response = await getUserDetails(mockedClient);
      expect(response.email).toBe('converge@andela.com');
      expect(mockedClient.readQuery.mock.calls.length).toBe(1);
      expect(mockedClient.query.mock.calls.length).toBe(0);
    },
  );

  it('should call the getRoomList readQuery when the room list is in the store',
    async () => {
      const mockedClient = {
        readQuery: jest
          .fn()
          .mockImplementationOnce(() => allRooms),
        query: jest.fn(),
      };
      const response = await getRoomList('Lagos', 5, 1, mockedClient);
      expect(response.data.allRooms.rooms.length).toBe(5);
      expect(mockedClient.readQuery.mock.calls.length).toBe(1);
      expect(mockedClient.query.mock.calls.length).toBe(0);
    });
});
