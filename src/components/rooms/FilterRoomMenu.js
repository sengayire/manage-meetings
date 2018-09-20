import React, { Component } from 'react';
import { IconMenu } from 'react-toolbox/lib/menu';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/filterbutton.scss';

class FilterButton extends Component {
  state = {
    roomCapacity: 0,
    officeList: [],
    office: '',
    location: '',
    locationList: [],
  };
  handleInputChange = (e) => {
    e.preventDefault();
    // logic goes here
  };
  render() {
    const {
      roomCapacity, officeList, office, location, locationList,
    } = this.state;
    const filterIcon = () => (
      <div className="filterBtn">
        <span>Filter</span>
      </div>
    );
    return (
      <IconMenu
        className="filter-dropdown"
        icon={filterIcon()}
      >
        <div className="filter-search">
          <Input
            id="filterSearch"
            name="filterSearch"
            type="text"
            value=""
            labelName=""
            inputClass="mrm-input filter-search-input"
            placeholder="Search"
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="other-filters">
          <Select
            labelText="Location"
            name="locationFilter"
            id="location-filter"
            value={location}
            options={locationList}
            onChange={this.handleInputChange}
            wrapperClassName="location-wrapper"
            placeholder="Select location"
            selectInputClassName="location-input default-select"
            required
          />
          <Select
            labelText="Office"
            name="OfficeFilter"
            id="office-filter"
            value={office}
            options={officeList}
            onChange={this.handleInputChange}
            wrapperClassName="office-wrapper"
            placeholder="Select office"
            selectInputClassName="office-input default-select"
            required
          />
          <Input
            id="roomCapacity"
            name="roomCapacity"
            type="number"
            labelClass="capacity-label"
            inputClass="mrm-input"
            placeholder="0"
            title="Please add numbers only"
            value={roomCapacity}
            labelName="Room Capacity"
            controlsClass="filter-controls"
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="filter-footer">
          <button className="footer-btns" onClick={this.handleClear} >Clear Filters</button>
          <button className="footer-btns close" onClick={this.handleClose} >Close</button>
        </div>
      </IconMenu>
    );
  }
}
export default FilterButton;
