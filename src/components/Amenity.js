import React from 'react';
import PropTypes from 'prop-types';

class Amenity extends React.Component {
  static propTypes = {
    amenity: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rooms: PropTypes.number.isRequired,
    }).isRequired,
  }

  render() {
    const { name, rooms } = this.props.amenity;
    return (
      <tr>
        <td>{name}</td>
        <td>{rooms}</td>
        <td>Edit &emsp; Delete</td>
      </tr>
    );
  }
}

export default Amenity;
