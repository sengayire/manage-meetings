import React, { Fragment, useState } from 'react';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/analyticsContainer.scss';
// eslint-disable-next-line
import AnalyticsNav from '../components/navbars/AnalyticsNav';

const Analytics = () => {
  const [locationChanged, setLocationChanged] = useState(false);

  const resetLocation = () => {
    setLocationChanged(true);
  };

  return (
    <Fragment>
      <NavBar resetLocation={resetLocation} />
      <div className="analytics-container">
        <AnalyticsNav
          resetLocation={() => setLocationChanged(false)}
          locationChanged={locationChanged}
        />
      </div>
    </Fragment>
  );
};

export default Analytics;
