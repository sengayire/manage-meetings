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

  componentDidUpdate() {
    if (this.state.isVisible) {
      this.dropdownMenu.current.focus();
    }
  }

  dropdownMenu = React.createRef();

  /**
   * It toggles the visibility of the Dropdown
   * @param {object} props
   * @returns {void}
   */
  toggleVisibility = (event) => {
    if (event.type === 'blur' && event.relatedTarget !== null
      && event.target.contains(event.relatedTarget)) {
      return;
    }
    event.preventDefault();
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <React.Fragment>
        <div className="dropdown-caret">
          <button onMouseDown={this.toggleVisibility}>
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
            ref={this.dropdownMenu}
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
