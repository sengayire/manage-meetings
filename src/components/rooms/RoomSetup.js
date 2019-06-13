import React, { Component, createRef } from 'react';
import Room from '../rooms/Rooms';
import { meetingRoomTabMockData } from '../../utils/roomSetupMock';
import Pagination from '../../components/commons/Pagination';
import ErrorIcon from '../commons/ErrorIcon';
import Overlay from '../commons/Overlay';
import { getUserDetails, getRoomList } from '../../components/helpers/QueriesHelpers';
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
    location: '',
    allRooms: {},
    isFetching: false,
    currentPage: 1,
    perPage: 8,
    dataFetched: false,
    error: false,
    room: {},
    filterText: {},
  };

  componentDidMount = async () => {
    const { perPage, currentPage } = this.state;
    this.setState({ allRooms: { allRooms: { rooms: meetingRoomTabMockData } } });
    await this.fetchRooms(perPage, currentPage);
  };
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
    } = this.state.allRooms;
    /* istanbul ignore next */
    if (array.includes(rooms.length)) {
      return array;
    }
    array.push(rooms.length);
    return array.sort((a, b) => a - b);
  };
  editRoom = createRef();

  handleInputChange = async (event, level) => {
    const { target: { name, value } } = event;
    await this.setState((prevState) => {
      if (level === 1) {
        return {
          filterText: {
            [name]: value,
          },
        };
      }

      if (level === 2) {
        if (Object.keys(this.state.filterText)[2]) { (this.state.filterText[Object.keys(this.state.filterText)[2]] = ''); }
        return {
          filterText: {
            ...prevState.filterText,
            [name]: value,
          },
        };
      }

      if (level === 3) {
        return {
          filterText: {
            ...prevState.filterText,
            [name]: value,
          },
        };
      }
      return {
        filterText: {
          ...prevState.filterText,
          [name]: value,
        },
      };
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
  fetchRooms = async (perPage, page) => {
    this.setState({ isFetching: true });

    try {
      const user = await getUserDetails();
      const textVariable = Object.values(this.state.filterText);
      const { allRooms } = await getRoomList(
        user.location, perPage < 8 ? 8 : perPage, page, textVariable.join(),
      );

      this.setState({
        location: user.location,
        allRooms: { ...this.state.allRooms, allRooms },
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
  updateRoomData = rooms => rooms && this.setState({ allRooms: rooms });

  /**
   * It handles creating of rooms
   *
   * @returns {jsx}
   */
  createRooms = () => {
    const {
      allRooms: { rooms },
    } = this.state.allRooms;
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
          numberOfResources={7}
          handleClick={this.handleEditRoom}
          updatedRoom={this.updateRoomData}
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
    const {
      isFetching,
      allRooms: { allRooms },
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
              <p> {location} Meeting Rooms</p>
            </div>
            <div className="room-select-input"><LocationFilters handleInputChange={this.handleInputChange} wrapperClassName="setup-select-input-wrapper" selectInputClassName="setup-select-input" displayTitle={false} className="room-select-sub" /></div>
            <div className="add-new-resource">
              <AddNewRoomComponent
                updateRoomData={this.updateRoomData}
                currentPage={this.state.currentPage}
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
        />
      </div>
    );
  }
}

export default RoomSetup;
