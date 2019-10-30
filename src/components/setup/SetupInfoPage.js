import React, { useState } from 'react';
import Button from '../commons/Button';
import SetupLevel from './SetupLevel';
import BuildingLevel from './BuildingLevel';

const SetupInfoPage = () => {
  const [clicked, setCliked] = useState();
  const handleClick = () => {
    setCliked({ clicked: true });
  };

  return clicked ? <BuildingLevel /> : (
    <div className="setup_container">
      <div className="message">
        <h1 className="setup"> Setup</h1>
        <p className="configure-andela-cen">Configure Andela centres</p>
      </div>
      <div className="setup_container_center">
        <SetupLevel />
        <Button
          title="Get Started"
          classProp="setup_continue_button"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};


export default SetupInfoPage;
