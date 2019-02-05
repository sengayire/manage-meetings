import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../commons/Modal';
import { Input, SelectInput as Select } from '../commons';
import ActionButtons from '../commons/ActionButtons';
import notification from '../../utils/notification';
import { ADD_FLOOR_MUTATION } from '../../graphql/mutations/Floors';

/**
 * Add Resource Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddFloor extends Component {
  static propTypes = {
    officeId: PropTypes.string,
    addFloor: PropTypes.func.isRequired,
    theOffice: PropTypes.string,
    currentPage: PropTypes.number,
    refetch: PropTypes.func.isRequired,
    blocks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    theOffice: '',
    currentPage: 1,
    officeId: '',
  };

  state = {
    floorName: '',
    blockId: '',
    closeModal: false,
    isCreating: false,
  };

  /**
   * Handles the closing of the modal
   *
   * @return {void}
  */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Ensures that the state is updated basing on the
   * user input
   *
   * @param {object} event
   * @param {number} capacity
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
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isCreating: !this.state.isCreating,
    });
  }

  /**
   * 1. Submits the floor data to the backend
   * 2. Notifies the user about the response from the request
   * i.e whether it was a success or a failure
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleAddFloor = (event) => {
    event.preventDefault();
    const { blockId, floorName } = this.state;
    const { refetch, currentPage, officeId } = this.props;
    if (!floorName) {
      notification(toastr, 'error', 'Floor name is required')();
    } else if (!blockId && this.props.blocks) {
      notification(toastr, 'error', 'A block is required')();
    } else {
      this.toggleLoading();
      this.props
        .addFloor({
          variables: {
            name: floorName,
            blockId: blockId || officeId,
          },
        })
        .then(() => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(
            toastr,
            'success',
            `${floorName} floor has been added successfully`,
          )();
          refetch({ page: currentPage });
        })
        .catch((err) => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(toastr, 'error', err.graphQLErrors[0].message)();
        });
    }
  };

  /**
    * renders the modal for adding a floor.
    *
    * @returns {JSX}
    */
  render() {
    const {
      floorName, blockId, closeModal, isCreating,
    } = this.state;
    const { theOffice, blocks } = this.props;
    return (
      <MrmModal
        title="ADD FLOOR"
        buttonText={theOffice}
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form">
          <Input
            labelName="Floor Name"
            name="floorName"
            value={floorName}
            placeholder="Enter floor name"
            id="floorName"
            onChange={this.handleInputChange}
          />
          {blocks && <Select
            labelText="Select Block "
            name="blockId"
            id="block"
            value={blockId}
            onChange={this.handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Select block"
            options={blocks}
          />
          }
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD FLOOR"
            isLoading={isCreating}
            onClickSubmit={this.handleAddFloor}
          />
        </form>
      </MrmModal>
    );
  }
}

AddFloor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blocks: PropTypes.any.isRequired,
};

export default compose(
  graphql(ADD_FLOOR_MUTATION, { name: 'addFloor' }),
)(AddFloor);
