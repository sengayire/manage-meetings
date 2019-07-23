export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
    .analytics-download, .analytics-download2 {
      background-color: #f4f8f9;
      font-family: "DINPro-Regular", Helvetica, Arial, sans-serif;
      font-size: 16px;
      padding: 20px 84px;
      padding-bottom: 95px;
    }

    .analytics-download {
      display: grid;
      grid-gap: 30px;
      grid-template-rows: auto 24% auto 24%;
      grid-template-columns: repeat(6, 1fr);
    }

    .analytics-download > div, .analytics-download2 > div {
      background: white;
      border-radius: 5px;
      display: grid;
      grid-template-rows: auto 1fr;
    }

    .analytics-download2 > div {
      margin-top: 30px;
    }

    .page3-download {
      padding: 50px 500px;
    }
    .analytics__chart-download {
      padding: 35px;
    }
    .analytics__chart-download > div:first-child {
      height: 30px;
    }

    .header-download {
      grid-column: 1 / -1;
      text-align: center;
      color: #3359db;
    }
    
    .chart-1-download {
      grid-column: 1 / 3;
    }
    
    .chart-2-download {
      grid-column: 3 / 5;
    }
    
    .chart-3-download {
      grid-column: 5 / 7;
    }
    
    .booked-rooms-1-download {
      grid-column: 1 / 4;
    }
    
    .booked-rooms-2-download {
      grid-column: 4 / 7;
    }
    
    .pie-donut-download {
      display: flex;
    }
    
    .pie-donut-download > :first-child {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 60%;
    }
    
    .pie-donut-download > :last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .analytics-download ul {
      list-style-type: none;
      padding: 0;
    }
    
    .analytics-download li {
      margin: 5px;
    }
    
    .bullet-download {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .analytics__chart-download li {
      color: #999999;
    }
    
    .analytics__chart--donut-download li {
      color: #6d6d6d;
      font-size: 24px;
      font-weight: bold;
      padding-left: 20px;
    }
    
    .analytics__table-download > div:first-child {
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 65px;
    }
    
    .analytics__table-download > div:first-child p {
      text-indent: 35px;
    }

    .analytics-download2 .analytics__table-download > div:first-child p {
      padding-top: 10px;
    }
    
    .table-flex-download {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .table-flex-download.total-bookings-count-table-download {
      grid-template-columns: repeat(2, 1fr);
    }

    .table-flex-download > div {
      text-align: center;
      border-bottom: 1px solid #e4e4e4;
      padding: 20px 0;
    }

    .table-header-download {
      font-weight: bold;
    }

    .analytics-download2 .table-header-download {
      color: #787878;
    }

    .table-flex-download > div:first-child {
      padding-left: 30px;
      text-align: left;
    }

    .table-download.booked-rooms-download {
      display: grid;
      grid-template-rows: repeat(6, 1fr);
      padding: 0 20px;
    }

    
    .graph-container-download {
      display: grid;
      grid-template-columns: 2fr 5fr;
    }
    
    .graph-container-download > div {
      display: flex;
      align-items: center;
    }
    
    .graph-container-download > div:first-child {
      display: flex;
      align-items: stretch;
    }
    
    .graph-container-download ul {
      padding: 24px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }    
    </style>
  </head>
  <body>
  <div class="analytics-download">
      <h1 class="header-download">
        Analytics Data for <span>startDate</span> - <span>endDate</span>
      </h1>
      <div class="analytics__chart-download chart-1-download">
        <div>
          Average Meetings Duration [%]
        </div>
        <div class="pie-donut-download">
          <div>
            <canvas class="meeting-duration-pie-chart-download" width="200" height="200"></canvas>
          </div>
          <ul>
            <li><span class="bullet-download" style="background-color: #ffaf30"></span>Above 60 Minutes</li>
            <li><span class="bullet-download" style="background-color: #fac56f"></span>45 - 60 Minutes</li>
            <li><span class="bullet-download" style="background-color: #ffe9c6"></span>30 - 45 Minutes</li>
            <li><span class="bullet-download" style="background-color: #eff3c6"></span>1 - 29 Minutes</li>
            <li><span class="bullet-download" style="background-color: #cccccc"></span>Zero</li>
          </ul>
        </div>
      </div>
      <div class="analytics__chart-download chart-2-download">
        <div>
          Average Rooms Capacity [%]
        </div>
        <div class="pie-donut-download">
          <div>
            <canvas class="room-capacity-pie-chart-download" width="200" height="200"></canvas>
          </div>
          <ul>
            <li><span class="bullet-download" style="background-color: #3359db"></span>Less than 10</li>
            <li><span class="bullet-download" style="background-color: #7a94eb"></span>10 - 20</li>
            <li><span class="bullet-download" style="background-color: #c7d1f7"></span>More than 20</li>
          </ul>
        </div>
      </div>
      <div class="analytics__chart-download chart-3-download">
        <div>
          Total Bookings Count
        </div>
        <div class="graph-container-download">
          <div class="graph-label-download">
            <ul>
            </ul>
          </div>
          <div>
            <canvas class="bookings-bar-chart-download" height="150" width="225"></canvas>
          </div>
        </div>
      </div>
      <div class="analytics__table-download booked-rooms-download booked-rooms-1-download">
        <div>
          <p>Most Booked Rooms</p>
        </div>
        innerMostBookedRooms
      </div>
      <div class="analytics__table-download booked-rooms-download booked-rooms-2-download">
        <div>
          <p>Least Booked Rooms</p>
        </div>
        innerLeastBookedRooms
      </div>
      <div class="analytics__chart-download analytics__chart--donut-download chart-1-download">
        <div>
          % of Checkins
        </div>
        <div class="pie-donut-download">
          <div>
            <canvas class="checkins-donut-chart-download" width="200" height="200"></canvas>
          </div>
          <div>
            <ul>
              <li>0/0</li>
              <li>Meetings</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="analytics__chart-download analytics__chart--donut-download chart-2-download">
        <div>
          % of App Bookings
        </div>
        <div class="pie-donut-download">
          <div>
            <canvas class="app-bookings-donut-chart-download" width="200" height="200"></canvas>
          </div>
          <div>
            <ul>
              <li>0/0</li>
              <li>Meetings</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="analytics__chart-download analytics__chart--donut-download chart-3-download">
        <div>
          % of Auto Cancellations
        </div>
        <div class="pie-donut-download">
          <div>
            <canvas class="cancellation-donut-chart-download" width="200" height="200"></canvas>
          </div>
          <div>
            <ul>
              <li>0/0</li>
              <li>Meetings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="analytics-download2 page2-download">
      <h2 class="header-download"> Average Time Spent Per Meeting Room </h2>
      <div class="analytics__table-download booked-rooms-download booked-rooms-1-download">
        <div>
          <p>Average Time Spent/Meeting Room</p>
        </div>
        averageTimeSpentDuringMeetings
      </div>
    </div>
    <div class="analytics-download2 page3-download">
      <h2 class="header-download">
        Total Bookings Count
      </h2>
      <div class="analytics__table-download booked-rooms-download booked-rooms-2-download">
        <div>
          <p>Total Bookings Count</p>
        </div>
        totalBookingsCount
      </div>
    </div>
  </body>
</html>

`;
