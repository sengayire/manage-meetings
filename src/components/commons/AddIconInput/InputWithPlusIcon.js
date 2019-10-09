
import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../../assets/styles/inputWithAddIcon.scss';

const SingleInputWithAddIcon = ({
  inputPlaceholder, pressed, onInputChange, id,
}) => (
  <div className="InputWithAddIcon-container">
    <Input
      icon={
        <Icon
          name="plus circle"
          color="green"
          link
          size="large"
          onClick={() => pressed()}
          className="plus-icon"
        />
      }
      // value="club going crazy"
      id={id}
      onChange={onInputChange}
      placeholder={inputPlaceholder}
      size="large"
      className="InputWithAddIcon-style"
    />
  </div>
);

SingleInputWithAddIcon.defaultProps = {
  inputPlaceholder: 'Building',
};
SingleInputWithAddIcon.propTypes = {
  inputPlaceholder: PropTypes.string,
  pressed: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SingleInputWithAddIcon;
