import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filterYellowIcon } from '../../utils/images/images';

class FilterResponseButton extends Component {
  state = {

  }
  render() {
    const { toggleFilterModal } = this.props;
    return (
      <div>
        <button
          className="btn-secondary response-filter-button"
          onClick={toggleFilterModal}
        >
          <div>
            <img
              src={filterYellowIcon}
              alt="Filter"
            />
            <span>Filter</span>
          </div>
        </button>
      </div>
    );
  }
}

FilterResponseButton.propTypes = {
  toggleFilterModal: PropTypes.func.isRequired,
};

export default FilterResponseButton;
