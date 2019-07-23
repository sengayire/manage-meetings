import { feedbackTemplateStyle, feedbackListTemplate, feedbackHtmlTemplate, feedbackSub } from '../../src/fixtures/feedbackDownloadString';

const Style = () => `
<style type="text/css">
  body {
    background-color: #f4f8f9;
  }

  .feedback-download {
    position: absolute;
    top: 200rem;
    left: 0;
  }
    .download-feedback-container {
      margin: 0 auto;
      width: 90%;
      background-color: #f4f8f9;
      font-family: "DINPro-Regular", Helvetica, Arial, sans-serif;
      font-size: 25px;
      padding: 70px 20px;
      overflow: auto;

    }

    .download-feedbackSummary-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
    }

    .download-feedback-card {
      font-weight: 300;
      color: #424242;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.05);
      padding: 1.250em;
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      letter-spacing: 1px;
      font-size: 26px
    }

    .download-feedback-card:not(:last-child) {
      margin-right: 23px;
    }

    .download-feedback-card-info {
      align-self: flex-end;
      font-size: 25px;
    }

    .room-feedback-response-header {
      display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 0.875em 1.875em;
        color: #999999;
    font-weight: 300;
    }

    .download-room-feedback-list {
      display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-family: "DINPro-Regular";
    border-radius: 4px;
    background-color: #ffffff;
    padding: 0.875em 1.875em;
        margin-bottom: 8px;
    color: #333e44;
    border: 1px solid #ebebeb;

    }

    .download-header {
      margin: 0 auto;
      background: #ffffff;
    width: 90%;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    font-family: "DINPro-Regular", Helvetica, Arial, sans-serif;
    font-size: 30px;
    }

    .download-logo {
      flex-basis: 30%;
    }

    .room-name {
      color:#3359db
    }

    .download-page-title {
      flex-basis: 60%;
      color: #3359db
    }
  </style>
 `;

const feedbackResponse = {
  'Room name': 'bayo',
  'Total Responses': 3,
  'Cleanliness rating': 'Great',
  'Total Missing Items': 3,
  Suggestions: 'i dont have',
};

const testFeedbackListTemplate = response => `
 <div class="download-room-feedback-list">
  <span class="download-room-feedback room-name">${response['Room name']}</span>
  <span class="download-room-feedback">${response['Total Responses']}</span>
  <span class="download-room-feedback">${response['Cleanliness rating']}</span>
  <span class="download-room-feedback">${response['Total Missing Items']}</span>
 <span class="download-room-feedback">${response.Suggestions}</span>
 </div>
 `;

const testFeedbackHtmlTemplate = (feedback, formatedFeedback) => `<DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Feedback responses</title>
 ${Style()}
</head>
<body>
<div class="feedback-download">
  <header class="download-header">
    <div class="download-logo">
      Converge
    </div>
    <div class="download-page-title">
      Room Feedback Responses
    </div>
  </header>
  <div class="download-feedback-container">
  <div class="download-feedbackSummary-wrapper">
    <section class="download-feedback-card">
      <p class="feedback-card-heading">Total Responses</p>
      <p class="download-feedback-card-info">${feedback.totalResponses}</p>
    </section>
    <section class="download-feedback-card">
      <p class="feedback-card-heading">Rooms With Missing Items</p>
      <p class="download-feedback-card-info">${feedback.roomsWithMissingItems}</p>
    </section>
    <section class="download-feedback-card">
      <p class="feedback-card-heading">Average Rating</p>
      <p class="download-feedback-card-info">${feedback.totalAverageRating}</p>
    </section>
  </div>
  <div class="room-feedback-list-wrapper">
    <header class="room-feedback-response-header">
      <span>Meeting Room</span>
      <span>Responses</span>
      <span>Cleanliness Rating</span>
      <span>Missing Items</span>
      <span>Suggestions on how to improve</span>
    </header>
  ${formatedFeedback.map(testFeedbackListTemplate).join('')}
  </div>
  </div>
  </div>
 </body>
 </html>`;

const testFeedbackSub = responses => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style type="text/css">
      .download-room-feedback-list {
      display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-family: "DINPro-Regular";
    border-radius: 4px;
    background-color: #ffffff;
    padding: 0.875em 1.875em;
        margin-bottom: 8px;
    color: #333e44;
    border: 1px solid #ebebeb;
    width: 85%;
    margin-right:auto;
    margin-left: auto;
    font-size: 25px;


    }

    .room-name {
      color:#3359db
    }

    .feedback-sub-download {
      background-color: #f4f8f9;
    }


  </style>
</head>
<body>
  <div class="feedback-sub-download">
    ${responses.map(testFeedbackListTemplate).join('')}
</div>
</body>
</html>`;


describe('feedback download html template', () => {
  it('should define the main html style', () => {
    const response = feedbackTemplateStyle();
    const check = Style();
    expect(response).toEqual(check);
  });

  it('should define the feedback lists', () => {
    const response = feedbackListTemplate(feedbackResponse);
    const check = testFeedbackListTemplate(feedbackResponse);
    expect(response).toEqual(check);
  });

  it('should create the feedback page', () => {
    const response = testFeedbackHtmlTemplate({}, [{
      'Room name': 'bayo',
      'Total Responses': 3,
      'Cleanliness rating': 'Great',
      'Total Missing Items': 3,
      Suggestions: 'i dont have',
    }]);
    const check = feedbackHtmlTemplate({}, [{
      'Room name': 'bayo',
      'Total Responses': 3,
      'Cleanliness rating': 'Great',
      'Total Missing Items': 3,
      Suggestions: 'i dont have',
    }]);
    expect(response).toEqual(check);
  });

  it('should create more pages', () => {
    const response = testFeedbackSub([{
      'Room name': 'bayo',
      'Total Responses': 3,
      'Cleanliness rating': 'Great',
      'Total Missing Items': 3,
      Suggestions: 'i dont have',
    }]);
    const check = feedbackSub([{
      'Room name': 'bayo',
      'Total Responses': 3,
      'Cleanliness rating': 'Great',
      'Total Missing Items': 3,
      Suggestions: 'i dont have',
    }]);
    expect(response).toEqual(check);
  });
});
