import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import Button from '../commons/Button';
import PickRange from '../helpers/RangePicker';

// styles
import '../../assets/styles/calendar.scss';

moment.suppressDeprecationWarnings = true;

/**
 * Reusable component for Calendar
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class Calendar extends Component {
  static propTypes = {
    sendData: PropTypes.func,
    classProp: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    disabledDateRange: PropTypes.string,
  };

  static defaultProps = {
    sendData: null,
    classProp: '',
    startDate: '',
    endDate: '',
    disabledDateRange: '',
  };

  state = {
    isCalendarOpen: false,
    startDate: this.props.startDate || moment().format('MMM DD Y'),
    endDate: this.props.endDate || moment().format('MMM DD Y'),
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
    this.setState({ startDate: dateFrom, endDate: dateTo || dateFrom });
  };

  /**
   * Sends the selected dates
   *
   * @returns {void}
   */
  sendDate = () => {
    const { startDate, endDate } = this.state;
    this.props.sendData(startDate, endDate);
    this.toggleCalendar();
  };

  /**
   * It toggles the calendar view
   *
   * @returns {void}
   */
  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  render() {
    const { isCalendarOpen, startDate, endDate } = this.state;
    const { disabledDateRange } = this.props;
    return (
      <Fragment>
        <Button
          title={`${startDate} - ${endDate}`}
          classProp={`calendarIcon ${this.props.classProp}`}
          type={2}
          handleClick={this.toggleCalendar}
        />
        {isCalendarOpen && (
          <div className="calendar">
            <PickRange handleChange={this.handleChange} disabledDateRange={disabledDateRange} />
            <div className="calendar__button">
              <button
                onClick={this.toggleCalendar}
                className="calendar__button__item cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => this.sendDate()}
                className="calendar__button__item apply_button"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Calendar;
