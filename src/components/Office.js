import React from 'react';
import PropTypes from 'prop-types';


class Office extends React.Component {
  render() {
    const { name, location, timezone } = this.props.office;
    return (
      <tr>
        <td>{name}</td>
        <td>{location}</td>
        <td>{timezone}</td>
        <td>Edit &emsp; Delete</td>
      </tr>
    );
  }
}

Office.propTypes = {
  office: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }),
};

export default Office;
