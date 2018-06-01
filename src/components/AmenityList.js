import React from 'react';
import Amenity from './Amenity';
import '../assets/styles/amenitylist.scss';
import amenitiesList from '../fixtures/amenities';

class AmenityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenities: amenitiesList,
    };
  }
  render() {
    return (
      <div className="settings-amenity">
        <button>Add Amenities</button>
        <div className="settings-amenity-list">
          <table>
            <colgroup>
              <col className="first-col" />
              <col />
              <col className="last-col" />
            </colgroup>
            <thead>
              <tr>
                <th>Amenities</th>
                <th>Rooms</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.amenities.map(amenity => (
                <Amenity amenity={amenity} key={amenity.name} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AmenityList;
