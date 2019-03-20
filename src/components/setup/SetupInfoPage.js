/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button';
import { buildingLayout, wingLayout } from '../../fixtures/setupInfoPage';
import { blockIcon, wingsIcon } from '../../utils/images/images';

class SetupInfoPage extends Component {
  state = {
    carouselPage: true,
  };

  /**
   * Checks whether the parameter matches the state and switches it if not.
   *
   * @param e
   * @return {boolean|void}
   */
  handleClick = () => this.setState({ carouselPage: !this.state.carouselPage });

  render() {
    // layout-info-carousel-footer
    const { handleClick } = this.props;
    const { carouselPage } = this.state;
    const {
      info, carouselImages, footer, col,
    } = carouselPage ? wingLayout : buildingLayout;
    return (
      <div className="setup_container">
        <div className="message">
          <h1 className="welcome__message "> Welcome to Room Setup </h1>
          <span className="welcome__message">What are &quot;Levels&quot;?</span>
        </div>
        <p className="setup_info">
          Think of Levels as the parts that make up your Andela center. For instance, {info}
        </p>
        <div className="setup_carousel">
          <div className={carouselPage ? 'setup_carousel_previous disable-nav disabled' : 'setup_carousel_previous'} onClick={this.handleClick} />
          <div className="setup_carousel_box ">
            <div className="setup_carousel_box_image">
              <img
                className={carouselPage ? '' : 'illustration_two'}
                src={carouselPage ? wingsIcon : blockIcon}
                alt="carousel_illustration"
              />
            </div>
            <div className={`${col}`}>
              {carouselImages.map((text, index) => (
                <p key={index.toString()} className="setup_carousel_box_text">
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className={carouselPage ? 'setup_carousel_next' : 'setup_carousel_next disable-nav disabled'} onClick={this.handleClick} id="next" />
          <div
            className={
              carouselPage
                ? 'setup_carousel_navigator first_carousel'
                : 'setup_carousel_navigator second_carousel'
            }
            onClick={this.handleClick}
          />
        </div>
        <div className="setup_footer">
          <p>The Levels in the example above are</p>
          <p>{footer}</p>
        </div>
        <Button
          title="Continue"
          classProp="setup_continue_button"
          handleClick={handleClick('isBuildingLevelVisible')}
        />
      </div>
    );
  }
}

SetupInfoPage.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SetupInfoPage;
