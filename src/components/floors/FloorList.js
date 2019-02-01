import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Floor } from './Floor';
import AddFloorMenuComp from './AddFloorMenu';
import Overlay from '../commons/Overlay';
import notification from '../../utils/notification';
import Spinner from '../commons/Spinner';
import { GET_PAGINATED_FLOORS_QUERY } from '../../graphql/queries/Floors';
import ColGroup from '../helpers/ColGroup';
import TableHead from '../helpers/TableHead';
import { formatFloorData } from '../../graphql/mappers/Floors';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import MenuTitle from '../commons/MenuTitle';
import Pagination from '../commons/Pagination';
import DataNotFound from '../commons/DataNotFound';

/**
 * Floor List Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class FloorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFloors: { ...props.data.allFloors },
      currentPage: 1,
      dataFetched: true, // true when there is an active internet connection.
      isFetching: false,
    };
  }

  componentWillReceiveProps(props) {
    const { allFloors } = props.data;
    this.setState({
      allFloors,
    });
  }

  /**
   * Handles the data displayed per page
   *
   * @param {string} perPage
   * @param {string } page
   *
   * @returns {Function}
   */
  handleData = (perPage, page) => {
    this.setState({ isFetching: true });
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data
      .fetchMore({
        variables: {
          page,
          perPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          this.setState({
            allFloors: fetchMoreResult.allFloors,
            currentPage: page,
          });
        },
      })
      .then(() => this.setState({ dataFetched: true, isFetching: false }))
      .catch(() => {
        this.setState({ dataFetched: false, isFetching: false });
        notification(
          toastr,
          'error',
          'You seem to be offline, check your internet connection.',
        )();
      });
  };

  render() {
    const {
      loading, error, refetch,
    } = this.props.data;
    const {
      isFetching, dataFetched, currentPage, allFloors,
    } = this.state;
    const { user } = this.props.user;

    if (loading) {
      return <Spinner />;
    }
    if (user) saveItemInLocalStorage('access', user.roles[0].id);
    if (error && error.message === 'GraphQL error: No more resources') return <DataNotFound />;
    if (error) return <div>{error.message}</div>;
    return (
      <div className="settings-resource">
        <div
          className={`settings-resource-control
        ${isFetching ? 'disabled-button' : null}`}
        >
          <MenuTitle title="Floors" />
          <AddFloorMenuComp refetch={refetch} />
        </div>
        <div className="settings-resource-list">
          {isFetching ? <Overlay id="floors-table" /> : null}
          <table className="test-One">
            <ColGroup />
            <TableHead titles={['Floor', 'Block', 'Action']} />
            <tbody>
              {
                allFloors && allFloors.floors.map(floor => (
                  <Floor
                    floor={formatFloorData(floor)}
                    key={floor.id}
                    refetch={refetch}
                  />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={allFloors.pages}
          hasNext={allFloors.hasNext}
          hasPrevious={allFloors.hasPrevious}
          handleData={this.handleData}
          currentPage={currentPage}
          isFetching={isFetching}
          dataFetched={dataFetched}
        />
      </div>
    );
  }
}

FloorList.propTypes = {
  data: PropTypes.shape({
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    allFloors: PropTypes.object,
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
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(GET_PAGINATED_FLOORS_QUERY, {
    options: () => ({
      variables: {
        page: 1,
        perPage: 5,
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
)(FloorList);
