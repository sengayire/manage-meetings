import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { DELETE_RESOURCE_MUTATION } from '../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../graphql/queries/Resources';
import notification from '../utils/notification';

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
    this.props.deleteResource(variables)
      .then(() => {
        notification(
          toastr,
          'error',
          `'${this.props.toDelete.name}' has been deleted successfully`,
        )();
        this.props.getResourcesQuery.refetch();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.handleCloseModal();
  };

  render() {
    const { closeModal } = this.state;
    const { toDelete } = this.props;
    return (
      <MrmModal
        title="Delete Resources"
        closeModal={closeModal}
        buttonText="Delete"
        className="delete-resource-modal"
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="modal-content">
          <div className="modal-text">
            <p>Are you sure you want to delete &quot; {toDelete.name} &quot;?</p>
            <p>This cannot be undone</p>
          </div>
          <div className="button-container">
            <button onClick={this.handleDeleteResource} className="modal-submit delete-resource">Delete</button>
            <button className="modal-cancel" onClick={this.handleCloseModal}>Cancel</button>
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
  getResourcesQuery: PropTypes.shape({
    refetch: PropTypes.func,
  }),
};

DeleteResource.defaultProps = {
  getResourcesQuery: {},
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
