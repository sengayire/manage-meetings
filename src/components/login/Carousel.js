import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import '../../assets/styles/carousel.scss';
import empireStateLOS from '../../assets/images/empire-state-los.jpg';
import wallStreet from '../../assets/images/wall-street.jpg';
import cognitio from '../../assets/images/cognitio.jpg';
import aso from '../../assets/images/aso.jpg';
import banku from '../../assets/images/banku.jpg';
import obudu from '../../assets/images/obudu.jpg';
import ubuntu from '../../assets/images/ubuntu.jpg';
import idanre from '../../assets/images/idanre.jpg';
import charley from '../../assets/images/charley.jpg';

class CustomCarousel extends Component {
  state = {
    rooms: [
      {
        legend: 'Empire State - LOS',
        img: empireStateLOS,
      },
      {
        legend: 'Wall Street',
        img: wallStreet,
      },
      {
        legend: 'Cognitio',
        img: cognitio,
      },
      {
        legend: 'Aso',
        img: aso,
      },
      {
        legend: 'Banku',
        img: banku,
      },
      {
        legend: 'Obutu',
        img: obudu,
      },
      {
        legend: 'Ubuntu',
        img: ubuntu,
      },
      {
        legend: 'Idanre',
        img: idanre,
      },
      {
        legend: 'Charley',
        img: charley,
      },
    ],
  }
  componentDidUpdate() {
    const { legendPosition } = this.props;
    const controlDots = document.querySelector('.control-dots');
    if (legendPosition === 'legend-left') controlDots.classList.add('control-dots-left');
    else controlDots.classList.remove('control-dots-left');
  }

  render() {
    const { legendPosition } = this.props;
    const { rooms } = this.state;
    return (
      <Carousel
        autoPlay
        infiniteLoop
        stopOnHover={false}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
      >
        {rooms.map(({ legend, img }) => (
          <div key={legend}>
            <p className={`legend ${legendPosition}`}>{legend}</p>
            <img src={img} alt={legend} />
          </div>
        ))}
      </Carousel>
    );
  }
}

CustomCarousel.propTypes = {
  legendPosition: PropTypes.string,
};

CustomCarousel.defaultProps = {
  legendPosition: 'center',
};

export default CustomCarousel;
