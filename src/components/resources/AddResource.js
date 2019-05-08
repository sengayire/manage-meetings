import React from 'react';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import ActionButtons from '../commons/ActionButtons';
import MrmModal from '../commons/Modal';
import '../../assets/styles/addresource.scss';
import { Input, SelectInput as Select } from '../commons';
import { GET_ALL_ROOMS_QUERY } from '../../graphql/queries/Rooms';
import { ADD_RESOURCE_MUTATION } from '../../graphql/mutations/AddResourceToRoom';
import notification from '../../utils/notification';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddResource extends React.Component {
  state = {
    amenity: '',
    closeModal: false,
    resourceQuantity: 0,
    room: '',
    isLoading: false,
  };

  resourceQuantity = React.createRef();

  /**
   * Ensures that the modal for adding office closes
   * when a user hits CANCEL on the modal or when the
   * creation of an office is successful
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Ensures that the state is updated basing on the
   * user input
   *
   * @param {object} event The input event parameter
   * @param {number} capacity
   *
   * @returns {void}
   */
  handleInputChange = (event, capacity = 0) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, resourceQuantity: capacity });
  };

  /**
   * It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * 1. Submits the office data to the backend
   * 2. Notifies the user about the response from the request
   * i.e whether it was a success or a failure
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleAddAmenity = (event) => {
    event.preventDefault();
    // submission logic
    this.toggleLoading();
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
        /** Notify user of success of adding of room */
        this.toggleLoading();
        notification(toastr, 'success', 'Resource Successfully added')();
        /** Clear the state and restore default values */
        this.handleCloseModal();
        this.setState({ amenity: '', resourceQuantity: 0, room: '' });
        this.props.refetch();
      })
      .catch((err) => {
        /** Notify user on failure to add resource */
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  };

  /**
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  render() {
    const {
      amenity,
      closeModal,
      resourceQuantity,
      room,
      isLoading,
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
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                onClickCancel={this.handleCloseModal}
                isLoading={isLoading}
                actionButtonText="ADD RESOURCE"
                onClickSubmit={this.handleAddAmenity}
              />
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
    fetchMore: PropTypes.func,
  }).isRequired,
  // eslint-disable-next-line
  userLocation: PropTypes.shape({
    location: PropTypes.string,
  }),
  addResourceMutation: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

AddResource.defaultProps = {
  refetch: null,
  userLocation: {
    location: 'nairobi',
  },
};

export default compose(
  graphql(GET_ALL_ROOMS_QUERY, {
    name: 'data',
    options: props => ({
      variables: {
        page: 1,
        perPage: 1000,
        capacity: 0,
        location: props.userLocation,
        office: '',
      },
    }),
  }),
  graphql(ADD_RESOURCE_MUTATION, { name: 'addResourceMutation' }),
)(AddResource);
