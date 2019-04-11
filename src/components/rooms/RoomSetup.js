import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import Room from '../rooms/Rooms';
import { darkTabletIcon } from '../../utils/images/images';
import SelectInput from '../../components/commons/SelectInput';
import { selectMockData } from '../../utils/roomSetupMock';
import { GET_ROOMS_QUERY } from '../../graphql/queries/Rooms';
import Pagination from '../../components/commons/Pagination';
import Spinner from '../../components/commons/Spinner';
import { getUserDetails } from '../../components/helpers/QueriesHelpers';
import ErrorIcon from '../../components/commons/ErrorIcon';


/**
 * Builds component for displaying roooms in setup
 *
 * @extends Component
 *
 * @returns {JSX}
 */
export class RoomSetup extends Component {
  state = {
    location: '',
    allRooms: { ...this.props.data.allRooms },
    isFetching: false,
    currentPage: 1,
    perPage: 8,
    dataFetched: false,
  }

  componentDidMount() {
    const { perPage, currentPage } = this.state;
    this.getUserLocation().then(() => this.fetchRooms(perPage, currentPage),
    );
  }

  /**
  * It gets current user location
  * and updates state with the location
  *
  * @returns {void}
  */
  getUserLocation = async () => {
    const user = await getUserDetails();
    this.setState({
      location: user.location,
    });
  }


  /**
  * It handles itemsPerPage array for pagination
  * and returns a constant value else returns
  * array with the length of the rooms array
  *
  * @returns {array}
  */
  getItemsPerPage = () => {
    const array = [8, 16, 32];
    /* istanbul ignore next */
    if (array.includes(this.state.allRooms.rooms.length)) {
      return array;
    }
    array.push(this.state.allRooms.rooms.length);
    return array;
  }

  /**
   * Handles fetching of rooms
   *
   * @param {number} perPage
   * @param {number} page
   *
   * @returns {Function}
   */

  fetchRooms = (perPage, page) => {
    const { location } = this.state;
    const { data: { fetchMore } } = this.props;
    this.setState({ isFetching: true });
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    fetchMore({
      variables: {
        page,
        perPage: (perPage < 8) ? 8 : perPage,
        capacity: 0,
        location,
        office: '',
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          allRooms: fetchMoreResult.allRooms,
          currentPage: page,
          perPage: fetchMoreResult.allRooms.rooms.length,
        });
      },
    }).then(() => this.setState({ dataFetched: true, isFetching: false }))
      .catch(() => null);
  }

  /**
  * It handles creating of rooms
  *
  * @returns {jsx}
  */
  createRooms = () => {
    const { rooms } = this.state.allRooms;
    const roomsRender = rooms && rooms.map(room => (
      <Room
        key={room.name}
        roomImage={darkTabletIcon}
        roomName={room.name}
        wingName="Wing-Name"
        floorName={room.floor.name}
        blockName={room.floor.block.name}
        numberOfSeats={room.capacity}
        numberOfResources={6}
      />
    ));
    return roomsRender;
  }

  /**
  * It handles creating of select input
  *
  * @returns {jsx}
  */
  createSelectInputs = () => {
    const selectInputs = selectMockData && selectMockData.map(({
      name, id, value, placeholder,
    }) => (
      <div key={id} className="room-select-sub">
        <SelectInput
          labelText=""
          wrapperClassName="setup-select-input-wrapper"
          name={name}
          id={id}
          value={value}
          onChange={this.handleInputChange}
          selectInputClassName="setup-select-input"
          placeholder={placeholder}
          options={null}
        />
      </div>
    ));
    return selectInputs;
  }
  render() {
    const {
      isFetching, allRooms, currentPage, dataFetched, location,
    } = this.state;
    const { loading, error } = this.props.data;
    if (loading) return <Spinner />;
    return (
      <div className="setup-container">
        {
          !isFetching && allRooms && location ? (
            <div className="resource-box">
              <div className="room-setup-header"><p> {location} Meeting Rooms</p></div>
              <div className="room-select-input">
                {
                  this.createSelectInputs()
                }
              </div>
              <div className="add-new-resource">
                <button id="modal-button">Add New Room</button>
              </div>
              <div className="room-setup-container">
                {this.createRooms()}
              </div>
            </div>
          ) : (
            error ? (
              <ErrorIcon
                message={error.graphQLErrors.length > 0 && 'No resource found'}
              />
            ) : <Spinner />
          )
        }
        {
          !isFetching && location ? (
            <Pagination
              perPage={allRooms.rooms.length}
              itemsPerPage={this.getItemsPerPage()}
              currentPage={currentPage}
              totalPages={allRooms.pages}
              hasNext={allRooms.hasNext}
              hasPrevious={allRooms.hasPrevious}
              handleData={this.fetchRooms}
              dataFetched={dataFetched}
              isFetching={isFetching}
            />
          ) :
          null
        }
      </div>
    );
  }
}

RoomSetup.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.shape({
      rooms: PropTypes.array,
      pages: PropTypes.number,
    }),
    variables: PropTypes.shape({
      page: PropTypes.number,
      perPage: PropTypes.number,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchMore: PropTypes.func,
    refetch: PropTypes.func,
  }).isRequired,
};

export default compose(
  graphql(GET_ROOMS_QUERY, {
    name: 'data',
    options: () => ({
      variables: {
        page: 1,
        perPage: 8,
        capacity: 0,
        location: '',
        office: '',
      },
    }),
  }),
)(RoomSetup);
