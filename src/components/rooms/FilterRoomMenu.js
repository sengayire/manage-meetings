import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { IconMenu } from 'react-toolbox/lib/menu';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/filterbutton.scss';
import {
  GET_ROOMS_QUERY,
  GET_LOCATIONS_QUERY,
} from '../../graphql/queries/Rooms';
import { GET_ALL_OFFICES } from '../../graphql/queries/Offices';

export class FilterButton extends Component {
  // #region PropTypes
  static propTypes = {
    isResource: PropTypes.func.isRequired,
    isNoResource: PropTypes.func.isRequired,
    handleSetState: PropTypes.func.isRequired,
    handleResetState: PropTypes.func.isRequired,
    isSearching: PropTypes.func.isRequired,
    stopSearching: PropTypes.func.isRequired,
    locations: PropTypes.shape({
      allLocations: PropTypes.array,
    }),
    offices: PropTypes.shape({
      allOffices: PropTypes.object,
    }).isRequired,
    data: PropTypes.shape({
      fetchMore: PropTypes.func.isRequired,
    }).isRequired,
  };
  static defaultProps = {
    locations: {},
  };
  // #endregion

  state = {
    roomCapacity: 0,
    office: '',
    location: '',
    search: '',
  };
  roomCapacity = React.createRef();

  /**
   * This clears the state to default values
   *
   * @returns {void}
   */
  handleClear = () => {
    this.setState(
      {
        roomCapacity: 0,
        office: '',
        location: '',
        search: '',
      },
      () => {
        this.props.isResource();
        this.props.handleResetState();
        this.props.stopSearching();
      },
    );
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data.fetchMore({
      variables: {
        page: 1,
        perPage: 5,
      },
      updateQuery: (prev, { fetchMoreResult }) => ({
        ...fetchMoreResult,
      }),
    });
  };

  /**
   * Handles closing the modal for filtering rooms
   *
   * @returns {void}
   */

  handleClose = () => {
    this.filterButton.click();
  };

  /**
   * Handles updating the state upon detection
   * of changes in the input fields
   *
   * @param {object} event
   * @param {number} capacity
   *
   * @returns {void}
   */

  handleInputChange = (e, capacity = 0) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, roomCapacity: capacity }, () => {
      const { location, office, roomCapacity } = this.state;
      /* istanbul ignore next */
      /* Reasoning: find explicit way of testing configuration options */
      this.props.data
        .fetchMore({
          variables: {
            page: 1,
            perPage: 5,
            capacity: roomCapacity,
            location,
            office,
          },
          updateQuery: (prev, { fetchMoreResult }) => ({ ...fetchMoreResult }),
        })
        .then((result) => {
          if (result.data) {
            this.props.isResource();
            this.props.handleSetState(location, roomCapacity, office);
          }
        })
        .catch(() => {
          this.props.isNoResource();
          this.props.handleResetState();
        });
    });
  };

  /**
   * Handles searching for rooms during filtering
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleSearch = (e) => {
    const { value } = e.target;

    this.setState({ search: value }, () => {
      const { search } = this.state;
      if (search !== '') {
        this.props.isSearching(search);
      }
    });
  };

  render() {
    const {
      roomCapacity, office, location, search,
    } = this.state;
    const { allLocations } = this.props.locations;
    const { allOffices: { offices } = {} } = this.props.offices;
    const selectedOffices =
      offices &&
      offices.filter(
        selectedOffice => selectedOffice.location.name === this.state.location,
      );
    const filterIcon = () => (
      <div
        ref={(filterButton) => {
          this.filterButton = filterButton;
        }}
        className="filterBtn"
      >
        <span>Filter</span>
      </div>
    );
    return (
      <IconMenu className="filter-dropdown" icon={filterIcon()}>
        <div className="filter-search">
          <Input
            id="filterSearch"
            name="search"
            type="text"
            value={search}
            labelName=""
            inputClass="mrm-input filter-search-input"
            placeholder="Search"
            onChange={this.handleSearch}
            required
          />
        </div>
        <div className="other-filters">
          <Select
            labelText="Location"
            isValue
            name="location"
            id="location-filter"
            value={location}
            options={allLocations}
            onChange={this.handleInputChange}
            wrapperClassName="location-wrapper"
            placeholder="Select location"
            selectInputClassName="location-input default-select"
            required
          />
          <Select
            labelText="Office"
            name="office"
            isValue
            id="office-filter"
            value={office}
            options={selectedOffices}
            onChange={this.handleInputChange}
            wrapperClassName="office-wrapper"
            placeholder="Select office"
            selectInputClassName="office-input default-select"
            required
          />
          <Input
            ref={this.roomCapacity}
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
          <button className="footer-btns" onClick={this.handleClear}>
            Clear Filters
          </button>
          <button className="footer-btns close" onClick={this.handleClose}>
            Close
          </button>
        </div>
      </IconMenu>
    );
  }
}
export default compose(
  graphql(GET_ROOMS_QUERY, {
    name: 'data',
    options: () => ({
      variables: {
        page: 1,
        perPage: 5,
        capacity: 0,
        location: '',
        office: '',
      },
    }),
  }),
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
  graphql(GET_ALL_OFFICES, { name: 'offices' }),
)(FilterButton);
