import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Input } from '../components/commons/Input';
import MrmModal from '../components/commons/Modal';
import '../assets/styles/editoffice.scss';

export class EditOffice extends React.Component {
  static propTypes = {
    officeName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      officeName: props.officeName,
      location: props.location,
      closeModal: false,
    };
  }

  locations = [
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Kenya', label: 'Kenya' },
  ];

  handleLocationChange = (value) => {
    this.setState({ location: value });
  }

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleEditOffice = (event) => {
    event.preventDefault();
    // submit logic here
    // after succesful submission close the modal
    this.handleCloseModal();
  }

  render() {
    const {
      officeName, location, closeModal,
    } = this.state;

    return (
      <MrmModal
        title="EDIT OFFICE"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-office-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form" onSubmit={this.handleEditOffice}>
          <Input
            labelName="Office Name"
            labelClass="label1"
            inputClass="input1"
            name="officeName"
            value={officeName}
            id="officeName"
            onChange={this.handleNameChange}
          />
          <div className="label2">
            <label htmlFor="location">Select location
              <Dropdown
                source={this.locations}
                onChange={this.handleLocationChange}
                value={location}
              />
            </label>
          </div>
          <div className="edit-buttons">
            <button className="cancel-button">CANCEL</button>
            <button className="update-button" type="submit">SAVE CHANGES</button>
          </div>
        </form>
      </MrmModal>
    );
  }
}

export default EditOffice;
