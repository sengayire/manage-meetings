import React, { Component } from 'react';
import propTypes from 'prop-types';
import home from '../../assets/images/Home_active (2).svg';
import meetings from '../../assets/images/Meetings_inactive.svg';
import insights from '../../assets/images/Insights_inactive.svg';
import setup from '../../assets/images/Setup_inactive.svg';
import device from '../../assets/images/Tablet_inactive.svg';
import resources from '../../assets/images/Resources_inactive.svg';
import people from '../../assets/images/People_inactive.svg';
import rooms from '../../assets/images/Rooms_inactive.svg';
import '../../assets/styles/sidebar.scss';

// eslint-disable-next-line react/prefer-stateless-function
class SideBar extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sidebar">
        <p className="overview-text">OVERVIEW</p>

        <a
          className="active"
          href="#home"
          onClick={() => this.props.setContent('home')}
        >
          <img src={home} alt="" />
          Home
        </a>
        <a href="#meetings" onClick={() => this.props.setContent('meeting')}>
          <img src={meetings} alt="" />
          Meetings
        </a>
        <a href="#insights" onClick={() => this.props.setContent('insights')}>
          <img src={insights} alt="" />
          Insights
        </a>
        <a href="#setup" onClick={() => this.props.setContent('setup')}>
          <img src={setup} alt="" />
          Setup
        </a>
        <p className="overview-text">MANAGE</p>
        <a href="#devices" onClick={() => this.props.setContent('devices')}>
          <img src={device} alt="" />
          devices
        </a>
        <a href="#resources" onClick={() => this.props.setContent('resources')}>
          <img src={resources} alt="" />
          Resources
        </a>
        <a href="#people" onClick={() => this.props.setContent('people')}>
          <img src={people} alt="" />
          People
        </a>
        <a href="#rooms" onClick={() => this.props.setContent('rooms')}>
          <img src={rooms} alt="" />
          Rooms
        </a>
      </div>
    );
  }
}
SideBar.propTypes = {
  setContent: propTypes.func.isRequired,
};

export default SideBar;
