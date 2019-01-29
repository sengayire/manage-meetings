import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Spinner from '../commons/Spinner';
import GET_FLOORS_QUERY from '../../graphql/queries/Floors';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import { Floor } from './Floor';
import AddFloor from './AddFloorMenu';
import MenuTitle from '../commons/MenuTitle';
import { formatFloorData } from '../../graphql/mappers/Floors';
import Pagination from '../commons/Pagination';

/**
 * Floor List Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class FloorList extends Component {
  state = {};

  /* This will be used for pagination when Pagination is implemeneted. */
  /* istanbul ignore nextline */
  handleData = () => {};

  render() {
    const { loading, error, allFloors } = this.props.data;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <div className="settings-resource">
        <div className="settings-resource-list">
          <div className="settings-resource-control">
            <MenuTitle title="Floors" />
            <AddFloor />
          </div>
          <table className="test-One">
            <ColGroup />
            <TableHead titles={['Floor', 'Office', 'SingleBlock', 'Action']} />
            <tbody>
              {allFloors.map(floor => (
                <Floor floor={formatFloorData(floor)} key={floor.id} />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={30}
          hasNext
          hasPrevious={false}
          handleData={this.handleData}
        />
      </div>
    );
  }
}

FloorList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    allFloors: PropTypes.array,
    id: PropTypes.number,
    name: PropTypes.string,
    blockId: PropTypes.number,
    block: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      offices: PropTypes.string,
    }),
    error: PropTypes.object,
  }).isRequired,
};

export default graphql(GET_FLOORS_QUERY)(FloorList);
