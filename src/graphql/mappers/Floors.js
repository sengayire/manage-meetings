const formatFloorData = floor => ({
  id: floor.id,
  name: floor.name,
  office: floor.block.offices.name,
  block: floor.block.name,
});

export default formatFloorData;
