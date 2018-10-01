const allPeopleReturnData = {
  data: {
    users: {
      users: [
        {
          email: 'michael.mukalo@andela.com',
          name: 'Michael Mukalo',
          picture: 'https://lh4.googleusercontent.com/-nvDSOOB7tuI/AAAAAAAAAAI/AAAAAAAAABA/otjsk3lztyc/photo.jpg?sz=50',
          location: 'Nairobi',
          id: '5',
          roles: [
            {
              role: 'Admin',
              id: '2',
              __typename: 'Role',
            },
          ],
          __typename: 'User',
        },
        {
          email: 'marlone.akidiva@andela.com',
          name: 'Marlone Akidiva',
          picture: 'https://lh4.googleusercontent.com/-2TgU0EHynu8/AAAAAAAAAAI/AAAAAAAAAAc/ML95I5e2k_c/photo.jpg?sz=50',
          location: 'Nairobi',
          id: '6',
          roles: [
            {
              role: 'Admin',
              id: '2',
              __typename: 'Role',
            },
          ],
          __typename: 'User',
        },
        {
          email: 'george.tibetegya@andela.com',
          name: 'George Tibetegya',
          picture: 'https://lh3.googleusercontent.com/-yhiUccQX5FE/AAAAAAAAAAI/AAAAAAAAAAc/fsBnDfr2fu8/photo.jpg?sz=50',
          location: 'Kampala',
          id: '7',
          roles: [
            {
              role: 'Admin',
              id: '2',
              __typename: 'Role',
            },
          ],
          __typename: 'User',
        },
      ],
      __typename: 'Users',
      pages: 2,
      queryTotal: 11,
      hasNext: true,
      hasPrevious: false,
    },
  },
};

export { allPeopleReturnData as default };
