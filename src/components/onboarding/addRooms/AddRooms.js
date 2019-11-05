/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-empty */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from 'react';
import ReactFileReader from 'react-file-reader';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import NumberInput from 'semantic-ui-react-numberinput';
import '../../../assets/styles/inputWithNumbers.scss';
import '../../../assets/styles/addroom.scss';
import backIcon from '../../../assets/images/ic_back.svg';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';
import roomImage2 from '../../../assets/images/roomImage2.png';
import { ADD_ROOM } from '../../../graphql/mutations/Rooms';
import SelectInput from '../../commons/SelectInput';
import { GET_ALL_REMOTE_ROOMS } from '../../../graphql/queries/Rooms';
import Button from '../../../components/commons/Button';


export const renderRoomType = (roomTypeValue, setFormData, formData) => {
  setFormData({
    ...formData,
    roomType: roomTypeValue,
  });
};

export const handleFiles = (files, value, imageUrl, setFormData, formData) => {
  const { fileList, base64 } = files;
  const image = imageUrl.find(item => item.id === value);
  if (image) {
    if (Number(image.id) === Number(value)) {
      image.src = base64;
      setFormData({
        ...formData,
        imageUrl: [...imageUrl],
        key: value,
        imageFile: fileList[0],
        activeImage: base64,
      });
    }
  }
};
  /* istanbul ignore next */
const renderNameRoms = (e, rooms, setCalendarId, setSelectRoomName) => {
  const calendarId = e.target.value;
  const verify = rooms.length !== 0 && rooms.find(item => item.calendarId === calendarId);
  setCalendarId(calendarId);
  setSelectRoomName(verify.name);
};
export const handleOnTextChange = (capacity, setFormData, formData, imageUrl) => {
  const data = {
    id: Number(capacity),
    src: null,
  };
  setFormData({
    ...formData,
    currentValue: capacity,
    imageUrl: [...imageUrl, data],
  });
};

export const selectFloor = (floor, setFormData, formData) => {
  setFormData({ ...formData, activeFloor: floor });
};

/* istanbul ignore next */
const handleInput = (
  n, imageUrl, roomType, rooms, setFormData, formData, setCalendarId, setSelectRoomName) => (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="name-rooms">
          <div className="name-rooms-image">
            <Fragment>
              {imageUrl.length > 0 && (
              <Fragment>
                {imageUrl.map(item => (
                  <Fragment>
                    <ReactFileReader
                      handleFiles={files => handleFiles(files, Number(n), imageUrl,
                        setFormData, formData)}
                      base64
                      fileTypes={['.jpg', '.png', '.jpeg']}
                    >
                      <img
                        src={item.src ? item.src : roomImage2}
                        alt="room"
                      />
                    </ReactFileReader>
                    <SelectInput
                      name="roomType"
                      id="roomType"
                      value={roomType}
                      options={[
                           { name: 'Meeting room' },
                           { name: 'Call room' },
                      ]}
                      onChange={e => renderRoomType(e.target.value, setFormData, formData)}
                      placeholder="Select room type"
                      className="roomType"
                    />
                    <select
                      className="roomCalendar"
                      placeholder="Select room name"
                      name="roomName"
                      onChange={e => renderNameRoms(e, rooms, setCalendarId, setSelectRoomName)}
                    >
                      {rooms && rooms.map(it =>
                        <option key={it.calendarId} value={it.calendarId} >
                          {it.name}
                        </option>) }
                    </select>
                  </Fragment>
                   ))}
              </Fragment>
               )}
            </Fragment>
          </div>
        </div>
      </form>
    </Fragment>
);
  /* istanbul ignore next */
function AddRooms() {
  const [formData, setFormData] = useState({
    Floors: '',
    activeFloor: '',
    showFloor: false,
    block: '',
    isClicked: false,
    activeLevel: 1,
    active: 1,
    activeFloors: undefined,
    currentValue: '0',
    files: [],
    imageFile: null,
    imageUrl: [],
    key: null,
    name: '',
    roomType: '0',
  });
  const [structureId, setStructureId] = useState([{ value: '' }]);
  const [locationId, setLocationId] = useState([{ value: '' }]);
  const [roomLabels, setrooomLabels] = useState([]);
  const [calendarId, setCalendarId] = useState([{ value: '' }]);
  const [selectNameRooms, setSelectRoomName] = useState([{ value: '' }]);

  const {
    block,
    currentValue,
    imageUrl,
    activeFloor,
    activeImage,
    roomType,
  } = formData;

  let rooms;
  const { data: allRooms, loading, error } = useQuery(GET_ALL_REMOTE_ROOMS);
  if (loading) console.log('wait');
  if (error) console.log(error);
  if (allRooms) {
    if (allRooms.allRemoteRooms) {
      const { rooms: availableRooms } = allRooms.allRemoteRooms;
      rooms = availableRooms;
    }
  }

  const setClassName = (Floor) => {
    const className = `addroom-Floor ${
      Floor === activeFloor ? 'addroom-Floor active-Floor' : 'addroom-Floor'
    } ${block}`;
    return className;
  };
  const [
    createRoom,
    // eslint-disable-next-line no-unused-vars
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_ROOM);

  return (
    <Fragment>
      <div>
        <div className="addroom-page-title">
          <div className="back_icon">
            <img src={backIcon} alt="back icon" />
          </div>
          <div>
            <span className="addroom-title">Add Rooms</span>
          </div>
        </div>
        <div>
          <p>Set the structure of your Center</p>
          <Query query={GET_ALL_LEVELS}>
            {/* istanbul ignore next */
             ({ data }) => {
               if (data.allStructures) {
               }
               return (
                 <div className="addroom-container">
                   {data &&
                     data.allStructures &&
                     data.allStructures.map(Floor => (
                       <button
                         onClick={() => {
                           selectFloor(Floor.name, setFormData, formData);
                           setStructureId(Floor.structureId);
                           setLocationId(Floor.locationId);
                           setrooomLabels(Floor.name);
                           console.log('allData', data);
                         }}
                         className={setClassName(Floor.name, activeFloor, block)}
                       >
                         <span className="addroom-Floor">{Floor.name}</span>
                         <div className="addroom-block">{Floor.parentTitle}</div>
                       </button>
                     ))}
                 </div>
               );
             }}
          </Query>
        </div>
         &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div>
        <div>
          <p>How many meetings rooms are in Floor?</p>
          <div className="number-input-container">
            <NumberInput
              value={currentValue}
              buttonPlacement="right"
              className="number-input"
              onChange={
                  e => handleOnTextChange(e, setFormData, formData, imageUrl)}
            />
            <p>Name Your Meetings Rooms</p>
            {handleInput(currentValue, imageUrl, roomType,
              rooms, setFormData, formData, setCalendarId, setSelectRoomName)}
          </div>
        </div>
        <Button
          handleClick={
          (e) => {
            e.preventDefault();
            createRoom({
              variables: {
                name: selectNameRooms,
                capacity: currentValue,
                imageUrl: activeImage,
                locationId,
                roomLabels,
                structureId,
                calendarId,
                roomType,
              },
            }).catch((res) => {
              res.graphQLErrors.map(ERROR => ERROR.message);
            });
          }}
          title="Next"
          type={3}
        />
      </div>
    </Fragment>
  );
}

AddRooms.defaultProps = {
  setFloors: [],
  setactiveFloor: '',
};
export default AddRooms;
