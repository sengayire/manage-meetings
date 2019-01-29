import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql, compose } from 'react-apollo';
import { Input } from '../commons/Input';
import MrmModal from '../commons/Modal';
import '../../assets/styles/editresource.scss';
import notification from '../../utils/notification';

import ActionButtons from '../commons/ActionButtons';
import { EDIT_RESOURCE_MUTATION } from '../../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../../graphql/queries/Resources';

/**
 * Edit Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class EditResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceName: props.resource.name,
      resourceId: props.resource.id,
      roomId: props.resource.roomId,
      closeModal: false,
      isLoading: false,
    };
  }

  /**
   * It closes a modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * It changes the state of the modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {Object} target
   *
   * @returns {void}
   */
  handleNameChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  /**
   * Handles editing resource
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleEditResource = (event) => {
    event.preventDefault();
    const { resourceId, resourceName, roomId } = this.state;
    const { refetch, currentPage } = this.props;
    this.toggleLoading();
    this.props.editResource({
      variables: {
        resourceId,
        name: resourceName,
        roomId,
      },
    }).then(() => {
      this.toggleLoading();
      this.handleCloseModal();
      notification(toastr, 'success', `${resourceName} resource has been updated successfully`)();
      refetch({ page: currentPage });
    }).catch((err) => {
      this.toggleLoading();
      this.handleCloseModal();
      this.setState({
        resourceName: this.state.resourceName,
      });
      notification(toastr, 'error', err.graphQLErrors[0].message)();
    });
  }

  /**
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  render() {
    const {
      resourceName, closeModal, isLoading,
    } = this.state;
    return (
      <MrmModal
        title="EDIT RESOURCE"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-resource-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form" onSubmit={this.handleEditResource}>
          <Input
            labelName="Rename Resource"
            name="resourceName"
            value={resourceName}
            id="resourceName"
            onChange={this.handleNameChange}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            isLoading={isLoading}
            actionButtonText="SAVE CHANGES"
            onClickSubmit={this.handleEditResource}
          />

        </form>
      </MrmModal>
    );
  }
}

EditResource.propTypes = {
  refetch: PropTypes.func.isRequired,
  editResource: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    roomId: PropTypes.number,
  }).isRequired,
  currentPage: PropTypes.number,
};

EditResource.defaultProps = {
  currentPage: 1,
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
  graphql(EDIT_RESOURCE_MUTATION, { name: 'editResource' }),
)(EditResource);
