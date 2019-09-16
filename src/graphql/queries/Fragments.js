import gql from 'graphql-tag';

export const paginationFR = type => gql`
fragment pagination on ${type} {
  hasNext
  hasPrevious
  pages
  queryTotal
}`;

export const idNameFR = type => gql`
fragment idName${type} on ${type} {
  id
  name
}`;

export const someRoomFR = gql`
fragment someRoomFields on Room {
  id
  name
  capacity
  roomType
}`;

export const resourceFR = gql`
fragment resource on Resource {
  id
  name
}`;

export const resourcesFR = gql`
fragment resources on RoomResource {
  roomId
  resourceId
  quantity
  name
}`;

export const roomFR = gql`
fragment roomFields on Room {
  ...someRoomFields
  roomLabels
  imageUrl
  calendarId
  locationId
  structureId
  resources {
      ...resources
    resource {
      ...resource
    }
  }
}
${someRoomFR}
${resourceFR}
${resourcesFR}`;

export const deviceFieldsFR = gql`
fragment deviceFields on Devices {
    ...idNameDevices
    deviceType
    dateAdded
    lastSeen
    location
    room {
      ...idNameRoom
    }
}
${idNameFR('Room')}
${idNameFR('Devices')}`;
