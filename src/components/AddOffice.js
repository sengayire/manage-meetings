import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { Input, SelectInput as Select } from './commons';

import '../assets/styles/addoffice.scss';
import ActionButtons from './commons/ActionButtons';
import { GET_LOCATIONS_QUERY } from '../graphql/queries/Rooms';
import ADD_OFFICE_MUTATION from '../graphql/mutations/offices';
import notification from '../utils/notification';

export class AddOffice extends Component {
  static propTypes = {
    locations: PropTypes.shape({
      allLocations: PropTypes.array,
    }),
    addOffice: PropTypes.func,
  }

  static defaultProps = {
    locations: {},
    addOffice: () => {},
  }
  state = {
    officeName: '',
    officeLocation: '',
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
    const { officeLocation, officeName } = this.state;
    if (!officeName) {
      notification(toastr, 'error', 'Office name is required')();
    } else if (!officeLocation) {
      notification(toastr, 'error', 'Office location is required')();
    } else {
      this.props.addOffice({
        variables: {
          locationId: officeLocation,
          name: officeName,
        },
      }).then((office) => {
        const { name } = office.data.createOffice.office;
        notification(toastr, 'success', `${name} office has been added successfully`)();
      }).catch(() => {
        notification(toastr, 'error', 'Failed to add office')();
      });
      this.handleCloseModal();
    }
  };

  render() {
    const { officeName, officeLocation, closeModal } = this.state;
    const { allLocations } = this.props.locations;

    return (
      <MrmModal
        title="ADD OFFICE"
        buttonText="Add Office"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form" onSubmit={this.handleAddOffice}>
          <Input
            labelName="Office Name"
            name="officeName"
            value={officeName}
            placeholder="Enter office name"
            id="officeName"
            onChange={this.handleInputChange}
          />
          <Select
            labelText="Select Office Location"
            name="officeLocation"
            id="officeLocation"
            value={officeLocation}
            onChange={this.handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Select office location"
            options={allLocations}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD OFFICE"
          />
        </form>
      </MrmModal>
    );
  }
}

export default compose(
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
  graphql(ADD_OFFICE_MUTATION, { name: 'addOffice' }),
)(AddOffice);
