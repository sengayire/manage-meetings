/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import Block from './BlockActions';

const SingleBlockDetails = (props) => {
  const { name, office, location } = props.block;
  return (
    <div className="table__row">
      <span>{name}</span>
      <span>{location}</span>
      <span>{office.name}</span>
      <span>
        <Block office={office} block={props.block} editing /> &nbsp;
        <Block block={props.block} office={office} refetch={props.refetch} deleting /> &nbsp;
      </span>
    </div>
  );
};

SingleBlockDetails.propTypes = {
  block: PropTypes.shape({
    name: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      location: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
  refetch: PropTypes.func,
};

SingleBlockDetails.defaultProps = {
  refetch: null,
};

export default SingleBlockDetails;
