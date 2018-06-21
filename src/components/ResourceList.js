import React from 'react';
import Resource from './Resource';
import DeleteResource from './DeleteResource';
import resourcesList from '../fixtures/resources';
import AddResource from './AddResource';
import '../assets/styles/resourcelist.scss';

class ResourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: resourcesList,
      deleteModal: false,
    };
  }

  deleteResource = (resource) => {
    this.setState({
      deleteModal: true,
      toDelete: resource,
    });
  };

  handleCloseModal = () => {
    this.setState({ deleteModal: false });
  };

  render() {
    const { deleteModal, toDelete, resources } = this.state;
    return (
      <div className="settings-resource">
        {deleteModal && (
          <DeleteResource
            openModal={deleteModal}
            toDelete={toDelete}
            handleCloseModal={this.handleCloseModal}
          />
        )}

        <div className="settings-resource-list">
          <AddResource />
          <table>
            <colgroup>
              <col className="first-col" />
              <col />
              <col className="last-col" />
            </colgroup>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Rooms</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <Resource
                  resource={resource}
                  key={resource.name}
                  doDelete={() => this.deleteResource(resource)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ResourceList;
