/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import MrmModal from '../commons/Modal';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/addoffice.scss';
import ActionButtons from '../commons/ActionButtons';
import ADD_WING_MUTATION from '../../graphql/mutations/wings';
import GET_FLOORS_QUERY from '../../graphql/queries/Floors';
import { GET_ALL_WINGS } from '../../graphql/queries/wings';
import notification from '../../utils/notification';

/**
 * Add Wing Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddWing extends Component {
  state = {
    name: '',
    floorId: '',
    closeModal: false,
    isLoading: false,
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
    } else if (!floorId) {
      notification(toastr, 'error', 'Floor is required')();
    } else {
      this.toggleLoading();
      this.props
        .addWing({
          variables: {
            name,
            floorId,
          },
        })
        .then((wing) => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(
            toastr,
            'success',
            `${wing.data.createWing.wing.name} wing has been added successfully`,
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
      name, floorId, closeModal, isLoading,
    } = this.state;
    const { loading, allFloors } = this.props.data;
    const { handleAddWing, handleInputChange, handleCloseModal } = this;
    let floors;
    if (!loading) {
      floors = allFloors && allFloors.floors.filter(floor =>
        floor.block.offices.location.name === this.props.userLocation);
    }

    return (
      <MrmModal
        title="ADD WING"
        buttonText="Add Wing"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form">
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
            options={this.props.data.loading ? [] : floors}
          />
          <ActionButtons
            withCancel
            isLoading={isLoading}
            onClickCancel={handleCloseModal}
            actionButtonText="ADD WING"
            onClickSubmit={handleAddWing}
          />
        </form>
      </MrmModal>
    );
  }
}
AddWing.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    refetch: PropTypes.func,
  }),
};

AddWing.defaultProps = {
  data: {
    loading: false,
  },
};

export default compose(
  graphql(GET_FLOORS_QUERY, {
    options: () => ({
      variables: {
        page: 1,
        perPage: 50,
      },
    }),
  }),
  graphql(ADD_WING_MUTATION, {
    name: 'addWing',
    options: { refetchQueries: [{ query: GET_ALL_WINGS }] },
  }))(AddWing);
