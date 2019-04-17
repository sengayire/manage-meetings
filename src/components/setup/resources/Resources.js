/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef } from 'react';
import '../../../assets/styles/resources.scss';
import AddResource from './AddResources'; //eslint-disable-line
import { editIcon, deleteIcon } from '../../../utils/images/images';
import SelectInput from '../../../components/commons/SelectInput';
import { selectMockData } from '../../../utils/roomSetupMock';
import AllocatedResources from '../../resources/AllocatedResources';
import Pagination from '../../commons/Pagination';
import Spinner from '../../commons/Spinner';
import {
  getAllResources,
  getAllRemoteRooms,
} from '../../../../src/components/helpers/QueriesHelpers';

class Resources extends React.Component {
  state = {
    resourcesData: {},
    resourceDetails: {},
    remoteRooms: [],
    dataFetched: false,
    isFetching: false,
    currentPage: 1,
  };

  componentDidMount() {
    this.getAllResources();
  }

  /**
   * Queries the back-end for a list of resources and rooms;
   * @param {number} perPage - Number of resources to list at a time
   * @param {number} page - Current page being viewed/listed
   *
   * @returns {array}
   */
  getAllResources = async (perPage, page) => {
    this.setState({ isFetching: true });
    const resourcesData = await getAllResources(perPage, page);
    const allRemoteRooms = await getAllRemoteRooms();
    if (resourcesData.resources) {
      this.setState(prevState => ({
        resourcesData: { ...prevState.resourcesData, ...resourcesData },
        remoteRooms: [...allRemoteRooms.rooms],
        currentPage: page,
        isFetching: false,
        dataFetched: true,
        perPage,
      }));
    }
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
    const {
      resourcesData, resourceDetails, remoteRooms, dataFetched, isFetching, currentPage, perPage,
    } = this.state;
    if (isFetching) {
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
          <div>
            {
              resourcesData.resources ?
              resourcesData.resources.map(resource => this.resourceList(resource))
              : null
            }
          </div>
          {
            resourcesData.resources ? (
              <Pagination
                currentPage={currentPage}
                totalPages={resourcesData.pages}
                hasNext={resourcesData.hasNext}
                hasPrevious={resourcesData.hasPrevious}
                handleData={this.getAllResources}
                dataFetched={dataFetched}
                isFetching={isFetching}
                perPage={perPage ? parseInt(perPage, 10) : undefined}
              />
            ) : null
          }
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
