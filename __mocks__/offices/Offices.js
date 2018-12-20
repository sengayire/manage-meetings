const officeDetailsData = {
  data: {
    getOfficeByName: [
      {
        id: '1',
        blocks: [
          {
            id: '1',
            floors: [
              {
                id: '1',
                name: 'fourth floor',
                wings: [
                  {
                    id: '1',
                    name: 'Big Apple',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

const crestOfficeDetails = {
  data: {
    loading: false,
    getOfficeByName: [
      {
        id: '1',
        blocks: [
          {
            id: '1',
            floors: [
              {
                id: '1',
                name: 'fourth floor',
              },
            ],
          },
        ],
      },
    ],
  },
};

const officeDetails = {
  data: {
    allOffices: {
      offices: [
        {
          id: '3',
          name: 'The Crest',
          location: {
            name: 'Kampala',
            timeZone: 'TimeZoneType.EAST_AFRICA_TIME',
            __typename: 'Location',
          },
          __typename: 'Office',
        },
      ],
      hasNext: false,
      hasPrevious: false,
      pages: 1,
      queryTotal: 1,
      __typename: 'PaginateOffices',
    },
  },

};
export { officeDetailsData as default, crestOfficeDetails, officeDetails };
