/* eslint-disable */
import React from 'react';

const downloadFileString = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <style type="text/css">
    body {
      font: 12pt Georgia, 'Times New Roman', Times, serif;
    }

    h1 {
      display: block;
      text-align: center;
      color: blue;
    }

    h2 {
      text-align: center;
      font-family: Palatino Linotype, Book Antiqua, Palatino, serif;
      font-weight: normal;
      color: #024457;
      font-size: 1.5rem;
    }

    h3 {
      text-align: center;
      font-family: Palatino Linotype, Book Antiqua, Palatino, serif;
      font-weight: normal;
      color: #024457;
      font-size: 1.0rem;
    }

    table.download {
      border-collapse:collapse;
      line-height: 1.5;
      font-size: 1.4rem;
      width: 100%;
      border:0;
    }

    table.download td:first-child {
      text-align: left;
    }​

     table.download th, td {
       text-align: center;
       border:0;
       padding: 8px;
       border-bottom: 1px solid #ddd;
     }

    tr.header-tr th {
      text-align: center;
      border:0;
      background-color: #819FF7;
      color: white;
    }

    table.download td {
      background-color: #ffffff;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 100%;
    }

    table.download tr:nth-child(even) td {
      background-color: #f2f2f2;
    }

  </style>
</head>
<body class="download-body">
  <h2>Room Analytics Report Summary</h2>
  <h2>Report Period: from startDate to endDate</h2>
  <hr />
  <h2>Most Booked Rooms</h2>
  <table class="download">
    <thead>
    <tr class="header-tr">
      <th>Room</th>
      <th>Meetings</th>
      <th>%share of All meetings</th>
    </tr>
    </thead>
    innerMostBookedRooms
  </table>

  <h2>Least Booked Rooms</h2>
  <table class="download">
    <thead>
    <tr class="header-tr">
      <th>Room</th>
      <th>Meetings</th>
      <th>%share of All meetings</th>
    </tr>
    </thead>
    innerLeastBookedRooms
  </table>
  <hr/>
</body>
</html>
`;

export default downloadFileString;
