import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { DELETE_OFFICE_MUTATION } from '../graphql/mutations/offices';
import { GET_ALL_OFFICES } from '../graphql/queries/Offices';
import notification from '../utils/notification';

import '../assets/styles/deleteModal.scss';

export class DeleteOffice extends React.Component {
  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleDeleteOffice = () => {
    const { officeId, deleteOffice } = this.props;
    deleteOffice({
      variables: {
        officeId,
      },
      refetchQueries: [{ query: GET_ALL_OFFICES }],
    })
      .then((office) => {
        const { name } = office.data.deleteOffice.office;
        notification(toastr, 'success', `${name} is deleted successfully`)();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.handleCloseModal();
  };

  render() {
    const { closeModal } = this.state;

    return (
      <MrmModal
        className="delete-modal"
        title="DELETE OFFICE"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete the {`"${this.props.officeName}"`} office? This cannot
            be undone & all data will be lost
          </p>
          <div className="modal-actions">
            <button id="cancel-btn" onClick={this.handleCloseModal}>
              CANCEL
            </button>
            <button id="delete-btn" onClick={this.handleDeleteOffice}>
              DELETE
            </button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteOffice.propTypes = {
  officeName: PropTypes.string.isRequired,
  officeId: PropTypes.string.isRequired,
  deleteOffice: PropTypes.func.isRequired,
};

export default compose(
  graphql(DELETE_OFFICE_MUTATION, { name: 'deleteOffice' }),
  graphql(GET_ALL_OFFICES, { name: 'allOffices' }),
)(DeleteOffice);
