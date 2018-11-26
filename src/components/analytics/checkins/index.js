import React from 'react';
import '../../../assets/styles/checkins.scss';
import DonutChart from './DonutChart';
import checkinSvg from '../../../assets/images/checkins.svg';
import appBookingsSvg from '../../../assets/images/app_bookings.svg';
import averageRoomSvg from '../../../assets/images/average_room_utilisation.svg';

const Checkins = () => (
  <div className="checkins">
    <DonutChart
      chartTitle="% of Checkins"
      entries={15}
      total={20}
      percentage={75}
      chartSvg={checkinSvg}
      tip="The number and % of check-ins of booked meeting rooms"
    />
    <DonutChart
      chartTitle="% of App Bookings"
      entries={4}
      total={20}
      percentage={20}
      chartSvg={appBookingsSvg}
      tip="The number and % of people who book directly from the app instead from google calendar"
    />
    <DonutChart
      chartTitle="% of Auto Cancellations"
      entries={16}
      total={20}
      percentage={80}
      chartSvg={averageRoomSvg}
      hasInfo={false}
      tip="Number and % of auto-cancelled meeting rooms"
    />
  </div>
);

export default Checkins;
