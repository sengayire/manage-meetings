import gql from 'graphql-tag';

const GET_NOTIFICATION_STATUS = gql`
  query {
    getUserNotificationSettings {
      id
      userId
      deviceHealthNotification
      meetingUpdateNotification
    }
  }
`;
export { GET_NOTIFICATION_STATUS as default };
