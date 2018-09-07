
const mapOfficeDetails = (officeDetails) => {
  const { getOfficeByName: [{ id, blocks: [{ floors }] }] } = officeDetails;

  const floorOptions = [];
  const wingsObject = { 0: [] };
  const officeId = parseInt(id, 10);

  floors.forEach((floor) => {
    floorOptions.push({
      id: parseInt(floor.id, 10),
      name: floor.name,
    });
    wingsObject[parseInt(floor.id, 10)] =
    floor.wings.map(wing => ({ id: parseInt(wing.id, 10), name: wing.name }));
  });

  return {
    floorOptions,
    wingsObject,
    officeId,
  };
};

export { mapOfficeDetails as default };
