import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import '../../assets/styles/calendar.scss';
import PickRange from '../helpers/RangePicker';

const startingDate = moment().format('MMM DD Y');
const endingDate = moment().format('MMM DD Y');

/**
 * Reusable component for Calendar
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class Calendar extends Component {
  static propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    sendDateData: PropTypes.func.isRequired,
  };

  state = {
    startDate: startingDate,
    endDate: endingDate,
  };

  /**
   * Update the state of start and end dates
   *
   * @param {object} value
   *
   * @returns {void}
   */
  handleChange = (value) => {
    const dateTo = value.to.toString().slice(4, 15);
    const dateFrom = value.from.toString().slice(4, 15);
    if (dateFrom && dateTo) {
      this.setState({ startDate: dateFrom, endDate: dateTo });
    }
  };

  /**
   * Sends the selected dates
   *
   * @returns {void}
   */
  sendDate = () => {
    const { startDate, endDate } = this.state;
    this.props.sendDateData(startDate, endDate);
  };

  /**
   * Cancels the selected date
   *
   * @returns {void}
   */
  cancelDate = () => {
    this.props.handleCloseModal();
  };

  render() {
    return (
      <div className="calender">
        <PickRange handleChange={this.handleChange} />
        <div className="calender__button">
          <span
            onClick={this.cancelDate}
            role="presentation"
            id="cancel_date_button"
            className="calender__button__item"
          >
            {' '}
            Cancel
          </span>
          <button
            type="button"
            onClick={this.sendDate}
            id="apply_date_button"
            className="calender__button__item apply_button"
          >
            {' '}
            Apply{' '}
          </button>
        </div>
      </div>
    );
  }
}

export default Calendar;
