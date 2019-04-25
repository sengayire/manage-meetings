import React from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button';
import SetupLevel from './SetupLevel';

const SetupInfoPage = ({ handleClick }) => (
  <div className="setup_container">
    <div className="message">
      <h1 className="welcome__message "> Welcome to Room Setup </h1>
    </div>
    <SetupLevel />
    <Button
      title="Continue"
      classProp="setup_continue_button"
      handleClick={handleClick('BuildingLevel')}
    />
  </div>
);

SetupInfoPage.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SetupInfoPage;
