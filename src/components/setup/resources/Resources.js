/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef } from 'react';
import '../../../assets/styles/resources.scss';
import AddResource from './AddResources'; //eslint-disable-line
import { editIcon, deleteIcon } from '../../../utils/images/images';
import SelectInput from '../../../components/commons/SelectInput';
import { selectMockData } from '../../../utils/roomSetupMock';
import resources from '../../../fixtures/resourcesList';
import AllocatedResources from '../../resources/AllocatedResources';
import resourcesData from '../../../../src/fixtures/resourcesData';

class Resources extends React.Component {
  handleInputChange = () => {};

  AllocatedResourcesComponent = createRef();

  handleClickOnResource = () => {
    this.AllocatedResourcesComponent.current.toggleModal();
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
      onClick={this.handleClickOnResource}
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
        <AllocatedResources ref={this.AllocatedResourcesComponent} resourcesData={resourcesData} />
      </div>
    );
  }
}

export default Resources;
