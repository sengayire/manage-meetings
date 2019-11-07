import React from 'react';
import PropTypes from 'prop-types';
import OnboardingLayout from '../../../containers/OnboardingLayout';
import BuildingsStructurePreview from './BuildingsStructurePreview';
import SetupBuildingsStructure from './SetupBuildingsStructure';

const BuildingsSetup = ({ handleOnClick }) => (
  <div>
    <OnboardingLayout
      layoutRight={<BuildingsStructurePreview />}
      layoutLeft={<SetupBuildingsStructure handleOnClick={handleOnClick} />}
    />
  </div>
);

BuildingsSetup.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default BuildingsSetup;
