import React, { Fragment, useState } from 'react';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/analyticsContainer.scss';
// eslint-disable-next-line
import AnalyticsNav from '../components/navbars/AnalyticsNav';

const Analytics = () => {
  const [userLocationChanged, setUserLocationChanged] = useState(false);

  const changeUserLocation = () => {
    setUserLocationChanged(!userLocationChanged);
  };

  return (
    <Fragment >
      <NavBar changeUserLocation={changeUserLocation} />
      <div className="analytics-container">
        <AnalyticsNav userLocationChanged={userLocationChanged} />
      </div>
    </Fragment >
  );
};

export default Analytics;
