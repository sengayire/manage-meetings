
const filterRooms = (list, filterString) => {
  if ([undefined, null, ''].includes(filterString)) {
    return list;
  }

  let { rooms } = list;
  rooms = rooms.filter((room) => {
    const roomLabels = room.roomLabels.map(value => value.toLowerCase());
    if (!(room.name.toLowerCase() === filterString.toLowerCase())
      && !(roomLabels.includes(filterString.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return { ...list, rooms };
};

export default filterRooms;
