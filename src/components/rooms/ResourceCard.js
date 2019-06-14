import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from '../commons/SVGs';
import '../../assets/styles/resourceCard.scss';

const ResourceCard = ({ resources, toggleView }) => (
  <div className="resource-card">
    <div className="resource-card__header">
      <h2>
        <button
          className="btn-plain"
          onClick={() => toggleView()}
        >
          <BackArrow />
        </button>
        <span>&nbsp;Resources</span>
      </h2>
    </div>
    <div className="list-container">
      <div className="list">
        {
          resources.map(({ name, resourceId /* quantity */}) => (
            <div key={resourceId}className="details list-item">
              <p>{name}</p>
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

ResourceCard.propTypes = {
  toggleView: PropTypes.func.isRequired,
  resources: PropTypes.instanceOf(Array).isRequired,
};

export default ResourceCard;
