import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql } from 'react-apollo';
import MrmModal from '../commons/Modal';
import ActionButtons from '../commons/ActionButtons';
import { Input } from '../commons';
import '../../assets/styles/editoffice.scss';
import notification from '../../utils/notification';
import { GET_ALL_WINGS } from '../../graphql/queries/wings';
import { EDIT_WING_MUTATION } from '../../graphql/mutations/wings';

/**
 * Edit Wing Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class EditWing extends React.Component {
  static propTypes = {
    wingId: PropTypes.string.isRequired,
    wingName: PropTypes.string.isRequired,
    editWing: PropTypes.func.isRequired,
  };

  state = {
    wingName: this.props.wingName,
    wingId: this.props.wingId,
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
   * It changes the state of the modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles editing wing
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleEditWing = (e) => {
    const { wingId, wingName } = this.state;
    const { editWing } = this.props;
    e.preventDefault();
    this.toggleLoading();
    editWing({
      variables: {
        wingId,
        name: wingName,
      },
    }).then(() => {
      this.toggleLoading();
      this.handleCloseModal();
      notification(toastr, 'success', `${wingName} office has been updated successfully`)();
    }).catch((err) => {
      this.toggleLoading();
      this.handleCloseModal();
      this.setState({
        wingName: this.props.wingName,
      });
      notification(toastr, 'error', err.graphQLErrors[0].message)();
    });
  }

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
    const { closeModal, wingName, isLoading } = this.state;
    return (
      <MrmModal
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        title="EDIT WING"
        buttonText="Edit"
        className="edit-office-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form">
          <Input
            name="wingName"
            labelName="Wing Name"
            onChange={this.handleInputChange}
            inputClass="input1"
            value={wingName}
            labelClass="label1"
            id="wingName"
            required
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="SAVE CHANGES"
            isLoading={isLoading}
            onClickSubmit={this.handleEditWing}
          />
        </form>
      </MrmModal>
    );
  }
}

export default graphql(EDIT_WING_MUTATION, {
  name: 'editWing',
  options: { refetchQueries: [{ query: GET_ALL_WINGS }] },
})(EditWing);
