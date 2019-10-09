/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  getRoomsStructure,
  getRoomId,
  getRoomResources,
} from './QueriesHelpers';

const isResourcesSetup = async (structureRooms) => {
  const roomIds = [];

  for (const room of structureRooms) {
    const roomId = await getRoomId(room.name);
    roomIds.push(roomId.data.getRoomByName[0]);
  }

  const allRoomsResources = [];

  for (const oneRoom of roomIds) {
    const oneRoomResource = await getRoomResources(oneRoom.id);
    allRoomsResources.push(oneRoomResource);
  }

  const levelResources = allRoomsResources
    .map(roomResources => roomResources.length > 0)
    .includes(false);

  return !levelResources;
};

const Levels = (structure, level) =>
  structure.map(element => element.level === level).includes(true);

const LevelFilter = (structure, level) =>
  structure.filter(element => element.level === level);

const centerSetupLevel = async () => {
  const centerStructure = await getRoomsStructure();

  const levelOne = Levels(centerStructure.allStructures, 1);

  const levelFloors = Levels(centerStructure.allStructures, 2);

  const levelWings = Levels(centerStructure.allStructures, 3);

  const levelRooms = Levels(centerStructure.allStructures, 4);

  const structureRooms = LevelFilter(centerStructure.allStructures, 4);

  let levelResources;
  if (structureRooms.length) {
    levelResources = await isResourcesSetup(structureRooms);
  }

  if (!levelOne) {
    return 'setupLocation';
  }
  if (!levelFloors && !levelWings && !levelRooms && !levelResources) {
    return 'officeStructure';
  }
  if (!levelRooms && !levelResources) {
    return 'addRooms';
  }
  if (!levelResources) {
    return 'addResources';
  }
  return 'centerIsSetup';
};

export default centerSetupLevel;
