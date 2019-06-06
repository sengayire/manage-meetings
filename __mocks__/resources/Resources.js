const allResourcesReturnData = {
  data: {
    allResources: {
      resources: [
        {
          id: '3',
          name: 'Gulu',
          __typename: 'Resource',
        },
        {
          id: '12',
          name: 'Table',
          quantity: 1,
          roomId: 12,
          __typename: 'Resource',
        },
      ],
      pages: 2,
      queryTotal: 11,
      hasNext: true,
      hasPrevious: false,
      __typename: 'Resources',
    },
    refetch: jest.fn(),
    loading: false,
    error: {},
    fetchMore: jest.fn(),
    userLocation: {
      user: {
        location: 'Kampala',
      },
    },
  },
};

export { allResourcesReturnData as default };
