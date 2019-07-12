import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/src/scss/index.scss';
import { SelectInput } from '../commons';

class FilterRoomResponses extends Component {
  state = {
    sliderValue: {
      min: this.props.sliderSpan.minValue,
      max: this.props.sliderSpan.maxValue,
    },
    roomFilter: '',
  }

  componentDidUpdate({ useFilter: useFilterPrev }) {
    const { useFilter, isActive } = this.props;
    if (useFilterPrev && !useFilter) {
      this.resetFields();
    }
    if (!isActive) {
      document.removeEventListener('click', this.handleOutsideClick);
    } else {
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  getInitialSliderValue = () => ({
    min: this.props.sliderSpan.minValue,
    max: this.props.sliderSpan.maxValue,
  })

  modal = React.createRef()

  resetFields = () => {
    this.setState({
      sliderValue: this.getInitialSliderValue(),
      roomFilter: '',
    });
  }

  handleSelectChange = ({ target: { value: roomFilter } }) => {
    this.setState({ roomFilter });
  }

  handleSliderChange = (sliderValue) => {
    this.setState({ sliderValue });
  }

  handleFilter = async () => {
    const { filterData, setRoom } = this.props;
    const { roomFilter } = this.state;
    await setRoom(roomFilter);
    filterData();
  }

  clearFilters = () => {
    const { clearFilters } = this.props;
    this.resetFields();
    clearFilters();
  }

  handleOutsideClick = ({ target }) => {
    if (this.modal && this.modal.contains(target)) return;
    this.props.toggleFilterModal(false);
  }

  render() {
    const {
      setResponseCutoff,
      sliderSpan,
      rooms,
      useFilter,
    } = this.props;

    const { sliderValue, roomFilter } = this.state;
    return (
      <div ref={(node) => { this.modal = node; }}>
        <SelectInput
          wrapperClassName="filter-by-room"
          labelText=""
          name="room-name"
          id="add-room-filter"
          isValue
          dynamicValue={roomFilter}
          options={rooms}
          onChange={this.handleSelectChange}
          placeholder="Select Room Name"
        />
        <div>
          <p>Responses:</p>
          <InputRange
            {...sliderSpan}
            draggableTrack
            onChange={this.handleSliderChange}
            onChangeComplete={value => setResponseCutoff(value)}
            value={sliderValue}
          />
        </div>
        <div className="action-buttons">
          {
            useFilter && (
            <button className="btn-secondary" onClick={this.clearFilters}>
              CLEAR FILTERS
            </button>
            )
          }
          <button className="main-button btn-primary" onClick={this.handleFilter}>
            APPLY
          </button>
        </div>
      </div>
    );
  }
}


FilterRoomResponses.propTypes = {
  useFilter: PropTypes.bool.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  setRoom: PropTypes.func.isRequired,
  sliderSpan: PropTypes.shape({
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
  }).isRequired,
  setResponseCutoff: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFilterModal: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default FilterRoomResponses;
