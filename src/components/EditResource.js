import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../components/commons/Input';
import MrmModal from '../components/commons/Modal';
import '../assets/styles/editresource.scss';

class EditResource extends React.Component {
  static propTypes = {
    resourceName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      resourceName: props.resourceName,
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
    // submit logic here
    // after succesful submission close the modal
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
          <div className="edit-buttons">
            <button className="update-button" type="submit">UPDATE</button>
          </div>
        </form>
      </MrmModal>
    );
  }
}

export default EditResource;
