import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import Spinner from '../commons/Spinner';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import BlockTableBody from './BlockTbody';
import GET_ALL_BLOCKS from '../../graphql/queries/Blocks';
// eslint-disable-next-line import/no-named-as-default
import AddBlockMenu from './AddBlockMenu';
import { GET_ALL_OFFICES } from '../../graphql/queries/Offices';
import MenuTitle from '../commons/MenuTitle';

export const BlocksList = (props) => {
  const { allOffices } = props.allOffices;
  const { allBlocks, loading, refetch } = props.allBlocks;
  if (allBlocks === undefined || allOffices === undefined || loading) return <Spinner />;

  return (
    <div className="settings-rooms">
      <div className="settings-rooms-control">
        <MenuTitle title="Blocks" />
        <AddBlockMenu offices={allOffices} refetch={refetch} />
      </div>
      <div className="settings-rooms-list">
        <table>
          <ColGroup />
          <TableHead titles={['SingleBlock', 'Location', 'Office', 'Action']} />
          <BlockTableBody blocks={allBlocks} refetch={refetch} />
        </table>
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
    offices: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

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
)(BlocksList);
