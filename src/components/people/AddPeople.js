import React from 'react';
import ActionButtons from '../commons/ActionButtons';
import MrmModal from '../commons/Modal';
import { Input } from '../commons';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class AddPeople extends React.Component {
  state = {
    resource: '',
    closeModal: false,
  };

  resourceQuantity = React.createRef();
  amenity = React.createRef();

  /**
   * Ensures that the modal for inviting a person closes
   * when a user hits CANCEL on the modal or when
   * inviting a person is successful
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
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitResource = () => {};

  /**
   * It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  render() {
    const {
      resource,
      closeModal,
    } = this.state;
    return (
      <MrmModal
        title="INVITE A NEW USER"
        buttonText="Invite a New User"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleCloseModal}>
          <div>
            <Input
              ref={this.amenity}
              id="resource"
              name="resource"
              placeholder="Enter Users Email"
              labelName="Users Email Address"
              labelClass="add-resource-controls"
              value={resource}
              onChange={this.handleInputChange}
            />
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                onClickCancel={this.handleCloseModal}
                actionButtonText="INVITE USER"
                onClickSubmit={this.submitResource}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

export default AddPeople;
