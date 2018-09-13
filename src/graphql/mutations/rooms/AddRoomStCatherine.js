import gql from 'graphql-tag';

const ADD_ROOM_ST_CATHERINE = gql`
    mutation(
        $capacity: Int!, 
        $name: String!, 
        $floorId: Int!,
        $roomType: String!,
        $calendarId: String!,
        $officeId: Int!,
        $imageUrl: String! 
    ) {
        createRoom(
            capacity: $capacity, 
            name: $name, 
            floorId: $floorId,
            officeId: $officeId,
            roomType: $roomType,
            calendarId: $calendarId,
            imageUrl: $imageUrl,
          ){
            room{
                name
                floorId
             }
        }
    }
`;

export default ADD_ROOM_ST_CATHERINE;

