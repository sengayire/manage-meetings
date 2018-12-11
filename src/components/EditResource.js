import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql, compose } from 'react-apollo';
import { Input } from '../components/commons/Input';
import MrmModal from '../components/commons/Modal';
import '../assets/styles/editresource.scss';
import notification from '../utils/notification';

import { EDIT_RESOURCE_MUTATION } from '../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../graphql/queries/Resources';

export class EditResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceName: props.resource.name,
      resourceId: props.resource.id,
      roomId: props.resource.roomId,
      closeModal: false,
    };
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleEditResource = (event) => {
    event.preventDefault();
    const { resourceId, resourceName, roomId } = this.state;
    const { refetch } = this.props;
    this.props.editResource({
      variables: {
        resourceId,
        name: resourceName,
        roomId,
      },
    }).then(() => {
      notification(toastr, 'success', `${resourceName} resource has been updated successfully`)();
      refetch();
    }).catch((err) => {
      this.setState({
        resourceName: this.state.resourceName,
      });
      notification(toastr, 'error', err.graphQLErrors[0].message)();
    });
    this.handleCloseModal();
  }

  render() {
    const {
      resourceName, closeModal,
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
          <div className="buttons-cover">
            <button className="modal-cancel-button" onClick={this.handleCloseModal}>CANCEL</button>
            <button className="update-button" type="submit">SAVE CHANGES</button>
          </div>
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
