import React from 'react';
import Resource from './Resource';
import AddResource from './AddResource';
import '../assets/styles/resourcelist.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
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
            <ColGroup numberOfMiddleColumns={1} />
            <TableHead titles={['Resource', 'Rooms', 'Action']} />
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
