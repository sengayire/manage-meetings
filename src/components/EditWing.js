import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql } from 'react-apollo';
import MrmModal from '../components/commons/Modal';
import ActionButtons from './commons/ActionButtons';
import { Input } from '../components/commons';
import '../assets/styles/editoffice.scss';
import notification from '../utils/notification';
import { GET_ALL_WINGS } from '../graphql/queries/wings';
import { EDIT_WING_MUTATION } from '../graphql/mutations/wings';

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

  handleEditWing = (e) => {
    const { wingId, wingName } = this.state;
    const { editWing } = this.props;
    e.preventDefault();
    editWing({
      variables: {
        wingId,
        name: wingName,
      },
    }).then(() => {
      notification(toastr, 'success', `${wingName} office has been updated successfully`)();
    }).catch((err) => {
      this.setState({
        wingName: this.props.wingName,
      });
      notification(toastr, 'error', err.graphQLErrors[0].message)();
    });
    this.handleCloseModal();
  }

  render() {
    const { closeModal, wingName } = this.state;
    return (
      <MrmModal
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        title="EDIT WING"
        buttonText="Edit"
        className="edit-office-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form" onSubmit={this.handleEditWing}>
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
          />
        </form>
      </MrmModal>);
  }
}

export default graphql(EDIT_WING_MUTATION, { name: 'editWing', options: { refetchQueries: [{ query: GET_ALL_WINGS }] } })(EditWing);
