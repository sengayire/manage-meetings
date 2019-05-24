import GetPercentage from './GetPercentage';

const getRoomData = (rooms) => {
  const roomsLength = rooms.length;
  const allRoomsData = rooms;
  const capacity = allRoomsData.map(room => room.capacity);
  const lessThanTenArray = capacity.filter(num => num < 10);
  const greaterThanTwentyArray = capacity.filter(num => num > 20);
  const betweenTenandTwenty = capacity.filter(num => num <= 20 && num >= 10);
  const lessThanTenlength = lessThanTenArray.length;
  const greaterThanTwentyArrayLength = greaterThanTwentyArray.length;
  const betweenTenandTwentyLength = betweenTenandTwenty.length;
  const lessThanTenData = GetPercentage(lessThanTenlength, roomsLength);
  const betweenTenandTwentyData = GetPercentage(betweenTenandTwentyLength, roomsLength);
  const greaterThanTwentyData = GetPercentage(greaterThanTwentyArrayLength, roomsLength);
  return { lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData };
};

export default getRoomData;
