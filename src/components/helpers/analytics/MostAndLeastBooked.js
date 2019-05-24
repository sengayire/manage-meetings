export const getLeastBookedRooms = rooms => rooms.slice(-4).reverse();

export const getMostBookedRooms = rooms => rooms.slice(0, 4);
