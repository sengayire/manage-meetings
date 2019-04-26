import React, { Component, createRef } from 'react';
import Room from '../rooms/Rooms';
import SelectInput from '../../components/commons/SelectInput';
import { selectMockData, meetingRoomTabMockData } from '../../utils/roomSetupMock';
import Pagination from '../../components/commons/Pagination';
import ErrorIcon from '../commons/ErrorIcon';
import Overlay from '../commons/Overlay';
import { getUserDetails, getRoomList } from '../../components/helpers/QueriesHelpers';
import AddNewRoomComponent, { AddNewRoom as EditRoom } from './AddRoom';

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
    return array;
  };
  editRoom = createRef();
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
      const { allRooms } = await getRoomList(user.location, perPage < 8 ? 8 : perPage, page);
      this.setState({
        location: user.location,
        allRooms: { ...this.state.allRooms, allRooms },
        isFetching: false,
        dataFetched: true,
        currentPage: page,
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
  updateRoomData = rooms => this.setState({ allRooms: rooms });

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

  /**
   * It handles creating of select input
   *
   * @returns {jsx}
   */
  createSelectInputs = () => {
    const selectInputs =
      selectMockData &&
      selectMockData.map(({
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
            <div className="room-select-input">{this.createSelectInputs()}</div>
            <div className="add-new-resource">
              <AddNewRoomComponent updateRoomData={this.updateRoomData} />
            </div>
          </div>
        }
        {error ? (
          <ErrorIcon message="Resource not found" />
        ) : (
            allRooms && (
              <div className="resource-box overlay-container">
                {isFetching && <Overlay />}
                <div className="room-setup-container">{this.createRooms()}</div>
              </div>
            )
          )}
        {location && allRooms ? (
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
