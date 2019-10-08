import React, { Fragment } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../../assets/styles/inputWithAddIcon.scss';


const SingleInputWithAddIcon = ({
  inputPlaceholder, pressed, name, onTextChange, values, errors,
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
          disabled={!!errors[name]}
        />
          }
      error={!!errors[name]}
      placeholder={inputPlaceholder}
      size="large"
      name={name}
      value={values[name] || ''}
      className="InputWithAddIcon-style"
      onChange={onTextChange}
      onBlur={onTextChange}
    />
    { errors[name] &&
    <Fragment>
      <br />
      <span className="building-error-area-style">
        {errors[name]}
      </span>
    </Fragment>
        }
  </div>
);

export default SingleInputWithAddIcon;

SingleInputWithAddIcon.defaultProps = {
  inputPlaceholder: 'Building',
};
SingleInputWithAddIcon.propTypes = {
  inputPlaceholder: PropTypes.string,
  pressed: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};
