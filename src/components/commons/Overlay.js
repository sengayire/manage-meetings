import React from 'react';
import propTypes from 'prop-types';
import Spinner from './Spinner';
import '../../assets/styles/paginationOverlay.scss';

const Overlay = ({ id }) => (
  <div>
    <div id={id} className="overlay" />
    <div className="Pagination-spinner">
      <Spinner />
    </div>
  </div>
);

Overlay.propTypes = {
  id: propTypes.string,
};

Overlay.defaultProps = {
  id: '',
};
export default Overlay;
