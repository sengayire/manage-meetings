/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';
import Button from '../../commons/Button';

const NextButton = ({ flattenedData, handleOnClick }) => {
  const [addLevel, {
    loading, error, data,
  }] = useMutation(
    ADD_LEVEL_SETUP_MUTATION, {
      update(cache, { data: { addLevels } }) {
        const { allStructures } = cache.readQuery({ query: GET_ALL_LEVELS });
        cache.writeQuery({
          query: GET_ALL_LEVELS,
          data: { allStructures: allStructures.push(addLevels) },
        });
      },
    },
  );

  return (
    <div>
      <Button
        title={loading ? 'Submitting..' : 'Next'}
        type={3}
        handleClick={() => addLevel({ variables: { flattenedData } })}
      />
      {error ? <p>ERROR!! TRY AGAIN</p> : ''}
      {data && handleOnClick('addRooms')}
    </div>
  );
};

NextButton.propTypes = {
  flattenedData: PropTypes.array.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default NextButton;
