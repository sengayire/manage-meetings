import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from '../commons/SVGs';
import '../../assets/styles/resourceCard.scss';

const EntityCard = ({ entityName, entity, toggleEntity }) => (
  <div className="resource-card">
    <div className="resource-card__header">
      <h2>
        <button
          className="btn-plain"
          onClick={() => toggleEntity()}
        >
          <BackArrow />
        </button>
        <span>&nbsp;{entityName}</span>
      </h2>
    </div>
    <div className="list-container">
      <div className="list">
        { entity.map(({ name, id, resourceId /* quantity */}) => (
          <div key={id || resourceId}className="details list-item">
            <p>{name}</p>
          </div>
    ))}
      </div>
    </div>
  </div>
);

EntityCard.propTypes = {
  toggleEntity: PropTypes.func.isRequired,
  entity: PropTypes.instanceOf(Array).isRequired,
  entityName: PropTypes.string.isRequired,
};

export default EntityCard;
