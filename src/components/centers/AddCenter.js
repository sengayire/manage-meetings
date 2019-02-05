/* eslint-disable import/no-named-as-default,array-callback-return,consistent-return */
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Input } from '../commons';
import ActionButtons from '../commons/ActionButtons';
import ADD_CENTER_MUTATION from '../../graphql/mutations/centers';
import MrmModal from '../commons/Modal';
import countries from '../../fixtures/countries';
import notification from '../../utils/notification';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import allCites from '../../fixtures/cities';

export class AddCenter extends Component {
  static propTypes = {
    addCenter: PropTypes.func.isRequired,
  };

  state = {
    centerName: '',
    abbreviation: '',
    closeModal: false,
  };

  /**
   * it closes the modal and resets imageUrl and thumbnailName to defaults
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({
      closeModal: true,
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
   *1. submits center data to the backend api
   *2. notifies the user about the response from the request
   *
   * @returns {void}
   */
  createCenter = () => {
    const {
      centerName, abbreviation,
    } = this.state;

    const { user } = this.props;
    const { location } = user.user;
    let selectedCountry = {};

    allCites.find((data) => {
      if (data.city.toLowerCase() === location.toLowerCase()) {
        selectedCountry = countries.find(singleCountry => (singleCountry.id === data.country));
      }
    });

    const { timeZone, name } = selectedCountry;
    this.props
      .addCenter({
        variables: {
          country: name,
          name: centerName,
          timeZone,
          abbreviation,
        },
      })
      .then(() => {
        notification(
          toastr,
          'success',
          `${centerName} center has been added successfully`,
        )();
        this.props.refetch();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.handleCloseModal();
  };

  /**
   *1. validates input
   *2. calls createCenter method after validation to perform center creation
   *
   * @param {object} event
   * @returns {void}
   */
  handleAddCenter = (event) => {
    event.preventDefault();
    const {
      centerName, abbreviation,
    } = this.state;
    if (!centerName) {
      notification(toastr, 'error', 'center name is required')();
    } else if (!abbreviation) {
      notification(toastr, 'error', 'abbreviation field is required')();
    } else {
      this.createCenter();
    }
  };

  render() {
    const {
      centerName, closeModal,
      abbreviation,
    } = this.state;
    return (
      <MrmModal
        title="ADD CENTER"
        buttonText="Add Center"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
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
            actionButtonText="ADD CENTER"
            onClickSubmit={this.handleAddCenter}
          />
        </form>
      </MrmModal>
    );
  }
}

AddCenter.propTypes = {
  refetch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(ADD_CENTER_MUTATION, { name: 'addCenter' }),
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
)(AddCenter);
