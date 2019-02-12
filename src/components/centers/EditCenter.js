/* eslint-disable import/no-named-as-default,array-callback-return,consistent-return */
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Input } from '../commons';
import ActionButtons from '../commons/ActionButtons';
import { EDIT_CENTER_MUTATION } from '../../graphql/mutations/centers';
import MrmModal from '../commons/Modal';
import countries from '../../fixtures/countries';
import notification from '../../utils/notification';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import allCites from '../../fixtures/cities';

export class EditCenter extends Component {
  state = {
    centerName: this.props.centerName,
    abbreviation: this.props.abbreviation,
    centerId: this.props.centerId,
    closeModal: false,
    isLoading: false,
  };

  /**
   * it closes the modal
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({
      closeModal: true,
      isLoading: false,
    });
  };

  /**
   * updates the state value of a given input
   * @param event
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /**
   * updates closeModal state to false when ever modal closes
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   *1. submits location data to the backend api
   *2. notifies the user about the response from the request
   *
   * @returns {void}
   */
  editCenter = () => {
    const {
      centerName, abbreviation, centerId,
    } = this.state;

    const { user } = this.props;
    const { location } = user.user;
    let selectedCountry = {};

    allCites.find((data) => {
      if (data.city.toLowerCase() === location.toLowerCase()) {
        selectedCountry = countries.find(singleCountry => (singleCountry.id === data.country));
      }
    });

    const { name } = selectedCountry;
    const { refetch } = this.props;
    this.toggleLoading();
    this.props
      .editCenter({
        variables: {
          locationId: centerId,
          name: centerName,
          country: name,
          abbreviation,
        },
      })
      .then(() => {
        this.toggleLoading();
        notification(
          toastr,
          'success',
          `${centerName} location has been edited successfully`,
        )();
        refetch();
        this.handleCloseModal();
      })
      .catch((err) => {
        this.setState({ centerName: this.props.centerName });
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.toggleLoading();
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
  /**
   *1. validates input
   *2. calls editCenter method after validation to perform location creation
   *
   * @param {object} event
   * @returns {void}
   */
  handleEditCenter = (event) => {
    event.preventDefault();
    const {
      centerName, abbreviation,
    } = this.state;
    if (!centerName) {
      notification(toastr, 'error', 'location name is required')();
    } else if (!abbreviation) {
      notification(toastr, 'error', 'abbreviation field is required')();
    } else {
      this.toggleLoading();
      this.editCenter();
    }
  };

  render() {
    const {
      centerName, closeModal,
      abbreviation, isLoading,
    } = this.state;

    return (
      <MrmModal
        title="EDIT CENTER"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form">
          <Input
            labelName="Center Name"
            name="centerName"
            value={centerName}
            placeholder="Enter center name"
            id="centerName"
            onChange={this.handleInputChange}
          />
          <Input
            labelName="Abbreviation"
            name="abbreviation"
            value={abbreviation}
            placeholder="Eg. Kla"
            id="abbreviation"
            onChange={this.handleInputChange}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="SAVE CHANGES"
            isLoading={isLoading}
            onClickSubmit={this.handleEditCenter}
          />
        </form>
      </MrmModal>
    );
  }
}
EditCenter.propTypes = {
  editCenter: PropTypes.func,
  centerName: PropTypes.string,
  centerId: PropTypes.string,
  abbreviation: PropTypes.string,
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  refetch: PropTypes.func,
};

EditCenter.defaultProps = {
  refetch: null,
  editCenter: null,
  centerName: '',
  abbreviation: '',
  centerId: null,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(EDIT_CENTER_MUTATION, { name: 'editCenter' }),
  graphql(GET_USER_QUERY, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email:
          process.env.NODE_ENV === 'test'
            ? 'sammy.muriuki@andela.com'
            : userData.email,
      },
    }),
  }),
)(EditCenter);
