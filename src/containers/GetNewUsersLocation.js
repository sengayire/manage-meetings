import React from 'react';
import PropTypes from 'prop-types';
import MrmModal from '../components/commons/Modal';
import SelectLocation from '../components/navbars/AnalyticsNav/SelectLocation';
import Button from '../components/commons/Button';
import '../assets/styles/getNewUsersLocation.scss';
import { setNewUsersLocation } from '../components/helpers/mutationHelpers/people';
import Spinner from '../components/commons/Spinner';
import '../assets/styles/spinner.scss';

/**
 * Get New Users Location Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class GetNewUsersLocation extends React.Component {
    state = {
      showLocations: false,
      location: this.props.userLocation,
    };

  /**
   * It toggles the dropdown that displays
   * list of different locations
   *
   * @returns {void}
   */
    toggleLocationDropdown = () => {
      this.setState(({ showLocations }) => ({
        showLocations: !showLocations,
      }));
    }

  /**
   * Handles a change in the locations
   *
   * @returns {void}
   */
    handleLocationChange = async (locationId, location) => {
      this.setState({
        showLocations: false,
        location,
      });
      await setNewUsersLocation(locationId);
    }

  /**
   * Spinner handler
   *
   * @returns {void}
   */
    renderSpinner = () => (
      <div className="modal-spinner">
        <Spinner />
      </div>
    );

    render() {
      const { showLocations, location } = this.state;
      if (!location) {
        return this.renderSpinner();
      }

      return (
        <MrmModal
          openModal
          showBtn={false}
        >
          <div className="modal-container">
            <h2>Hey there, welcome to Converge!</h2>
            <div className="align">
              <h3>Kindly select your location below</h3>
            </div>
            <div className="align__row">
              <div className="analytics-cover">
                <div className="btn-right">
                  <div className="btn-right__location">
                    <div>
                      <Button
                        classProp="btn-right__location__btn btn-right__location__btn--with-caret"
                        title={location}
                        type={2}
                        handleClick={this.toggleLocationDropdown}
                      />
                      <SelectLocation
                        defaultLocation={this.state.location}
                        handleLocationChange={this.handleLocationChange}
                        active={showLocations}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <form>
                <div className="align">
                  <Button
                    title="CONTINUE"
                    handleClick={this.handleCloseModal}
                    type={1}
                  />
                </div>
              </form>
            </div>
          </div>
        </MrmModal>
      );
    }
}

GetNewUsersLocation.propTypes = {
  userLocation: PropTypes.string.isRequired,
};

export default GetNewUsersLocation;
