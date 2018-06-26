/**
 * This file will have functions to format data returned by queries in the backend
 * to fit into the current implementation of components while doing less work.
 *
 * I have done this because of the changing requirements and data layer of our backend
 * We stand a risk of changing our components whenever the backend changes
 *
 * In my opinion, instead of always modifying our components when the backend changes
 * We can just reformat our data before we pass it to the component.
 *
 * By doing this, we remain with the current implementation of components,
 * no change in snapshots and all we need to do is to change the data mapping methods
 */

export const formatRoomData = room => ({
  id: room.id,
  name: room.name,
  location: room.floor.block.name,
  office: room.floor.block.location.name,
});

export { formatRoomData as default };

