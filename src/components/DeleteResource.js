import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { DELETE_RESOURCE_MUTATION } from '../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../graphql/queries/Resources';
import notification from '../utils/notification';

import '../assets/styles/deleteModal.scss';

export class DeleteResource extends Component {
  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleDeleteResource = () => {
    const variables = { variables: { resourceId: this.props.toDelete.id } };
    const { refetch, currentPage } = this.props;
    this.props.deleteResource(variables)
      .then(() => {
        notification(
          toastr,
          'error',
          `'${this.props.toDelete.name}' has been deleted successfully`,
        )();
        refetch({ page: currentPage });
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
        title="DELETE RESOURCE"
        closeModal={closeModal}
        buttonText="Delete"
        className="delete-modal"
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete &quot;{this.props.toDelete.name}&quot;? <br />
            This cannot be undone
          </p>
          <div className="modal-actions">
            <button id="cancel-btn" onClick={this.handleCloseModal}>
              CANCEL
            </button>
            <button id="delete-btn" onClick={this.handleDeleteResource}>
              DELETE
            </button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteResource.propTypes = {
  toDelete: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  deleteResource: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  currentPage: PropTypes.number,
};

DeleteResource.defaultProps = {
  currentPage: 1,
  refetch: null,
};

export default compose(
  graphql(GET_RESOURCES_QUERY, {
    name: 'getResourcesQuery',
    options: () => ({
      variables: {
        page: 1,
        perPage: 5,
      },
      options: { refetchQueries: [{ query: GET_RESOURCES_QUERY }] },
    }),
  }),
  graphql(DELETE_RESOURCE_MUTATION, { name: 'deleteResource' }),
)(DeleteResource);
