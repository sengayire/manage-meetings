import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select, ActionButtons } from '../commons';
import { mapLocationsToSelectInputs } from '../../graphql/mappers/Rooms';

import '../../assets/styles/roomform.scss';

export class RoomForm extends Component {
  static propTypes = {
    roomLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    onCloseModalRequest: PropTypes.func.isRequired,
    formDetails: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })),
      PropTypes.object,
    ]).isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    roomLocation: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  };
  render() {
    const {
      onCloseModalRequest,
      locations,
      formDetails,
      roomLocation,
      handleInputChange,
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          id="roomName"
          type="text"
          name="roomName"
          placeholder="Enter room name"
          value={formDetails.roomName}
          labelName="Room Name"
          onChange={handleInputChange}
          labelClass="input-wrapper"
          required
        />
        <Select
          labelText="Select Room Location"
          name="roomLocation"
          id="roomLocation"
          value={roomLocation}
          onChange={handleInputChange}
          key={roomLocation || ''}
          wrapperClassName="input-wrapper"
          placeholder="Select room location"
          options={mapLocationsToSelectInputs(locations)}
          disabled
        />
        <ActionButtons
          withCancel
          onClickCancel={onCloseModalRequest}
          actionButtonText="Save Changes"
        />
      </form>
    );
  }
}

export default RoomForm;
