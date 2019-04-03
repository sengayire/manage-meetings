import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import ActionButtons from '../commons/ActionButtons';
import MrmModal from '../commons/Modal';
import { DELETE_RESOURCE_MUTATION } from '../../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../../graphql/queries/Resources';
import notification from '../../utils/notification';

import '../../assets/styles/deleteModal.scss';

/**
 * Delete Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class DeleteResource extends Component {
  static propTypes = {
    toDelete: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
    deleteResource: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    currentPage: PropTypes.number,
  };

  static defaultProps = {
    currentPage: 1,
    refetch: null,
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
   * Handles the state changes for the deleting resource modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles deleting resource
   *
   * @returns {void}
   */
  handleDeleteResource = () => {
    this.toggleLoading();
    const variables = { variables: { resourceId: this.props.toDelete.id } };
    const { refetch, currentPage } = this.props;
    this.props
      .deleteResource(variables)
      .then(() => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(
          toastr,
          'success',
          `'${this.props.toDelete.name}' has been deleted successfully`,
        )();
        refetch({ page: currentPage });
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
        title="DELETE RESOURCE"
        closeModal={closeModal}
        buttonText="Delete"
        className="delete-modal"
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete &quot;{this.props.toDelete.name}
            &quot;? <br />
            This cannot be undone
          </p>
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            isLoading={isDeleting}
            actionButtonText="DELETE RESOURCE"
            onClickSubmit={this.handleDeleteResource}
          />
        </div>
      </MrmModal>
    );
  }
}

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
