import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/input.scss';
import chevron from '../../assets/images/chevron.svg';

const Controls = ({
  handleIncrement,
}) => (
  <div className="controls">
    <button className="control up" onClick={handleIncrement} name="up"><img src={chevron} alt="up" name="up" /></button>
    <button className="control down" onClick={handleIncrement} name="down"><img src={chevron} alt="down" name="down" /></button>
  </div>
);
Controls.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};
export default Controls;
