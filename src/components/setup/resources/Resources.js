/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef } from 'react';
import '../../../assets/styles/resources.scss';
import AddResource from './AddResources'; //eslint-disable-line
import { editIcon, deleteIcon } from '../../../utils/images/images';
import SelectInput from '../../../components/commons/SelectInput';
import { selectMockData } from '../../../utils/roomSetupMock';
import AllocatedResources from '../../resources/AllocatedResources';
import Spinner from '../../commons/Spinner';
import {
  getAllResources,
  getAllRemoteRooms,
} from '../../../../src/components/helpers/QueriesHelpers';

class Resources extends React.Component {
  state = {
    resources: [],
    resourceDetails: {},
    remoteRooms: [],
  };

  componentDidMount() {
    this.getAllResources();
  }

  /**
   * Queries the back-end for a list of resources and rooms;
   * @params {null}
   *
   * @returns {array}
   */
  getAllResources = async () => {
    const allResources = await getAllResources();
    const allRemoteRooms = await getAllRemoteRooms();
    const { resources, remoteRooms } = this.state;
    let resourcesList = Object.assign({}, resources);
    resourcesList = allResources.resources;
    let remoteRoomsList = Object.assign({}, remoteRooms);
    remoteRoomsList = allRemoteRooms.rooms;
    this.setState({
      resources: resourcesList,
      remoteRooms: remoteRoomsList,
    });
  };

  AllocatedResourcesComponent = createRef();

  handleClickOnResource = (resource) => {
    this.AllocatedResourcesComponent.current.toggleModal();
    this.setState({
      resourceDetails: resource,
    });
  };

  /**
   * It handles resource list items
   *
   * @returns {jsx}
   */
  resourceList = resource => (
    <div
      className="resource-list-item"
      key={resource.id}
      id={resource.id}
      onClick={() => this.handleClickOnResource(resource)}
    >
      <span className="resource-list-item-text">{resource.name}</span>
      <span className="resource-list-item-buttons">
        <button>
          <img src={editIcon} alt="edit" />
        </button>
        <button>
          <img src={deleteIcon} alt="delete" />
        </button>
      </span>
    </div>
  );

  /**
   * It handles creating of select input
   *
   * @returns {jsx}
   */
  createSelectInputs = () => {
    const selectInputs =
      selectMockData &&
      selectMockData.map(({
        name, id, value, placeholder,
      }) => (
        <div key={id} className="room-select-sub">
          <SelectInput
            labelText=""
            wrapperClassName="setup-select-input-wrapper"
            name={name}
            id={id}
            value={value}
            onChange={this.handleInputChange}
            selectInputClassName="setup-select-input"
            placeholder={placeholder}
            options={null}
          />
        </div>
      ));
    return selectInputs;
  };

  render() {
    const { resources, resourceDetails, remoteRooms } = this.state;
    if (resources.length === 0) {
      return <Spinner />;
    }
    return (
      <div className="setup-container">
        <div className="resource-box">
          <div className="room-setup-header">
            <p>EPIC Tower&apos;s Resources </p>
          </div>
          <div className="room-select-input resource-picker">{this.createSelectInputs()}</div>
          <div className="add-new-resource">
            <AddResource />
          </div>
          <div>{resources.map(resource => this.resourceList(resource))}</div>
        </div>
        <AllocatedResources
          ref={this.AllocatedResourcesComponent}
          remoteRooms={remoteRooms}
          resourceDetails={resourceDetails}
        />
      </div>
    );
  }
}

export default Resources;
