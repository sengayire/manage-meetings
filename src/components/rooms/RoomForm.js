import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select, ActionButtons } from '../commons';
import { mapLocationsToSelectInputs } from '../../graphql/mappers/Rooms';

import '../../assets/styles/roomform.scss';

class RoomForm extends Component {
  static propTypes = {
    roomName: PropTypes.string,
    roomLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSubmit: PropTypes.func.isRequired,
    onCloseModalRequest: PropTypes.func.isRequired,
    formRole: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })).isRequired,
  };

  static defaultProps = {
    roomName: '',
    roomLocation: '',
    formRole: 'add',
  };

  constructor(props) {
    super(props);
    // constructor used to set the roomName and roomLocation state values befor the component mounts
    this.state = {
      roomName: props.roomName,
      roomLocation: props.roomLocation,
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { roomName, roomLocation } = this.state;
    this.props.onSubmit({ roomName, roomLocation });
  };

  render() {
    const { roomName, roomLocation } = this.state;
    const { onCloseModalRequest, formRole, locations } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          id="roomName"
          type="text"
          name="roomName"
          placeholder="Enter room name"
          value={roomName}
          labelName="Room Name"
          onChange={this.handleInputChange}
          labelClass="input-wrapper"
          required
        />
        <Select
          labelText="Select Room Location"
          name="roomLocation"
          id="roomLocation"
          value={roomLocation}
          onChange={this.handleInputChange}
          wrapperClassName="input-wrapper"
          placeholder="Select room location"
          options={mapLocationsToSelectInputs(locations)}
        />
        <ActionButtons
          withCancel
          onClickCancel={onCloseModalRequest}
          actionButtonText={formRole === 'add' ? 'Add Room' : 'Save Changes'}
        />
      </form>
    );
  }
}

export default RoomForm;
