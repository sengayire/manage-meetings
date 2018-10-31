import gql from 'graphql-tag';

const months = ['"Jan"', '"Feb"', '"Mar"', '"Apr"', '"May"', '"Jun"', '"Jul"', '"Aug"', '"Sep"', '"Oct"', '"Nov"', '"Dec"'];

const ANALYTICS_MEETING_ROOM_PER_MONTH = gql`
query {
    monthlyDurationsOfMeetings(month: ${
  months[(new Date()).getMonth()]
}, year: ${
  (new Date()).getFullYear()
})
       {
           MeetingsDurationaAnalytics {
               roomName
               count
               totalDuration
           }
       }
}
`;
export { ANALYTICS_MEETING_ROOM_PER_MONTH as default };
