import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/dropdown.scss';

/**
 * Builds reusable component for Dropdowns
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class Dropdown extends React.Component {
  state = {
    isVisible: false,
  };

  /**
   * It toggles the visibility of the Dropdown
   *
   * @returns {void}
   */
  toggleVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <React.Fragment>
        <div className="dropdown-caret">
          <button onClick={this.toggleVisibility}>
            {this.props.icon ? this.props.icon : <span> &#x2304; </span>}
          </button>
        </div>
        {this.state.isVisible && (
          <div
            id="dropdown-menu"
            className="dropdown-menu"
            role="button"
            onBlur={this.toggleVisibility}
            tabIndex={0}
          >
            {this.props.content}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = {
  icon: PropTypes.any, // eslint-disable-line
  content: PropTypes.node.isRequired,
};

export default Dropdown;
