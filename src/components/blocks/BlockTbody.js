import React from 'react';
import PropTypes from 'prop-types';
import SingleBlock from './SingleBlockDetails';

const formatBlockData = block => ({
  id: block.id,
  name: block.name,
  office: block.offices,
  location: block.offices.location.name,
});

const BlockTableBody = props => (
  <div className="table__body">
    {props.blocks &&
      props.blocks.map(block => (
        <SingleBlock block={formatBlockData(block)} key={block.id} refetch={props.refetch} />
      ))}
  </div>
);

BlockTableBody.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  refetch: PropTypes.func,
};

BlockTableBody.defaultProps = {
  refetch: null,
};

export default BlockTableBody;
