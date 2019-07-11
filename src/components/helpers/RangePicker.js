import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

/**
 * Component for selecting date range
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export default class PickRange extends React.Component {
  static propTypes = {
    disabledDateRange: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  };
  state = {
    from: '',
    to: '',
  };

  /**
   * Gets the number of days
   *
   * @returns {string}
   */
  getNumberOfDays = () => {
    const { from, to } = this.state;
    const fromDate = moment(from, 'DD/MM/YYYY');
    const toDate = moment(to, 'DD/MM/YYYY');
    const days = toDate.diff(fromDate, 'days');
    if (!days) {
      return `${0} days`;
    }
    if (days === 1) {
      return `${days} day`;
    }
    return `${days} days`;
  };

  /**
   * Changes the range of days when day picker is clicked
   *
   * @param {date} day
   *
   * @returns {void}
   */
  handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    this.props.handleChange(range);
  };


  disableDays = (day) => {
    const { disabledDateRange } = this.props;
    const today = moment().valueOf();
    if (disabledDateRange === 'future') {
      return moment(day).valueOf() > moment(today);
    }
    if (disabledDateRange === 'past') {
      return moment(day).valueOf() < today;
    }
    return false;
  }

  /**
   * Calculates the number of days between
   * the selected start and the end date
   *
   * @param {date} from
   * @param {date} to
   *
   * @returns {JSX}
   */
  calculatedDays = (from, to) => (
    <div className="date_nav">
      <p id="chosen-days">
        {from && to ? (
          <span className="selected_date">
            <span>Selected:</span>
            <span className="selected_single_date">
              {from.toString().slice(4, 15)}
            </span>
            <span>to</span>
            <span className="selected_single_date">
              {to.toString().slice(4, 15)}
            </span>
          </span>
        ) : !from && to ? (
          'Please select a day.'
        ) : (
          'Please select a day.'
        )}
      </p>
    </div>
  );

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="date_di ">
        <div>
          {this.calculatedDays(from, to)}
          <div className="date_nav number_of_days">
            <span>{this.getNumberOfDays()}</span>
          </div>
        </div>
        <DayPicker
          className="Selectable"
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          disabledDays={this.disableDays}
        />
      </div>
    );
  }
}
