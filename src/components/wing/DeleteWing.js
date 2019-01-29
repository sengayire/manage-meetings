import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../commons/Modal';
import { DELETE_WING_MUTATION } from '../../graphql/mutations/wings';
import { GET_ALL_WINGS } from '../../graphql/queries/wings';
import notification from '../../utils/notification';
import ActionButtons from '../commons/ActionButtons';
import '../../assets/styles/deleteModal.scss';

/**
 * Delete Wing Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class DeleteWing extends React.Component {
  state = {
    closeModal: false,
    isDeleting: false,
  };

  /**
   * Ensures that the modal for deleting wing closes
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Handles the state changes for the deleting wing modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles deleting wing
   *
   * @returns {void}
   */
  handleDeleteWing = () => {
    const { wingId, deleteWing } = this.props;
    this.toggleLoading();
    deleteWing({
      variables: {
        wingId,
      },
      refetchQueries: [{ query: GET_ALL_WINGS }],
    })
      .then((wing) => {
        this.toggleLoading();
        this.handleCloseModal();
        const { name } = wing.data.deleteWing.wing;
        notification(toastr, 'success', `${name} is deleted successfully`)();
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
    const { isDeleting } = this.state;
    return (
      <MrmModal
        handleCloseRequest={this.handleModalStateChange}
        className="delete-modal"
        buttonText="Delete"
        closeModal={this.state.closeModal}
        title="DELETE WING"
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete the {`"${this.props.wingName}"`}{' '}
            wing? This cannot be undone & all data will be lost
          </p>
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            isLoading={isDeleting}
            actionButtonText="DELETE WING"
            onClickSubmit={this.handleDeleteWing}
          />
        </div>
      </MrmModal>
    );
  }
}

DeleteWing.propTypes = {
  deleteWing: PropTypes.func.isRequired,
  wingName: PropTypes.string.isRequired,
  wingId: PropTypes.string.isRequired,
};

export default compose(
  graphql(DELETE_WING_MUTATION, { name: 'deleteWing' }),
  graphql(GET_ALL_WINGS, { name: 'allWings' }),
)(DeleteWing);
