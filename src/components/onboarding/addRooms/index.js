import React from 'react';
import PropTypes from 'prop-types';
import AddRooms from './AddRooms';
import OnboardingLayout from '../../../containers/OnboardingLayout';


export const AddroomsDesign = ({ handleOnClick }) => (
  <OnboardingLayout
    layoutLeft={<AddRooms handleOnClick={handleOnClick} />}
    layoutRight={<p> the preview of your setup</p>}
  />
);

AddroomsDesign.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default AddroomsDesign;
