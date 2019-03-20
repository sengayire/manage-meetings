import React from 'react';
import '../../../assets/styles/resources.scss';
import AddResource from './AddResources'; //eslint-disable-line
import { editIcon, deleteIcon } from '../../../utils/images/images';
import SelectInput from '../../../components/commons/SelectInput';
import { selectMockData } from '../../../utils/roomSetupMock';
import resources from '../../../fixtures/resourcesList';

class Resources extends React.Component {
  handleInputChange = () => {};
  /**
  * It handles resource list items
  *
  * @returns {jsx}
  */
  resourceList = resource => (
    <div className="resource-list-item" key={resource.id}>
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
    const selectInputs = selectMockData && selectMockData.map(({
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
  }

  render() {
    return (
      <div className="resource-box">
        <div className="room-setup-header"><p>EPIC Tower&apos;s Resources </p></div>
        <div className="room-select-input">
          {this.createSelectInputs()}
        </div>
        <div className="add-new-resource">
          <AddResource />
        </div>
        <div>
          {resources.map(resource => this.resourceList(resource))}
        </div>
      </div>
    );
  }
}

export default Resources;
