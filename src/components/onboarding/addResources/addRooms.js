import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import * as styled from './customStyles';
import { GET_SPECIFIC_ROOMS } from '../../../graphql/queries/Rooms';


const AddRooms = () => {
  const {
    data: { allRooms },
    loading,
  } = useQuery(GET_SPECIFIC_ROOMS);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <styled.GridContainer>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <styled.RoomImgOne src={allRooms.rooms[0].imageUrl} width="180" />
          <styled.centerImageText>
            <styled.centerImageTextWhiteUp>
              {allRooms.rooms[0].name}
            </styled.centerImageTextWhiteUp>
            <styled.centerImageTextTwoDown />
          </styled.centerImageText>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={8}>
          <styled.RoomImgTwo width="180" src={allRooms.rooms[1].imageUrl} />
          <styled.centerImageText>
            <styled.centerImageTextTwo>
              {allRooms.rooms[1].name}
            </styled.centerImageTextTwo>
            <styled.centerImageTextTwoDown />
          </styled.centerImageText>
        </Grid.Column>
      </styled.GridContainer>
    </div>
  );
};


export default AddRooms;
