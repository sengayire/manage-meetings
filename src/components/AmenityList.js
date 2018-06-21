import React from 'react';
import Amenity from './Amenity';
import DeleteResource from './DeleteResource';
import AddResource from './AddResource';
import '../assets/styles/amenitylist.scss';
import amenitiesList from '../fixtures/amenities';

class AmenityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenities: amenitiesList,
      deleteModal: false,
    };
  }

  deleteResource = (amenity) => {
    this.setState({
      deleteModal: true,
      toDelete: amenity,
    });
  };

  handleCloseModal = () => {
    this.setState({ deleteModal: false });
  }

  render() {
    const { deleteModal, toDelete, amenities } = this.state;
    return (
      <div className="settings-amenity">
        {deleteModal && (<DeleteResource
          openModal={deleteModal}
          toDelete={toDelete}
          handleCloseModal={this.handleCloseModal}
        />)}
        <AddResource />
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
              {amenities.map(amenity => (
                <Amenity
                  amenity={amenity}
                  key={amenity.name}
                  doDelete={() => this.deleteResource(amenity)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AmenityList;
