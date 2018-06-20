import React from 'react';
import roomsList from '../fixtures/rooms';
import Room from './Room';
import '../assets/styles/roomlist.scss';

class RoomsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: roomsList,
    };
  }

  render() {
    return (
      <div className="settings-rooms">
        <button>Add Room</button>
        <div className="settings-rooms-list">
          <table>
            <colgroup>
              <col className="first-col" />
              <col />
              <col />
              <col className="last-col" />
            </colgroup>
            <thead>
              <tr>
                <th>Room</th>
                <th>Location</th>
                <th>Office</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.state.rooms.map(room => <Room room={room} key={room.name} />)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RoomsList;
