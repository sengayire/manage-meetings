import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import '../../assets/styles/sort.scss';

class Sort extends Component {
  state = {
    optionName: null,
  };

  componentWillReceiveProps() {
    // eslint-disable-next-line no-unused-expressions
    this.props.hideDropdownMenu && this.Dropdown.current.toggleVisibility;
  }

  Dropdown = React.createRef();

  /**
   * It toggles the visibility of the options children
   *
   * @param {Object} optionName
   *
   * @returns {void}
   */
  toggleOptions = optionName => () => {
    this.setState({ optionName });
  };

  /**
   * It renders the options to sort by
   *
   * @param {Object} obj
   *
   * @returns {JSX}
   */
  renderObjectOptions = options =>
    Object.keys(options).map(option => (
      // eslint-disable-next-line
      <span
        key={option}
        className={
          this.state.optionName === option
            ? 'filter-options__disable'
            : 'filter-options'
        }
        onClick={this.toggleOptions(option)}
      >
        {option}
        {this.state.optionName === option && (
          <div className="filter-options__children">
            {this.renderOptionsChildren(options[option], option)}
          </div>
        )}
      </span>
    ));

  /**
   * It renders the options children
   *
   * @param {Object} subOptions
   * @param {string} optionName
   *
   * @returns {JSX}
   */
  renderOptionsChildren = (subOptions, optionName) => (
    <React.Fragment>
      {subOptions.map(option => (
        // eslint-disable-next-line
        <span
          key={option.id}
          className="filter-options__children-list"
          onClick={this.props.fetchSortedData(optionName, option.id)}
        >
          {option[Object.keys(option)[1]]}
        </span>
      ))}
    </React.Fragment>
  );

  /**
   * It renders the sort options which is an array
   *
   * @param {array} options
   *
   * @returns {JSX}
   */
  renderArrayOptions = () => <div />; // eslint-disable-line

  render() {
    const { sortOptions, withChildren } = this.props;
    return (
      <div className="filter-options-container">
        <div className="container-inner">
          <span>Sort by:</span>
          <Dropdown
            icon="&#x21F5;"
            content={
              withChildren
                ? this.renderObjectOptions(sortOptions)
                : this.renderArrayOptions(sortOptions)
            }
            ref={this.Dropdown}
          />
        </div>
      </div>
    );
  }
}

Sort.propTypes = {
  sortOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  withChildren: PropTypes.bool,
  fetchSortedData: PropTypes.func.isRequired,
  hideDropdownMenu: PropTypes.bool,
};

Sort.defaultProps = {
  withChildren: false,
  hideDropdownMenu: false,
};

export default Sort;
