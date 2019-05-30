import averageRoomCapacity from '../AverageRoomCapacity';
import { drawPieDonut, BarChart } from './CanvasHelpers';
import getSectorWidths from '../AverageMeetingDuration';
import getCheckinsStatistics from '../Checkins';
import graphColor from '../../../../fixtures/graphColor';

export default (analytics) => {
  const {
    lessThanTenData,
    betweenTenandTwentyData,
    greaterThanTwentyData,
  } = averageRoomCapacity(analytics.rooms);

  const [
    above60,
    btw4560,
    btw3045,
    btw030,
    zero,
  ] = getSectorWidths(analytics.analytics);

  const { bookingsCount } = analytics;

  const getBookingObject = i => ({
    [bookingsCount[bookingsCount.length - (i + 1)].period]:
      bookingsCount[bookingsCount.length - (i + 1)].totalBookings,
  });

  const bookingCountBarChartData = {
    ...(bookingsCount.length > 0 && getBookingObject(0)),
    ...(bookingsCount.length > 1 && getBookingObject(1)),
    ...(bookingsCount.length > 2 && getBookingObject(2)),
    ...(bookingsCount.length > 3 && getBookingObject(3)),
    ...(bookingsCount.length > 4 && getBookingObject(4)),
  };

  document.querySelector('.graph-label-download ul').innerHTML = `
    ${bookingsCount.length > 4 ? `<li>${bookingsCount[bookingsCount.length - 5].period}</li>` : ''}
    ${bookingsCount.length > 3 ? `<li>${bookingsCount[bookingsCount.length - 4].period}</li>` : ''}
    ${bookingsCount.length > 2 ? `<li>${bookingsCount[bookingsCount.length - 3].period}</li>` : ''}
    ${bookingsCount.length > 1 ? `<li>${bookingsCount[bookingsCount.length - 2].period}</li>` : ''}
    ${bookingsCount.length > 0 ? `<li>${bookingsCount[bookingsCount.length - 1].period}</li>` : ''}
  `;

  const {
    checkins, bookings, appBookings, autoCancellations,
  } = getCheckinsStatistics(analytics);
  const { checkinsPercentage, appBookingsPercentage, autoCancellationsPercentage } = analytics;

  const getAngle = percentage => Math.PI * (percentage / 50);

  drawPieDonut(
    document.querySelector('.meeting-duration-pie-chart-download'),
    [{
      color: '#ffaf30',
      angle: getAngle(above60),
    }, {
      color: '#fac56f',
      angle: getAngle(btw4560),
    }, {
      color: '#ffe9c6',
      angle: getAngle(btw3045),
    }, {
      color: '#eff3c6',
      angle: getAngle(btw030),
    }, {
      color: '#ccc',
      angle: getAngle(zero),
    }],
  );

  drawPieDonut(
    document.querySelector('.room-capacity-pie-chart-download'),
    [{
      color: '#3359db',
      angle: getAngle(lessThanTenData),
    }, {
      color: '#7a94eb',
      angle: getAngle(betweenTenandTwentyData),
    }, {
      color: '#c7d1f7',
      angle: getAngle(greaterThanTwentyData),
    }],
  );

  const createDonut = (percentage, { numerator, denominator }, node) => {
    const donutNode = node;
    drawPieDonut(
      donutNode.querySelector('canvas'),
      [{
        color: '#49AAAF',
        angle: getAngle(percentage),
      }, {
        color: '#bcbcbc',
        angle: getAngle(100 - percentage),
      }],
      true,
      percentage,
    );

    donutNode.querySelector('ul li:first-child').textContent = `${numerator}/${denominator}`;
  };

  createDonut(
    checkinsPercentage,
    { numerator: checkins, denominator: bookings },
    document.querySelector('.analytics__chart--donut-download.chart-1-download'),
  );

  createDonut(
    appBookingsPercentage,
    { numerator: appBookings, denominator: bookings },
    document.querySelector('.analytics__chart--donut-download.chart-2-download'),
  );

  createDonut(
    autoCancellationsPercentage,
    { numerator: autoCancellations, denominator: bookings },
    document.querySelector('.analytics__chart--donut-download.chart-3-download'),
  );

  const totalBookingsCountBarChart = new BarChart({
    canvas: document.querySelector('.bookings-bar-chart-download'),
    padding: 10,
    gridScale: 0.5,
    gridColor: '#eee',
    data: bookingCountBarChartData,
    colors: graphColor,
  });

  totalBookingsCountBarChart.draw();
};
