import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Room from '../rooms/Rooms';
import Pagination from '../../components/commons/Pagination';
import ErrorIcon from '../commons/ErrorIcon';
import Overlay from '../commons/Overlay';
import { getUserLocation } from '../../components/helpers/QueriesHelpers';
import AddNewRoomComponent, { AddNewRoom as EditRoom } from './AddRoom';
import LocationFilters from '../navbars/LocationFilters';

/**
 * Builds component for displaying roooms in setup
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class RoomSetup extends Component {
  state = {
    location: getUserLocation().name,
    isFetching: false,
    currentPage: 1,
    perPage: 8,
    dataFetched: false,
    error: false,
    room: {},
    filterText: {},
  };

  componentDidMount = () => {
    const { perPage, currentPage } = this.state;
    const { query } = this.props;
    this.fetchRooms(perPage, currentPage, query);
  };

  componentDidUpdate({ query: oldQuery, userLocationChanged }) {
    const { query } = this.props;
    const { perPage, currentPage } = this.state;
    if (query && (query !== oldQuery)) {
      this.fetchRooms(perPage, currentPage, query);
    }
    if (userLocationChanged !== this.props.userLocationChanged) {
      this.updateLocation();
    }
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
    const {
      allRooms: { rooms },
    } = this.props;
    /* istanbul ignore next */
    if (array.includes(rooms.length)) {
      return array;
    }
    array.push(rooms.length);
    return array.sort((a, b) => a - b);
  };
  editRoom = createRef();
  resetFilterRef = React.createRef();

  updateLocation = () => {
    this.setState({ location: getUserLocation().name });
  };

  /**
   * It creates the ref function to clear filter
   *
   */

  clearFilter = () => {
    this.resetFilterRef.current.handleClearClick();
  }

  handleInputChange = async (event, level) => {
    const { target: { name, value } } = event;
    await this.setState((prevState) => {
      let newState;
      switch (level) {
        case 1:
          newState = { filterText: { [name]: value } };
          break;

        case 2:
          if (Object.keys(this.state.filterText)[2]) { (this.state.filterText[Object.keys(this.state.filterText)[2]] = ''); }
          newState = { filterText: { ...prevState.filterText, [name]: value } };
          break;

        case 3:
          newState = { filterText: { ...prevState.filterText, [name]: value } };
          break;

        case 'reset':
          newState = { filterText: {} };
          break;

        default:
          newState = { filterText: { ...prevState.filterText, [name]: value } };
          break;
      }
      return newState;
    });
    this.fetchRooms(8, 1);
  };


  /**
   * Fetches rooms based on user location
   * and updates state with the location, allRooms,
   * isFetching status, dataFetched status and currentPage.
   * the catch block updates state with error status and isFetching status
   *
   * @param perPage
   * @param page
   *
   * @returns {void}
   */
  fetchRooms = async (perPage, page, query) => {
    const { history } = this.props;
    if (query) {
      history.replace({ state: { compquery: '' } });
    }
    this.setState({ isFetching: true });
    try {
      const textVariable = Object.values(this.state.filterText);
      const searchText = query || textVariable.join();
      await this.props.getRooms([
        this.state.location, perPage < 8 ? 8 : perPage, page, searchText,
      ]);

      this.setState({
        isFetching: false,
        dataFetched: true,
        currentPage: page,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        isFetching: false,
      });
    }
  };

  /**
   * This method updates the state of allRooms when a room is created
   *
   * @param {object} rooms - An object containing details the rooms fetched from the backend
   */
  updateRoomData = () => this.props.getRooms();

  /**
   * It handles creating of rooms
   *
   * @returns {jsx}
   */
  createRooms = () => {
    const {
      allRooms: { rooms },
    } = this.props;
    const roomsRender =
      rooms &&
      rooms.map(room => (
        <Room
          key={room.name}
          roomId={room.id}
          structureId={room.structureId}
          roomType={room.roomType}
          roomImage={room.imageUrl}
          roomName={room.name}
          roomLabels={room.roomLabels}
          numberOfSeats={room.capacity}
          devices={room.devices}
          resources={room.resources}
          handleClick={this.handleEditRoom}
          updatedRoom={this.updateRoomData}
          clearFilter={this.clearFilter}
        />
      ));
    return roomsRender;
  };

  /** Adds room to be edited to the state and toggles modal.
   * @params {object} room
   */
  handleEditRoom = (room) => {
    this.setState({ room });
    this.editRoom.current.toggleModal();
  };
  /**
   * @params {object} updateRoom
   */
  render() {
    const { allRooms } = this.props;
    const {
      isFetching,
      currentPage,
      dataFetched,
      location,
      error,
      room,
    } = this.state;
    return (
      <div className="setup-container">
        {
          <div>
            <div className="room-setup-header">
              <p>{location}&apos;s Meeting Rooms</p>
            </div>
            <div className="room-select-input">
              <LocationFilters
                ref={this.resetFilterRef}
                handleInputChange={this.handleInputChange}
                wrapperClassName="setup-select-input-wrapper"
                selectInputClassName="setup-select-input"
                displayTitle={false}
                className="room-select-sub"
                showClearFilter
              />
            </div>
            <div className="add-new-resource">
              <AddNewRoomComponent
                updateRoomData={this.updateRoomData}
                currentPage={this.state.currentPage}
                clearFilter={this.clearFilter}
              />
            </div>
          </div>
        }
        {error ? (
          <ErrorIcon message="No rooms to display" />
        ) : (
            allRooms && (
              <div className="resource-box overlay-container">
                {isFetching && <Overlay />}
                <div className="room-setup-container">{this.createRooms()}</div>
              </div>
            )
          )}
        {location && !error && allRooms ? (
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
        ) : null}
        <EditRoom
          ref={this.editRoom}
          type={2}
          formType="edit"
          editData={room}
          location={location}
          updateRoomData={this.updateRoomData}
          currentPage={this.state.currentPage}
          clearFilter={this.clearFilter}
        />
      </div>
    );
  }
}

RoomSetup.propTypes = {
  userLocationChanged: PropTypes.bool,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  query: PropTypes.string,
  getRooms: PropTypes.func.isRequired,
  allRooms: PropTypes.shape({
    rooms: PropTypes.instanceOf(Array),
  }).isRequired,
};

RoomSetup.defaultProps = {
  userLocationChanged: PropTypes.bool,
  query: undefined,
};

export default withRouter(RoomSetup);
