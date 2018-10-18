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
      hintText="% of Checkins pie chart"
      entries={15}
      total={20}
      percentage={75}
      chartSvg={checkinSvg}
    />
    <DonutChart
      chartTitle="% of App Bookings"
      hintText="% of App Bookings pie chart"
      entries={4}
      total={20}
      percentage={20}
      chartSvg={appBookingsSvg}
    />
    <DonutChart
      chartTitle="Average Room Utilisation"
      hintText="Average Room Utilisation pie chart"
      entries={16}
      total={20}
      percentage={80}
      chartSvg={averageRoomSvg}
      hasInfo={false}
    />
  </div>
);


export default Checkins;
