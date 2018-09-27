import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql } from 'react-apollo';
import MrmModal from '../components/commons/Modal';
import ActionButtons from './commons/ActionButtons';
import { Input, SelectInput as Select } from '../components/commons';
import '../assets/styles/editoffice.scss';
import notification from '../utils/notification';
import { GET_ALL_OFFICES } from '../graphql/queries/Offices';
import { EDIT_OFFICE_MUTATION } from '../graphql/mutations/offices';

export class EditOffice extends React.Component {
  state = {
    officeName: this.props.officeName,
    officeLocation: this.props.officeLocation,
    officeId: this.props.officeId,
    closeModal: false,
  };

  handleInputChange = ({ target: { name, value } }) => {
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
    const { officeId, officeName } = this.state;
    this.props.editOffice({
      variables: {
        officeId,
        name: officeName,
      },
    }).then(() => {
      notification(toastr, 'success', `${officeName} office has been updated successfully`)();
    }).catch((err) => {
      this.setState({
        officeName: this.props.officeName,
      });
      notification(toastr, 'error', err.graphQLErrors[0].message)();
    });
    this.handleCloseModal();
  }

  render() {
    const {
      officeName, officeLocation, closeModal,
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
            onChange={this.handleInputChange}
            required
          />
          <Select
            labelText="Select location"
            name="officeLocation"
            id="officeLocation"
            value={officeLocation}
            onChange={this.handleInputChange}
            options={[]}
            wrapperClassName="edit-office-select"
            placeholder={officeLocation}
            placeholderValue=""
            disabled
            selectInputClassName="edit-office-location default-select"
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="SAVE CHANGES"
          />
        </form>
      </MrmModal>
    );
  }
}

EditOffice.propTypes = {
  editOffice: PropTypes.func.isRequired,
  officeName: PropTypes.string.isRequired,
  officeId: PropTypes.string.isRequired,
  officeLocation: PropTypes.string.isRequired,
};

export default graphql(EDIT_OFFICE_MUTATION, { name: 'editOffice', options: { refetchQueries: [{ query: GET_ALL_OFFICES }] } })(EditOffice);
