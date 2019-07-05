import React, { Component, Fragment } from 'react';
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
        <TopMenu />
        <TopNav userRole={this.state.userRole} />
      </Fragment>
    );
  }
}

export default NavBar;

