import React from 'react';
import PropTypes from 'prop-types';
import { OnboardingLayout } from '../../../containers';
import * as styled from './customStyles';
import { InputResources, AddResourcesTitle, AddRooms } from './';
import InputWithNumbers from '../../../components/commons/InputWithNumber';


const AddResources = ({ handleOnClick }) => {
  const layoutLeft = (
    <div>
      <AddResourcesTitle />
      <AddRooms />
      <div>
        <styled.TextParagraphTwo>
          What is the seating capacity for Cognitio?
        </styled.TextParagraphTwo>
        <InputWithNumbers />
        <InputResources handleOnClick={handleOnClick} />
      </div>
    </div>
  );

  const layoutRight = (
    <div>
      <span>This part will be use to fetch data from the backend</span>
    </div>
  );

  return (
    <div>
      <OnboardingLayout layoutLeft={layoutLeft} layoutRight={layoutRight} />
    </div>
  );
};

AddResources.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};


export default AddResources;
