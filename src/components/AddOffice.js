import React, { Component } from 'react';
import MrmModal from '../components/commons/Modal';
import '../assets/styles/addoffice.scss';

class AddOffice extends Component {
  state = {
    buildingName: '',
    countryName: '',
    timeZone: '',
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

  handleAddOffice = (event) => {
    event.preventDefault();
    // submit logic here
    // after succesful submission close the modal
    this.handleCloseModal();
  };

  render() {
    const {
      buildingName,
      countryName,
      timeZone,
      closeModal,
      openModal,
    } = this.state;

    return (
      <MrmModal
        title="ADD OFFICE"
        buttonText="Add Office"
        closeModal={closeModal}
        openModal={openModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form" onSubmit={this.handleAddOffice}>
          <div>
            <label htmlFor="buildingName">
              Building Name
              <br />
              <br />
              <input
                type="text"
                className="input1"
                id="buildingName"
                name="buildingName"
                placeholder="Enter the building's name"
                value={buildingName}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <br />
          <br />
          <div className="label2">
            <label htmlFor="countryName">
              Enter country<br />
              <br />
              <input
                type="text"
                className="input2"
                id="countryName"
                name="countryName"
                value={countryName}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="label3">
            <label htmlFor="timeZone">
              Select time zone<br />
              <br />
              <div className="modal-append">
                <input
                  type="text"
                  className="input3"
                  id="timeZone"
                  name="timeZone"
                  value={timeZone}
                  onChange={this.handleInputChange}
                />
                <div className="dropdown-icon">
                  <i className="material-icons modal-dropdown">
                    arrow_drop_down
                  </i>
                </div>
              </div>
            </label>
            <br />
            <br />
          </div>
          <button className="primary-button" type="submit">ADD OFFICE</button>
        </form>
      </MrmModal>
    );
  }
}

export default AddOffice;
