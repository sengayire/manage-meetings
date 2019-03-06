import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import ActionButtons from '../commons/ActionButtons';
import MrmModal from '../commons/Modal';
import { DELETE_CENTER_MUTATION } from '../../graphql/mutations/centers';
import notification from '../../utils/notification';

import '../../assets/styles/deleteModal.scss';

/**
 * Delete center Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class DeleteCenter extends React.Component {
  static propTypes = {
    centerName: PropTypes.string.isRequired,
    centerId: PropTypes.string.isRequired,
    deleteCenter: PropTypes.func.isRequired,
    refetch: PropTypes.func,
  };

  state = {
    closeModal: false,
    isDeleting: false,
  };

  /**
   * It closes a modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Handles the state changes for the deleting location modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * This function deletes a location
   *
   * @returns {void}
   */
  handleDeleteCenter = () => {
    const {
      centerId, deleteCenter, centerName, refetch,
    } = this.props;
    this.toggleLoading();
    deleteCenter({
      variables: {
        locationId: centerId,
      },
    })
      .then(() => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'success', `${centerName} has been deleted successfully`)();
        refetch();
      })
      .catch((err) => {
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
      isDeleting: !this.state.isDeleting,
    });
  }

  render() {
    const { closeModal, isDeleting } = this.state;

    return (
      <MrmModal
        className="delete-modal"
        title="DELETE CENTER"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete the {`"${this.props.centerName}"`}{' '}
            center? This cannot be undone & all data will be lost
          </p>
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            isLoading={isDeleting}
            actionButtonText="DELETE CENTER"
            onClickSubmit={this.handleDeleteCenter}
          />
        </div>
      </MrmModal>
    );
  }
}

DeleteCenter.defaultProps = {
  refetch: () => {},
};

export default compose(
  graphql(DELETE_CENTER_MUTATION, { name: 'deleteCenter' }),
)(DeleteCenter);
