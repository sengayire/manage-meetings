import React, { Component, createRef } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Modal from '../../commons/MrmModal';
import { deleteIcon } from '../../../utils/images/images';
import '../../../assets/styles/deleteModal.scss';
import { deleteResources } from '../../../../src/components/helpers/mutationHelpers/resources';
import notification from '../../../utils/notification';

class DeleteResource extends Component {
  toggleModalComponent = createRef();

  handleCloseModal = () => {
    this.toggleModalComponent.current.toggleModal();
  };
  handleDeleteResource = () => {
    const {
      resource: { name, id },
      handleOnDeleteResource,
      currentPage,
      perPage,
      location,
    } = this.props;
    const variables = { resourceId: id };
    deleteResources(currentPage, perPage, variables, location)
      .then(() => {
        this.handleCloseModal();
        notification(toastr, 'success', `'${name}' has been deleted successfully`)();
        handleOnDeleteResource();
      })
      .catch((err) => {
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  };
  renderModalContent = resource => (
    <div className="delete-modal-content">
      <p id="confirm-msg">
        Are you sure you want to delete &quot;{resource.name}
        &quot;? <br />
        This cannot be undone
      </p>
    </div>
  );

  render() {
    const { resource } = this.props;
    return (
      <Modal
        title="DELETE RESOURCE"
        styleClassName="delete-modal"
        ref={this.toggleModalComponent}
        withButton
        handleSubmit={this.handleDeleteResource}
        modalContent={this.renderModalContent(resource)}
        btnImage={<img src={deleteIcon} alt="delete" />}
        cancelButtonText="CANCEL"
        actionButtonText="DELETE"
      />
    );
  }
}

DeleteResource.propTypes = {
  handleOnDeleteResource: PropTypes.func.isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  perPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resource: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  location: PropTypes.string.isRequired,
};
DeleteResource.defaultProps = {
  currentPage: 1,
  perPage: 5,
};

export default DeleteResource;
