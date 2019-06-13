import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ActionButtons from '../../commons/ActionButtons';
import MrmModal from '../../commons/Modal';
import { Input } from '../../commons';
import { editResourceMutation } from '../../helpers/mutationHelpers/resources';
import '../../../assets/styles/addresource.scss';
import notification from '../../../utils/notification';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class EditResource extends React.Component {
  state = {
    resourceId: 0,
    updatedResource: '',
    closeModal: false,
  };

  componentDidMount() {
    this.changeResource();
  }

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

  changeResource = () => {
    const { resourceToEdit } = this.props;
    this.setState({
      updatedResource: resourceToEdit.name,
      resourceId: resourceToEdit.id,
    });
  };

  updateResource = (resourceId, updatedResource) => {
    const { handleOnEditResource } = this.props;
    if (updatedResource === '') {
      notification(toastr, 'error', 'You cannot edit to empty resource')();
    } else {
      editResourceMutation(resourceId, updatedResource)
        .then(() => {
          notification(toastr, 'success', 'Resource Successfully updated')();
          handleOnEditResource();
        }).catch(() => {
          notification(toastr, 'error', 'Sorry, there was a problem updating a resource')();
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
      closeModal,
      resourceId,
      updatedResource,
    } = this.state;
    return (
      <MrmModal
        title="EDIT RESOURCE"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleCloseModal}>
          <div>
            <Input
              ref={this.amenity}
              id="updatedResource"
              name="updatedResource"
              placeholder="Type resource name"
              labelName="RENAME RESOURCE"
              labelClass="add-resource-controls"
              value={updatedResource}
              onChange={this.handleInputChange}
            />
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                onClickCancel={this.handleCloseModal}
                actionButtonText="SAVE CHANGES"
                onClickSubmit={() => this.updateResource(resourceId, updatedResource)}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

EditResource.propTypes = {
  handleOnEditResource: PropTypes.func.isRequired,
  resourceToEdit: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default EditResource;
