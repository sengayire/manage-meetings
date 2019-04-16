/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { buildingLayout, wingLayout } from '../../fixtures/setupInfoPage';
import { blockIcon, wingsIcon } from '../../utils/images/images';
import ImageLoader from '../commons/ImageLoader';

class SetupLevel extends Component {
  state = {
    carouselPage: true,
  };

  /**
  * it determines which carousel image will be displayed based on the button clicked
  * by setting carousel page in the state to inverse of itself
  */
  handleClick = () => this.setState({ carouselPage: !this.state.carouselPage });

  renderLevelSetup = () => {
    const { carouselPage } = this.state;
    const {
      info, carouselImages, footer, col,
    } = carouselPage ? wingLayout : buildingLayout;
    return (
      <div>
        <div className="message">
          <span className="welcome__message">What are &quot;Levels&quot;?</span>
        </div>
        <p className="setup_info">
          Think of Levels as the parts that make up your Andela center. For instance, {info}
        </p>
        <div className="setup_carousel">
          <div className={carouselPage ? 'setup_carousel_previous disable-nav disabled' : 'setup_carousel_previous'} onClick={this.handleClick} />
          <div className="setup_carousel_box ">
            <div className="setup_carousel_box_image">
              <ImageLoader
                className={carouselPage ? '' : 'illustration_two'}
                source={carouselPage ? wingsIcon : blockIcon}
                altText="carousel_illustration"
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
      </div>
    );
  };

  render() {
    return (
      <div>{this.renderLevelSetup()}</div>
    );
  }
}


export default SetupLevel;
