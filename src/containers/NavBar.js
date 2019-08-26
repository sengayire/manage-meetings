import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopNav from '../components/navbars/TopNav';
import TopMenu from '../components/navbars/TopMenu';
import { getUserDetails } from '../components/helpers/QueriesHelpers';


class NavBar extends Component {
  state = {
    userRole: '',
  };
  async componentDidMount() {
    await this.setUserRole();
  }

  setUserRole = async () => {
    const user = await getUserDetails();
    const {
      roles: [userRole],
    } = user;
    const { role } = userRole;
    this.setState({ ...this.state, userRole: role });
  };

  render() {
    return (
      <Fragment>
        <TopMenu changeUserLocation={this.props.changeUserLocation} />
        <TopNav userRole={this.state.userRole} />
      </Fragment>
    );
  }
}

NavBar.propTypes = {
  changeUserLocation: PropTypes.func,
};

NavBar.defaultProps = {
  changeUserLocation: PropTypes.func,
};

export default NavBar;

