import React from 'react';
import PageNotFound from '../../assets/images/PageNotFound.png';
import '../../assets/styles/pageNotFound.scss';

const NotFound = () => (
  <div id="page-not-found-body">
    <div id="page-not-found">
      <img src={PageNotFound} alt="Page Not Found" />
    </div>
    <p>{'Sorry, we\'ve got nothing to show you'}</p>
  </div>
);

export default NotFound;
