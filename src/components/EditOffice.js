import React from 'react';
import MrmModal from '../components/commons/Modal';


class EditOffice extends React.Component {
  state = {
    closeModal: false,
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    if (this.state.closeModal) this.setState({ closeModal: false });
  }

  render() {
    const {
      closeModal,
    } = this.state;

    return (
      <MrmModal
        title="EDIT OFFICE"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <span>
          Edit office
        </span>
      </MrmModal>
    );
  }
}

export default EditOffice;
