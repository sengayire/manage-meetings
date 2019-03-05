import React from 'react';
import '../../../assets/styles/cancelledEvent.scss';
import { convergeLogoIcon } from '../../../utils/images/images';

/**
 * Component that notifies a user about
 * an event that has been cancelled
 *
 * @returns {JSX}
 */
const cancelledEvent = () => (
  <div className="email">
    <div className="email-header">
      <div className="email-header-content">
        <img src={convergeLogoIcon} alt="" className="email-logo" />
        <p className="email-header-title">Converge</p>
      </div>
    </div>
    <div className="email-body">
      <p className="email-title">Cancelled Event</p>
      <div className="email-body-content">
        <p className="email-body-text">
          <span className="sync-title">Harrison &lt;&gt; Jolomi Sync</span>{' '}
          event was just cancelled
          <br /> and removed from your calendar by{' '}
          <span className="admin">Jolomi Otumara</span> with this note:
          <br />
          &quot;Cancelling because of our leadership offsite.&quot;
        </p>
      </div>
    </div>
    <div className="email-sub-footer">
      <div className="email-sub-footer-content">
        <span>Have a question?</span>
        <a href="/">support@converge.com</a>
      </div>
    </div>
    <p className="email-footer">
      You can change your <a href="/">subscription settings</a> anytime.
    </p>
  </div>
);

export default cancelledEvent;
