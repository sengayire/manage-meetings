import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import '../../assets/styles/carousel.scss';
import safariMeetingRoom from '../../assets/images/SafariMeetingRoom.png';
import cognitio from '../../assets/images/cognitio.jpg';
import entebbe from '../../assets/images/entebbe.png';
import banku from '../../assets/images/banku.jpg';

class CustomCarousel extends Component {
  state = {
    interval: 3000,
    position: 0,
    rooms: [
      {
        legend: 'Safari Meeting Room, Andela New York',
        img: safariMeetingRoom,
      },
      {
        legend: 'Cognitio Meeting Room, Andela Lagos',
        img: cognitio,
      },
      {
        legend: 'Entebbe Meeting Room, Andela Kampala',
        img: entebbe,
      },
      {
        legend: 'Banku Meeting Room, Andela Lagos',
        img: banku,
      },
    ],
  }
  componentDidUpdate() {
    const { legendPosition } = this.props;
    const controlDots = document.querySelector('.control-dots');
    if (legendPosition === 'legend-left') controlDots.classList.add('control-dots-left');
    else controlDots.classList.remove('control-dots-left');
  }

  onImageChange = (imgPosition) => {
    const { position, rooms } = this.state;
    if (position === 0) {
      this.setState({ interval: 4000 });
    } else if (position === 1) {
      this.setState({ interval: 3000 });
    }

    if (position < rooms.length) {
      this.setState({ position: imgPosition });
    } else {
      this.setState({ position: 0 });
    }
  }

  render() {
    const { legendPosition, autoplay } = this.props;
    const { rooms, position, interval } = this.state;
    return (
      <Carousel
        autoPlay={autoplay}
        infiniteLoop
        stopOnHover={false}
        showArrows={false}
        showStatus={false}
        interval={interval}
        transitionTime={2000}
        selectedItem={position}
        onChange={imgPosition => this.onImageChange(imgPosition)}
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
  autoplay: PropTypes.bool,
};

CustomCarousel.defaultProps = {
  legendPosition: 'center',
  autoplay: true,
};

export default CustomCarousel;
