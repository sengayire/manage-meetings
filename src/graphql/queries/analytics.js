import gql from 'graphql-tag';
import getCurrentWeek from '../../components/helpers/getCurrentWeek';
import currentDate from '../../components/helpers/getCurrentDay';

const months = ['"Jan"', '"Feb"', '"Mar"', '"Apr"', '"May"', '"Jun"', '"Jul"', '"Aug"', '"Sep"', '"Oct"', '"Nov"', '"Dec"'];

const weekStart = getCurrentWeek()[0];
const weekEnd = getCurrentWeek()[4];

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


export const ANALYTICS_MEETING_ROOM_PER_WEEK = gql`
  query {
    weeklyDurationsOfMeetings(weekStart: "${weekStart}", weekEnd: "${weekEnd}") {
      MeetingsDurationaAnalytics {
        roomName
        count
        totalDuration
      }
    }
  }
`;


const ANALYTICS_MEETING_ROOM_PER_DAY = gql`
 query {
    dailyDurationsOfMeetings(dayStart: "${currentDate()}"){
        MeetingsDurationaAnalytics {
            count
            roomName
            totalDuration
    }
 }
}
`;
export {
  ANALYTICS_MEETING_ROOM_PER_WEEK as default,
  ANALYTICS_MEETING_ROOM_PER_MONTH,
  ANALYTICS_MEETING_ROOM_PER_DAY,
};
