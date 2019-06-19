import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Modal from '../commons/MrmModal';
import '../../assets/styles/deleteModal.scss';
import notification from '../../utils/notification';
import { deleteQuestionMutation } from '../helpers/mutationHelpers/questions';

/**
 * Delete Feedback Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class DeleteFeedback extends Component {
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
    this.modal.current.toggleModal();
  };

  /**
   * Handles the state changes for the deleting feedback modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
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

  modal = createRef();

  /**
   * Handles deleting feedback
   *
   * @returns {void}
   */
  handleDeleteFeedback = async () => {
    const { id, refetch } = this.props;
    this.toggleLoading();
    try {
      await deleteQuestionMutation(id);
      notification(toastr, 'success', 'Question deleted successfully')();
      this.handleCloseModal();
      this.toggleLoading();
      await refetch();
    } catch (err) {
      notification(toastr, 'error', err.graphQLErrors[0].message)();
      this.handleCloseModal();
      this.toggleLoading();
    }
  };

  /**
   * renders model content for delete feedback
   *
   * @returns {JSX}
   */

   renderModalContent = () => (
     <div className="delete-modal-content">
       <p id="confirm-msg">
         Are you sure you want to delete {`"${this.props.question}"`} ?
         <br />
         This cannot be undone
       </p>
     </div>
   )

   render() {
     const { isDeleting } = this.state;

     return (
       <Modal
         ref={this.modal}
         title="DELETE QUESTION"
         buttonText="Delete"
         actionButtonText="DELETE QUESTION"
         modalContent={this.renderModalContent()}
         isLoading={isDeleting}
         handleSubmit={this.handleDeleteFeedback}
         cancelButtonText="CANCEL"
       />


     );
   }
}

DeleteFeedback.propTypes = {
  question: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteFeedback;
