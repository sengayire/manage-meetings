/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { Input, SelectInput as Select } from './commons';
import '../assets/styles/addoffice.scss';
import ActionButtons from './commons/ActionButtons';
import ADD_WING_MUTATION from '../graphql/mutations/wings';
import GET_FLOORS_QUERY from '../graphql/queries/Floors';
import notification from '../utils/notification';

/**
 * Add Wing Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddWing extends Component {
  static propTypes = {
    addWing: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    floorId: '',
    closeModal: false,
  };

  /**
   * Ensures that the modal for adding wing closes
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {object} event
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
   * Handles the adding of Wings
   *
   * @returns {void}
   */
  handleAddWing = (event) => {
    event.preventDefault();
    const { name, floorId } = this.state;
    if (!name) {
      notification(toastr, 'error', 'Wing name is required')();
    } else {
      this.props
        .addWing({
          variables: {
            name,
            floorId,
          },
        })
        .then((wing) => {
          notification(
            toastr,
            'success',
            `${wing.data.addWing.wing.name} wing has been added successfully`,
          )();
        })
        .catch((err) => {
          notification(toastr, 'error', err.graphQLErrors[0].message)();
        });
      this.handleCloseModal();
    }
  };

  render() {
    const { name, floorId, closeModal } = this.state;
    const { allFloors } = this.props.allFloors;
    const { handleAddWing, handleInputChange, handleCloseModal } = this;

    return (
      <MrmModal
        title="ADD WING"
        buttonText="Add Wing"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form" onSubmit={handleAddWing}>
          <Input
            labelName="Wing Name"
            name="name"
            value={name}
            placeholder="Enter wing name"
            id="wingName"
            onChange={handleInputChange}
          />
          <Select
            labelText="Select floor"
            name="floorId"
            id="floorId"
            value={floorId}
            onChange={handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Select floor"
            options={allFloors}
          />
          <ActionButtons
            withCancel
            onClickCancel={handleCloseModal}
            actionButtonText="ADD WING"
          />
        </form>
      </MrmModal>
    );
  }
}

export default compose(
  graphql(GET_FLOORS_QUERY, { name: 'allFloors' }),
  graphql(ADD_WING_MUTATION, { name: 'addWing' }),
)(AddWing);
