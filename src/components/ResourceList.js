import React from 'react';
import Resource from './Resource';
import AddResource from './AddResource';
import '../assets/styles/resourcelist.scss';
import resourcesList from '../fixtures/resources';

class ResourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: resourcesList,
    };
  }

  render() {
    const { resources } = this.state;
    return (
      <div className="settings-resource">
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
