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
    if (this.state.closeModal) this.setState({ closeModal: false });
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
        title="ADD AMENITIES"
        buttonText="Add Amenities"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleAddAmenity}>
          <div>
            <label htmlFor="amenity">
              <br />
              Amenity
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
            </label>
            <button type="submit">ADD AMENITY</button>
          </div>
        </form>
      </MrmModal>
    );
  }
}

export default AddResource;
