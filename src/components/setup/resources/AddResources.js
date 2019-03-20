import React from 'react';
import ActionButtons from '../../commons/ActionButtons';
import MrmModal from '../../commons/Modal';
import { Input } from '../../commons';
import '../../../assets/styles/addresource.scss';

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
  };

  resourceQuantity = React.createRef();
  amenity = React.createRef();

  /**
   * Ensures that the modal for adding a resource closes
   * when a user hits CANCEL on the modal or when the
   * adding a resource is successful
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

  render() {
    const {
      amenity,
      closeModal,
      resourceQuantity,
    } = this.state;
    return (
      <MrmModal
        title="ADD A NEW RESOURCE"
        buttonText="Add a New Resource"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleCloseModal}>
          <div>
            <Input
              ref={this.amenity}
              id="amenity"
              name="amenity"
              placeholder="Type resource name"
              labelName="Resource Name"
              labelClass="add-resource-controls"
              value={amenity}
              onChange={this.handleInputChange}
            />
            <Input
              ref={this.resourceQuantity}
              id="resourceQuantity"
              name="resourceQuantity"
              type="number"
              placeholder="Quantity"
              labelName="Quantity"
              controlsClass="resource-filter-controls"
              labelClass="add-resource-controls"
              defaultValue={resourceQuantity}
              onChange={this.handleInputChange}
            />
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                onClickCancel={this.handleCloseModal}
                actionButtonText="ADD RESOURCE"
                onClickSubmit={this.handleCloseModal}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

export default AddResource;
