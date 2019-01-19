/* eslint-disable import/no-named-as-default,array-callback-return,consistent-return */
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Input } from '../commons';
import ActionButtons from '../commons/ActionButtons';
import ADD_LOCATION_MUTATION from '../../graphql/mutations/locations';
import MrmModal from '../../components/commons/Modal';
import countries from '../../fixtures/countries';
import notification from '../../utils/notification';
import SelectImage from '../commons/SelectImage';
import getThumbnailName from '../helpers/thumbnailName';
import getImageUrl from '../helpers/ImageUpload';
import { GET_USER_QUERY } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import allCites from '../../fixtures/cities';

export class AddLocation extends Component {
  static propTypes = {
    addLocation: PropTypes.func.isRequired,
  };

  state = {
    locationName: '',
    abbreviation: '',
    imageUrl: '',
    uploading: false,
    thumbnailName: 'Upload a thumbnail',
    closeModal: false,
  };

  /**
   * it closes the modal and resets imageUrl and thumbnailName to defaults
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({
      imageUrl: '',
      closeModal: true,
      thumbnailName: 'Upload a thumbnail',
    });
  };

  /**
   * updates the state value of a given input
   * @param event
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { name, value, files } = event.target;
    let thumbnailName;

    /* istanbul ignore next */
    if (name === 'selectImage') {
      thumbnailName = getThumbnailName(files);
      const reader = new FileReader();
      const file = files[0];

      reader.onloadend = () => {
        this.setState({
          file,
          thumbnailName,
          imageUrl: reader.result,
        });
      };
      if (file) reader.readAsDataURL(file);
    } else {
      this.setState({ [name]: value });
    }
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
  createLocation = () => {
    const {
      imageUrl, locationName, abbreviation,
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
      .addLocation({
        variables: {
          imageUrl,
          country: name,
          name: locationName,
          timeZone,
          abbreviation,
        },
      })
      .then(() => {
        notification(
          toastr,
          'success',
          `${locationName} location has been added successfully`,
        )();
        this.props.refetch();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.setState({ uploading: false });
    this.handleCloseModal();
  };

  /**
   *1. validates input
   *2. uploads image in case ImageUrl is not empty
   *3. calls createLocation method after validation to perform location creation
   *
   * @param {object} event
   * @returns {void}
   */
  handleAddLocation = (event) => {
    event.preventDefault();
    const {
      imageUrl, locationName, abbreviation,
    } = this.state;
    if (!locationName) {
      notification(toastr, 'error', 'location name is required')();
    } else if (!abbreviation) {
      notification(toastr, 'error', 'abbreviation field is required')();
    } else
    /* istanbul ignore next */
    if (imageUrl) {
      this.setState({ uploading: true });
      getImageUrl('upload/', this.state.file).then((url) => {
        if (typeof url === 'string') {
          this.setState({
            imageUrl: url,
          });
          this.createLocation();
        }
      });
    } else {
      this.setState({ uploading: true });
      this.createLocation();
    }
  };

  render() {
    const {
      locationName, closeModal,
      abbreviation, imageUrl, thumbnailName, uploading,
    } = this.state;

    return (
      <MrmModal
        title="ADD LOCATION"
        buttonText="Add Location"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form">
          <SelectImage
            onChange={this.handleInputChange}
            imageUrl={imageUrl}
            thumbnailName={thumbnailName}
          />
          <Input
            labelName="Location Name"
            name="locationName"
            value={locationName}
            placeholder="Enter location name"
            id="locationName"
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
            actionButtonText="ADD LOCATION"
            isLoading={uploading}
            onClickSubmit={this.handleAddLocation}
          />
        </form>
      </MrmModal>
    );
  }
}

AddLocation.propTypes = {
  refetch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

export default compose(
  graphql(ADD_LOCATION_MUTATION, { name: 'addLocation' }),
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
)(AddLocation);
