/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/officeStructure.scss';

const setClassName = (block, activeBlock) => {
  const className = `office-structure-block ${
    block === activeBlock
      ? 'office-structure-block active-block'
      : 'office-structure-block'
  }`;
  return className;
};
const BuildingCard = ({ blocks, activeBlock, toggleBlock }) => (
  <div className="office-structure-container">
    {blocks.map(block => (
      <button
        className={setClassName(block.name, activeBlock)}
        onClick={() => toggleBlock(block.name)}
      >
        {block.name}
      </button>
    ))}
  </div>
);

BuildingCard.propTypes = {
  blocks: PropTypes.array,
  activeBlock: PropTypes.string,
  toggleBlock: PropTypes.func.isRequired,
};

BuildingCard.defaultProps = {
  blocks: [],
  activeBlock: '',
};

export default BuildingCard;
