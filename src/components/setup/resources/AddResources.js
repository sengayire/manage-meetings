import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ActionButtons from '../../commons/ActionButtons';
import MrmModal from '../../commons/Modal';
import { Input } from '../../commons';
import { addResourceMutation } from '../../helpers/mutationHelpers/resources';
import '../../../assets/styles/addresource.scss';
import notification from '../../../utils/notification';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddResource extends React.Component {
  state = {
    resource: '',
    closeModal: false,
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
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateResource = (resource) => {
    const { availableResources } = this.props;
    const existingResources = availableResources.resources || [];
    return existingResources.filter(item => item.name === resource).length;
  }

  submitResource = () => {
    const { resource } = this.state;
    const { handleOnAddResource } = this.props;
    if (this.validateResource(resource)) {
      notification(toastr, 'error', 'Provide a new, unique resource to add')();
    } else {
      addResourceMutation(resource)
        .then(() => {
          notification(toastr, 'success', 'Resource Successfully added')();
          handleOnAddResource();
        })
        .catch(() => {
          notification(toastr, 'error', 'Sorry, there was a problem adding a resource')();
        });
    }
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
      resource,
      closeModal,
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
              id="resource"
              name="resource"
              placeholder="Type resource name"
              labelName="Resource Name"
              labelClass="add-resource-controls"
              value={resource}
              onChange={this.handleInputChange}
            />
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                onClickCancel={this.handleCloseModal}
                actionButtonText="SUBMIT"
                onClickSubmit={this.submitResource}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

AddResource.defaultProps = {
  availableResources: {},
};

AddResource.propTypes = {
  handleOnAddResource: PropTypes.func.isRequired,
  availableResources: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AddResource;
