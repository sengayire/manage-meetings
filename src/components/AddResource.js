import React from 'react';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import PropTypes from 'prop-types';

import MrmModal from '../components/commons/Modal';
import '../assets/styles/addresource.scss';
import { Input, SelectInput as Select } from './commons';
import { GET_ALL_ROOMS_QUERY } from '../graphql/queries/Rooms';
import { ADD_RESOURCE_MUTATION } from '../graphql/mutations/AddResourceToRoom';
import notification from '../utils/notification';

export class AddResource extends React.Component {
  state = {
    amenity: '',
    closeModal: false,
    resourceQuantity: 0,
    room: '',
  };

  resourceQuantity = React.createRef();

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleInputChange = (event, capacity = 0) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, resourceQuantity: capacity });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddAmenity = (event) => {
    event.preventDefault();

    // submission logic
    const { amenity, resourceQuantity, room } = this.state;
    const roomId = parseInt(room, 10);
    this.props
      .addResourceMutation({
        variables: {
          resourceQuantity,
          roomName: amenity,
          roomId,
        },
      })
      .then(() => {
        this.handleCloseModal();
        /** Notify user of success of adding of room */
        notification(toastr, 'success', 'Resource Successfully added')();
        /** Clear the state and restore default values */
        this.setState({ amenity: '', resourceQuantity: 0, room: '' });
        this.handleCloseModal();
      })
      .catch((err) => {
        /** Notify user on failure to add resource */
        notification(toastr, 'error', err)();
      });
  };

  render() {
    const {
      amenity, closeModal, resourceQuantity, room,
    } = this.state;
    const { allRooms } = this.props.data;

    return (
      <MrmModal
        title="ADD RESOURCE"
        buttonText="Add Resource"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleAddAmenity}>
          <div>
            <Input
              ref={this.resourceQuantity}
              id="amenity"
              name="amenity"
              placeholder="Type resource name"
              labelName="Resource Name"
              labelClass="add-resource-controls"
              value={amenity}
              onChange={this.handleInputChange}
            />

            <Select
              labelText="Room"
              type="text"
              id="room"
              name="room"
              value={room}
              placeholder="Select room"
              selectInputClassName="room-input default-select"
              onChange={this.handleInputChange}
              wrapperClassName="room-wrapper"
              options={allRooms && allRooms.rooms}
            />
            <Input
              ref={this.resourceQuantity}
              id="amenity"
              name="amenity"
              type="number"
              placeholder="Quantity"
              labelName="Quantity"
              controlsClass="resource-filter-controls"
              labelClass="add-resource-controls"
              value={resourceQuantity}
              onChange={this.handleInputChange}
            />
            <div className="button-container ">
              <button className="add-resource" type="submit">
                ADD RESOURCE
              </button>
              <button className="modal-cancel" onClick={this.handleCloseModal}>
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

AddResource.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.object,
  }).isRequired,
  addResourceMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(GET_ALL_ROOMS_QUERY, {
    name: 'data',
    options: () => ({
      variables: {
        page: 1,
        perPage: 1000,
        capacity: 0,
        location: '',
        office: '',
      },
    }),
  }),
  graphql(ADD_RESOURCE_MUTATION, { name: 'addResourceMutation' }),
)(AddResource);
