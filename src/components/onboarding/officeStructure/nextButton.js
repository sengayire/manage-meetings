/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';
import Button from '../../commons/Button';

const NextButton = ({ flattenedData }) => {
  const [addLevel, { loading, error }] = useMutation(ADD_LEVEL_SETUP_MUTATION);

  return (
    <div>
      <Button
        title={loading ? 'Submitting..' : 'Next'}
        type={3}
        handleClick={() => addLevel({ variables: { flattenedData } })}
      />
      {error ? <p>ERROR!! TRY AGAIN</p> : ''}
    </div>
  );
};

NextButton.propTypes = {
  flattenedData: PropTypes.array.isRequired,
};

export default NextButton;
