import React from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import InputsWithAddIcon from '../../commons/InputAddIcon';
import InputWithNumbers from '../../commons/InputWithNumber';
import '../../../assets/styles/setupRoomsStructure.scss';
import InputField from '../../commons/InputField';
import Button from '../../commons/Button';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';
import { getUserLocation } from '../../helpers/QueriesHelpers';

const SetupBuildingsStructure = () => {
  const [addBuildings,
    {
      data,
      loading: mutationLoading,
      error: mutationError,
    }] = useMutation(ADD_LEVEL_SETUP_MUTATION);
  const input = React.createRef();
  const buildings = React.createRef();
  const inputWithNumbers = React.createRef();
  const handleSubmit = async () => {
    const { state: inputFieldState, handleTextChange } = input.current;
    const { inputValue } = inputFieldState;
    const { handleTextChange: buildingsInputFn } = buildings.current;
    const { values: buildingsName } = buildings.current.state;

    let currentTarget = {
      name: 'center_name',
      value: inputValue,
    };
    await handleTextChange({ currentTarget });

    if (input.current.state.errors.center_name) {
      return;
    }
    const errors = {};
    const mutatingData = [];
    const { id: userLocationId } = getUserLocation();
    await _.map(buildingsName, async (value, key) => {
      currentTarget = {
        name: key,
        value,
      };
      await buildingsInputFn({ currentTarget });

      const error = buildings.current.state.errors[key];
      if (error) {
        errors[key] = error;
      } else {
        mutatingData.push({
          structureId: uuid(),
          level: 1,
          name: value,
          tag: 'buildings',
          locationId: parseInt(userLocationId, 10),
          position: mutatingData.length,
        });
      }
    });
    if (!_.isEmpty(errors)) {
      return;
    }

    const flattenedData = [...mutatingData];
    await addBuildings({ variables: { flattenedData } });

    // call mutation
  };

  const updateInput = (newValue) => {
    const { onAddInput } = buildings.current;
    onAddInput(newValue, newValue);
  };
  return (
    <div className="setup-rooms-structure-container">
      <h1 className="setup-rooms-structure-header">
        Awesome, You&apos;re In <span role="img" aria-label="thums-up">👍🏾</span>
      </h1>
      <p className="setup-rooms-structure-subheader">
        Let&apos;s setup the meeting rooms within your location
      </p>
      <p className="location-input-label">
        What&apos;s the name of your Andela Center
      </p>
      <InputField ref={input} />
      <p className="buildings-input-label">
        How many buildings are in your center?
      </p>
      <InputWithNumbers ref={inputWithNumbers} updateOuterInputs={updateInput} />
      <p className="buildings-names-input-label">
        Name your buildings
      </p>
      <InputsWithAddIcon ref={buildings} />
      <Button
        title={mutationLoading ? 'wait...' : 'Next'}
        type={3}
        handleClick={handleSubmit}
        isDisabled={mutationLoading}
        className="button"
      />
      {mutationError && <p className="error">Error :) try Again</p>}
      {data && <Redirect to="/setup" />} {/* go to the next page */}
    </div>
  );
};

export default SetupBuildingsStructure;

