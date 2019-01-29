import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql, compose } from 'react-apollo';
import MrmModal from '../commons/Modal';
import ActionButtons from '../commons/ActionButtons';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/editoffice.scss';
import notification from '../../utils/notification';
import { GET_ALL_OFFICES } from '../../graphql/queries/Offices';
import { EDIT_OFFICE_MUTATION } from '../../graphql/mutations/offices';

/**
 * Edit Office Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class EditOffice extends React.Component {
  state = {
    officeName: this.props.officeName,
    officeLocation: this.props.officeLocation,
    officeId: this.props.officeId,
    closeModal: false,
    isLoading: false,
  };

  /**
   * Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {Object} target
   *
   * @returns {void}
   */
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  /**
   * It closes a modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * HIt changes the state of the modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles editing office
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleEditOffice = (event) => {
    event.preventDefault();
    this.toggleLoading();
    const { officeId, officeName } = this.state;
    const { refetch, currentPage } = this.props;
    this.props
      .editOffice({
        variables: {
          officeId,
          name: officeName,
        },
      })
      .then(() => {
        notification(toastr,
          'success', `${officeName} office has been updated successfully`)();
        this.handleCloseModal();
        this.toggles(); refetch({ page: currentPage });
      })
      .catch((err) => {
        this.toggleLoading();
        this.handleCloseModal();
        this.setState({
          officeName: this.props.officeName,
        });
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
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

    return (
      <MrmModal
        title="EDIT OFFICE"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-office-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form">
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
            isLoading={isLoading}
            onClickSubmit={this.handleEditOffice}
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
  refetch: PropTypes.func,
  currentPage: PropTypes.number,
};

EditOffice.defaultProps = {
  refetch: PropTypes.func,
  currentPage: null,
};

export default compose(
  graphql(GET_ALL_OFFICES, {
    name: 'allOffices',
    options: () => ({
      variables: {
        page: 1,
        perPage: 5,
      },
      options: { refetchQueries: [{ query: GET_ALL_OFFICES }] },
    }),
  }),
  graphql(EDIT_OFFICE_MUTATION, { name: 'editOffice' }),
)(EditOffice);
