/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class InsightsDropdown extends Component {
  render() {
    const { setStartDate, date } = this.props;
    const periodOptions = [
      { key: 'lastWeek', value: date.oneWeekAgo, text: 'Last Week' },
      { key: 'lastMonth', value: date.oneMonthAgo, text: 'Last Month' },
      { key: 'lastQuater', value: date.oneQuaterAgo, text: 'Last Quater' },
    ];

    return (
      <div>
        <Dropdown
          onChange={e => setStartDate(e.value)}
          placeholder={periodOptions[0].text}
          options={periodOptions}
        />
      </div>
    );
  }
}

InsightsDropdown.propTypes = {
  setStartDate: PropTypes.func,
  date: PropTypes.instanceOf(PropTypes.object),
};
InsightsDropdown.defaultProps = {
  setStartDate: null,
  date: null,
};

export default InsightsDropdown;
