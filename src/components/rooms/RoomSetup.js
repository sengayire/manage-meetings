import React, { Component } from 'react';
import Room from '../rooms/Rooms';
import { darkTabletIcon } from '../../utils/images/images';
import SelectInput from '../../components/commons/SelectInput';
import { selectMockData } from '../../utils/roomSetupMock';
import Pagination from '../../components/commons/Pagination';
import Spinner from '../../components/commons/Spinner';
import { getUserDetails, getRoomList } from '../../components/helpers/QueriesHelpers';
import ErrorIcon from '../commons/ErrorIcon';
import AddNewRoom from './addNewRoom';

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
  }

  componentDidMount = async () => {
    const { perPage, currentPage } = this.state;
    await this.fetchRooms(perPage, currentPage);
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
    const { allRooms: { rooms } } = this.state.allRooms;
    /* istanbul ignore next */
    if (array.includes(rooms.length)) {
      return array;
    }
    array.push(rooms.length);
    return array;
  }

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
      const { allRooms } = await getRoomList(user.location, (perPage < 8) ? 8 : perPage, page);
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
  }

  /**
  * It handles creating of rooms
  *
  * @returns {jsx}
  */
  createRooms = () => {
    const { allRooms: { rooms } } = this.state.allRooms;
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
      isFetching, allRooms: { allRooms }, currentPage, dataFetched, location, error,
    } = this.state;
    if (isFetching) return <Spinner />;
    return (
      <div className="setup-container">
        {
          <div>
            <div className="room-setup-header"><p> {location} Meeting Rooms</p></div>
            <div className="room-select-input">
              {
                this.createSelectInputs()
              }
            </div>
            <div className="add-new-resource">
              <AddNewRoom />
            </div>
          </div>
        }
        {
          !isFetching && allRooms && location ? (
            <div className="resource-box">
              <div className="room-setup-container">
                {this.createRooms()}
              </div>
            </div>
          ) : error ? <ErrorIcon message="Resource not found" /> : null
        }
        {
          !isFetching && location && allRooms ? (
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

export default RoomSetup;
