/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable  no-unused-expressions */
import React, { createRef } from 'react';
import propTypes from 'prop-types';
import '../../../assets/styles/resources.scss';
import AddResource from './AddResources'; //eslint-disable-line
import AllocatedResources from '../../resources/AllocatedResources';
import Pagination from '../../commons/Pagination';
import Spinner from '../../commons/Spinner';
import {
  getAllRemoteRooms,
  getAllResources,
  getUserDetails,
} from '../../../../src/components/helpers/QueriesHelpers';
import DeleteResource from '../../setup/resources/DeleteResource';
import { EditResource } from '../../setup/resources/EditResource';
import ErrorIcon from '../../commons/ErrorIcon';


class Resources extends React.Component {
  state = {
    resourcesData: {},
    resourceDetails: {},
    remoteRooms: [],
    dataFetched: false,
    isFetching: false,
    currentPage: 1,
    perPage: 5,
    user: {},
    error: false,
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
    const allRemoteRooms = await getAllRemoteRooms();
    const user = await getUserDetails();
    try {
      const resourcesData = await getAllResources(perPage, page);
      if (resourcesData.resources) {
        this.setState(prevState => ({
          user,
          resourcesData: { ...prevState.resourcesData, ...resourcesData },
          remoteRooms: [...allRemoteRooms.rooms],
          currentPage: page,
          isFetching: false,
          dataFetched: true,
          perPage,
        }));
      }
    } catch (e) {
      e.graphQLErrors.map(res => (
        res.message === 'No more resources'
          ? this.setState({
            isFetching: false,
            error: true,
          })
          : ''
      ));
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
   * It updates UI after deleting a resource
   *
   * @returns {}
   */
  handleOnDeleteResource = () => {
    const { currentPage, perPage } = this.state;
    this.getAllResources(perPage, currentPage);
  };

  /**
   * It handles resource list items
   *
   * @returns {jsx}
   */
  resourceList = resource => (
    <div className="resource-list-item" key={resource.id} id={resource.id}>
      <span
        onClick={() => this.handleClickOnResource(resource)}
        className="resource-list-item-text"
      >
        {resource.name}
      </span>
      <span className="resource-list-item-buttons">
        <button>
          <EditResource
            handleOnEditResource={this.handleOnDeleteResource}
            resourceToEdit={resource}
          />
        </button>
        {this.state.user.roles[0].id === '2' && !resource.roomId && (
          <DeleteResource
            resource={resource}
            currentPage={this.state.currentPage}
            perPage={this.state.perPage}
            handleOnDeleteResource={this.handleOnDeleteResource}
          />
        )}
      </span>
    </div>
  );

  render() {
    const {
      resourcesData,
      resourceDetails,
      remoteRooms,
      dataFetched,
      isFetching,
      currentPage,
      perPage,
      error,
    } = this.state;

    if (isFetching) {
      return <Spinner />;
    }

    return (
      <div className="setup-container">
        <div className="resource-box">
          <div className="room-setup-header">
            <p>{this.props.location}&apos;s Resources </p>
          </div>
          {/* Add filters in line below. */}
          <div className="room-select-input resource-picker" />
          <div className="add-new-resource">
            <AddResource
              handleOnAddResource={this.handleOnDeleteResource}
              availableResources={resourcesData}
            />
          </div>
          <div>
            {resourcesData.resources
              ? resourcesData.resources.map(resource => this.resourceList(resource))
              : error ? <ErrorIcon message="No resource found" />
                : ''}
          </div>
          {resourcesData.resources ? (
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
          ) : null}
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

Resources.propTypes = {
  location: propTypes.string.isRequired,
};

export default Resources;
