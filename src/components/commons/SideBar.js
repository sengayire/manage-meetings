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
    this.state = { name: 'home' };
  }
  handleClick = ({ target: { name } }) => {
    this.setState({ name });
    this.props.setContent(name);
  }
  render() {
    const { name } = this.state;
    return (
      <div className="sidebar">
        <p className="overview-text">OVERVIEW</p>
        <a
          name="home"
          className={name === 'home' ? 'active' : 'home'}
          href="#home"
          onClick={e => this.handleClick(e)}
        >
          <img src={home} alt="" />
          Home
        </a>
        <a
          name="meetings"
          className={name === 'meetings' ? 'active' : 'meetings'}
          href="#meetings"
          onClick={e => this.handleClick(e)}
        >
          <img src={meetings} alt="" />
          Meetings
        </a>
        <a
          name="insights"
          className={name === 'insights' ? 'active' : 'insights'}
          href="#insights"
          onClick={e => this.handleClick(e)}
        >
          <img src={insights} alt="" />
          Insights
        </a>
        <a
          name="setup"
          className={name === 'setup' ? 'active' : 'setup'}
          href="#setup"
          onClick={e => this.handleClick(e)}
        >
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
