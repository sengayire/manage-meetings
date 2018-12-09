import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { DELETE_WING_MUTATION } from '../graphql/mutations/wings';
import { GET_ALL_WINGS } from '../graphql/queries/wings';
import notification from '../utils/notification';

import '../assets/styles/deleteModal.scss';

export class DeleteWing extends React.Component {
  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleDeleteWing = () => {
    const { wingId, deleteWing } = this.props;
    deleteWing({
      variables: {
        wingId,
      },
      refetchQueries: [{ query: GET_ALL_WINGS }],
    })
      .then((wing) => {
        const { name } = wing.data.deleteWing.wing;
        notification(toastr, 'success', `${name} is deleted successfully`)();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.handleCloseModal();
  };

  render() {
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
            Are you sure you want to delete the {`'${this.props.wingName}'`} wing? This cannot
            be undone & all data will be lost
          </p>
          <div className="modal-actions">
            <button id="cancel-btn" onClick={this.handleCloseModal}>
              CANCEL
            </button>
            <button id="delete-btn" onClick={this.handleDeleteWing}>
              DELETE
            </button>
          </div>
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
