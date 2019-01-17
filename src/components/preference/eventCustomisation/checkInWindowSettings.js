import React, { Fragment, Component } from 'react';
import { IconMenu } from 'react-toolbox/lib/menu';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import '../../../assets/styles/checkInWindowSettings.scss';

/**
 * Component for Check-In Window Settings
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
class CheckInWindowSettings extends Component {
  state = {
    value: '10',
  };

  /**
   * Changes the state to current value
   *
   * @param {number} value
   *
   * @returns {void}
   */
  handleChange = (value) => {
    this.setState({ value });
  };

  /**
   * Shows an icon for time-picker
   *
   * @returns {JSX}
   */
  timePickerIcon = () => (
    <div className="time-picker">
      <span>{this.state.value} minutes</span>
    </div>
  );

  render() {
    return (
      <Fragment>
        <h1>Event Customizations</h1>
        <div className="notification-container">
          <section className="check-in">
            <h2 className="notification-title">Checkin Window</h2>
            <p>Time before you can check into a meeting</p>
          </section>
          <section className="checkin-time">
            <IconMenu
              icon={this.timePickerIcon()}
              className="time-picker-dropdown"
            >
              <RadioGroup
                value={this.state.value}
                onChange={this.handleChange}
                className="radio-wrapper"
              >
                <RadioButton value="2" label="2 mins" />
                <RadioButton value="5" label="5 mins" />
                <RadioButton value="10" label="10 mins" />
                <RadioButton value="15" label="15 mins" />
              </RadioGroup>
            </IconMenu>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default CheckInWindowSettings;
