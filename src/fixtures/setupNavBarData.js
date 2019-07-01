import { roomIcon, resourcesIcom, peopleIcon, structureIcon, deviceIcon } from '../utils/images/images';

/* List of navbar items */
const navBarItems = [
  {
    id: 'structure',
    src: structureIcon,
    alt: 'structure icon',
    text: 'Structure',
  },
  {
    id: 'meeting-rooms',
    src: roomIcon,
    alt: 'room icon',
    text: 'Meeting Rooms',
  },
  {
    id: 'resources',
    src: resourcesIcom,
    alt: 'resources icon',
    text: 'Resources',
  },
  {
    id: 'devices',
    src: deviceIcon,
    alt: 'device icon',
    text: 'Devices',
  },
  {
    id: 'people',
    src: peopleIcon,
    alt: 'room icon',
    text: 'People',
  },
];

export default navBarItems;
