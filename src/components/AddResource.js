import React from 'react';
import MrmModal from '../components/commons/Modal';
import '../assets/styles/addresource.scss';

class AddResource extends React.Component {
  state = {
    amenity: '',
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddAmenity = (event) => {
    event.preventDefault();
    // submission logic goes here
    this.handleCloseModal();
  };

  render() {
    const { amenity, closeModal } = this.state;

    return (
      <MrmModal
        title="ADD RESOURCE"
        buttonText="Add Resource"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleAddAmenity}>
          <div >
            <label htmlFor="amenity">
              <br />
              Resource Name
              <br />
              <br />
              <input
                type="text"
                id="amenity"
                name="amenity"
                value={amenity}
                onChange={this.handleInputChange}
                placeholder="Separate amenities with comma"
              />
            </label >
            <div className="button-container ">
              <button className="add-resource" type="submit">ADD RESOURCE</button>
              <button className="modal-cancel" onClick={this.handleCloseModal}>CANCEL</button>
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

export default AddResource;
