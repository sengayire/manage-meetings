import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Modal from '../commons/MrmModal';
import '../../assets/styles/deleteModal.scss';
import notification from '../../utils/notification';
import { DELETE_ROOM_FEEDBACK_QUESTION } from '../../graphql/mutations/Question';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../graphql/queries/questions';

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

  /**
   * Handles deleting feedback
   *
   * @returns {void}
   */
  handleDeleteFeedback = () => {
    const { id, question, deleteFeedback } = this.props;
    this.toggleLoading();
    deleteFeedback({
      variables: {
        questionId: id,
      },
      refetchQueries: [{ query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY }],
    })
      .then(() => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'success', `${question} has been deleted successfully`)();
      })
      .catch((err) => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
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
  deleteFeedback: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default compose(
  graphql(DELETE_ROOM_FEEDBACK_QUESTION, { name: 'deleteFeedback' }),
  graphql(GET_ROOM_FEEDBACK_QUESTIONS_QUERY, { name: 'allQuestions' }),
)(DeleteFeedback);
