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

/**
 * Add Office Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddOffice extends Component {
  static propTypes = {
    locations: PropTypes.shape({
      allLocations: PropTypes.array,
    }),
    addOffice: PropTypes.func.isRequired,
  };

  static defaultProps = {
    locations: {},
  };
  state = {
    officeName: '',
    officeLocation: '',
    closeModal: false,
    isLoading: false,
  };

  /**
   * Ensures that the modal for adding office closes
   * when a user hits CANCEL on the modal or when the
   * creation of an office is successful
   *
   * @returns {void}
   */

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Ensures that the state is updated basing on the
   * user input
   *
   * @param {object} event The input event parameter
   *
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /**
   * It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * 1. Validates the user input
   * 2. Submits the office data to the backend
   * 3. Notifies the user about the response from his request
   * i.e whether it was a success or a failure
   *
   * @param {object} event
   *
   * @returns {Function}
   */
  handleAddOffice = (event) => {
    event.preventDefault();
    const { officeLocation, officeName } = this.state;
    if (!officeName) {
      notification(toastr, 'error', 'Office name is required')();
    } else if (!officeLocation) {
      notification(toastr, 'error', 'Office location is required')();
    } else {
      this.toggleLoading();
      this.props
        .addOffice({
          variables: {
            locationId: officeLocation,
            name: officeName,
          },
        })
        .then((office) => {
          this.toggleLoading();
          this.handleCloseModal();
          const { name } = office.data.createOffice.office;
          notification(
            toastr,
            'success',
            `${name} office has been added successfully`,
          )();
        })
        .catch((err) => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(toastr, 'error', err.graphQLErrors[0].message)();
        });
    }
  };

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
      officeName, officeLocation, closeModal, isLoading,
    } = this.state;
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
        <form className="modal-form">
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
            isLoading={isLoading}
            actionButtonText="ADD OFFICE"
            onClickSubmit={this.handleAddOffice}
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
