import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import Spinner from '../commons/Spinner';
import TableHead from '../helpers/TableHead';
import BlockTableBody from './BlockTbody';
import GET_ALL_BLOCKS from '../../graphql/queries/Blocks';
// eslint-disable-next-line import/no-named-as-default
import AddBlockMenu from './AddBlockMenu';
import { GET_ALL_OFFICES } from '../../graphql/queries/Offices';
import MenuTitle from '../commons/MenuTitle';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import DataNotFound from '../commons/DataNotFound';
import Errors from '../commons/Errors';

export const BlocksList = (props) => {
  const { allOffices, user, allBlocks } = props;
  const error = allOffices.error || allBlocks.error || user.error;
  const loading = allOffices.loading || allBlocks.loading || user.loading;
  if (error && error.message === 'GraphQL error: No more offices') {
    return <DataNotFound />;
  }
  if (loading) return <Spinner />;

  if (user.user) saveItemInLocalStorage('access', user.user.roles[0].id);
  return (
    <div className="settings-rooms">
      <div className="settings-rooms-control">
        <MenuTitle title="Blocks" />
        {!error &&
        <AddBlockMenu offices={allOffices.allOffices} refetch={allBlocks.allBlocks.refetch} />
        }
      </div>
      <div className="settings-rooms-list">
        {!error ?
          <div className="table">
            <TableHead titles={['SingleBlock', 'Location', 'Office', 'Action']} />
            <BlockTableBody blocks={allBlocks.allBlocks} refetch={allBlocks.allBlocks.refetch} />
          </div>
        : <Errors message="Data cannot be returned at the moment" />
        }
      </div>
    </div>
  );
};

BlocksList.propTypes = {
  allOffices: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  allBlocks: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    error: PropTypes.object,
    offices: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(GET_ALL_BLOCKS, {
    name: 'allBlocks',
  }),
  graphql(GET_ALL_OFFICES,
    {
      name: 'allOffices',
      options: () => ({
        variables: {
          page: 1,
          perPage: 1000,
        },
      }),
    }),
  graphql(GET_USER_ROLE, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email:
          process.env.NODE_ENV === 'test'
            ? 'sammy.muriuki@andela.com'
            : userData.email,
      },
    }),
  }),
)(BlocksList);
