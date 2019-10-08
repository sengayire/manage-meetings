import React from 'react';
import OnboardingLayout from '../../../containers/OnboardingLayout';
import BuildingsStructurePreview from './BuildingsStructurePreview';
import SetupBuildingsStructure from './SetupBuildingsStructure';
import NavBar from '../../../containers/NavBar';

const BuildingsSetup = () => (
  <div>
    <NavBar />
    <OnboardingLayout
      layoutRight={<BuildingsStructurePreview />}
      layoutLeft={<SetupBuildingsStructure />}
    />
  </div>
);

export default BuildingsSetup;
