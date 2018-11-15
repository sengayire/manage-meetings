import gql from 'graphql-tag';

const UPDATE_NOTIFICATION_MUTATION = gql`
  mutation updateNotification($meeting: Boolean, $device: Boolean) {
    updateNotification(
      meetingUpdateNotification: $meeting
      deviceHealthNotification: $device
    ) {
      notification {
        id
        userId
        meetingUpdateNotification
        deviceHealthNotification
      }
    }
  }
`;

export { UPDATE_NOTIFICATION_MUTATION as default };
