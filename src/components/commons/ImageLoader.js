import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/imageLoader.scss';

class ImageLoader extends Component {
  state = {
    loaded: false,
  };

  /**
 * Changes the value of loaded in state
 *
 * @returns {void}
 */
  onLoadHandler = () => {
    this.setState({ loaded: true });
  }

  /**
 * Returns the image loader placeholder
 *
 * @returns {JSX}
 */
  renderLoader = () => (
    <div className="loader">
      <div className="loader_animation" />
    </div>
  );

  render() {
    const { loaded } = this.state;
    const { source, altText, className } = this.props;

    return (
      <div className="image_loader_wrapper">
        {!loaded ? this.renderLoader() : null}
        <img
          className={className}
          src={source}
          alt={altText}
          style={!loaded ? { visibility: 'hidden' } : {}}
          onLoad={this.onLoadHandler}
        />
      </div>
    );
  }
}

ImageLoader.propTypes = {
  source: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ImageLoader.defaultProps = {
  className: '',
};

export default ImageLoader;
