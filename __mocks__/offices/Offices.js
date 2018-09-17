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
export { officeDetailsData as default, crestOfficeDetails };
