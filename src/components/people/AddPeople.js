import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ActionButtons from '../commons/ActionButtons';
import MrmModal from '../commons/Modal';
import { Input } from '../commons';
import { invitePersonMutation } from '../helpers/mutationHelpers/people';
import notification from '../../utils/notification';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class AddPeople extends React.Component {
  state = {
    people: '',
    closeModal: false,
  };

  /**
   * Ensures that the modal for inviting a person closes
   * when a user hits CANCEL on the modal or when
   * inviting a person is successful
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
   * @param {number} capacity
   *
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ people: value, [name]: value });
  };

  validateUser = (people) => {
    const { users } = this.props.availableUsers;
    const existingUsers = users || [];
    return existingUsers.some(item => item.email === people);
  }

  submitInvite = () => {
    const { email } = this.state;
    if (this.validateUser(email)) {
      notification(toastr, 'error', 'Provide a new, unique user to invite')();
    } else {
      invitePersonMutation(email)
        .then(() => {
          notification(toastr, 'success', 'User Successfully invited')();
        })
        .catch((error) => {
          notification(toastr, 'error', error.graphQLErrors[0].message)();
        });
    }
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

  render() {
    const {
      people,
      closeModal,
    } = this.state;
    return (
      <MrmModal
        title="INVITE A NEW USER"
        buttonText="Invite a New User"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-resource-modal"
      >
        <form className="amenity-form" onSubmit={this.handleCloseModal}>
          <div>
            <Input
              id="user"
              name="email"
              placeholder="Enter Users Email"
              labelName="Users Email Address"
              labelClass="add-resource-controls"
              value={people}
              onChange={this.handleInputChange}
            />
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                onClickCancel={this.handleCloseModal}
                actionButtonText="SEND INVITE"
                onClickSubmit={this.submitInvite}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

AddPeople.propTypes = {
  availableUsers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default AddPeople;
