const allResourcesReturnData = {
  data: {
    allResources: [
      {
        id: '3',
        name: 'Gulu',
        quantity: 1,
        roomId: 3,
        room: {
          id: 1,
          name: 'Gulu',
          __typename: 'Room',
        },
        __typename: 'Resource',
      },
      {
        id: '12',
        name: 'Round Table',
        quantity: 1,
        roomId: 12,
        room: {
          id: 12,
          name: 'Charley',
          __typename: 'Room',
        },
        __typename: 'Resource',
      },
    ],
  },
};

export { allResourcesReturnData as default };
