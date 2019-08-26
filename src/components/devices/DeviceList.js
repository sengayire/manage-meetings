import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/devicelist.scss';
import TableHead from '../helpers/TableHead';
import Device from './Device';
import dummyDevices from '../../fixtures/devices';
import { getAllDevices, getAllRooms } from '../helpers/QueriesHelpers';
import Overlay from '../commons/Overlay';
import ErrorIcon from '../commons/ErrorIcon';
import Pagination from '../commons/Pagination';
import paginate from '../helpers/FrontendPagination';
import DeviceModal from './DeviceModal';

/**
 * Device List Component
 *
 * @returns {JSX}
 */
class DeviceList extends Component {
  state = {
    fetching: true,
    devices: [],
    rooms: [],
    perPage: 5,
    currentPage: 1,
    openModal: false,
    device: {},
  }

  async componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, { currentPage, perPage }) {
    if (
      currentPage !== this.state.currentPage
      || perPage !== this.state.perPage
    ) {
      this.updatePageDetails();
    }
    if (prevProps.userLocationChanged !== this.props.userLocationChanged) {
      this.toggleFetching();
      setTimeout(() => { this.getData(); }, 1000);
      this.toggleFetching();
    }
  }

  getData = async () => {
    const { location: { name: location, id } } = this.props;
    const devices = await getAllDevices();
    const { allRooms: { rooms: allRooms } } = await getAllRooms(location);
    const rooms = allRooms.filter(({ locationId }) => locationId === Number(id));
    this.setState({
      devices: [...devices].reverse(),
      rooms,
    });
    this.updatePageDetails();
  }

  toggleFetching() { this.setState({ fetching: !this.state.fetching }); }

  handleAction = (action, device) => {
    this.setState({
      openModal: action,
      device,
    });
  }

  deviceComponents = deviceArray =>
    deviceArray.map(device =>
      <Device handleAction={this.handleAction} device={device} key={device.name + device.id} />);


  handlePageChange = (perPageData = 5, currentPageData) => {
    this.setState({
      perPage: Number(perPageData),
      currentPage: Number(currentPageData),
    });
  }

  closeModal = () => this.setState({
    openModal: false,
    modalIsClosed: true,
    device: {},
  });

  updatePageDetails = () => {
    const {
      devices, currentPage, fetching, perPage,
    } = this.state;
    const {
      pageContent: paginatedDeviceList, hasNext, hasPrevious, pages,
    } = paginate(devices,
      { currentPage, perPage },
    );

    this.setState({
      paginatedDeviceList,
      hasNext,
      hasPrevious,
      pages,
      ...(fetching && { fetching: false }),
    });
  }
  render() {
    const {
      device,
      fetching,
      rooms,
      devices,
      currentPage,
      modalIsClosed,
      paginatedDeviceList,
      pages,
      hasNext,
      hasPrevious,
      perPage,
      openModal,
    } = this.state;
    const { location, getRooms } = this.props;

    const displayPaginator = !fetching
      && !(devices.length < 5 && currentPage === 1);

    return (
      <div className="settings-devices-list overlay-container">
        {fetching && <Overlay />}
        <div className="settings-devices-control" />
        <div className="add-new-resource">
          <DeviceModal
            openModal={openModal}
            closeModal={this.closeModal}
            location={location}
            rooms={rooms}
            refetch={this.getData}
            device={device}
            getRooms={getRooms}
            modalIsClosed={modalIsClosed}
          />
        </div>
        {
          !fetching && !devices[0]
            ? (
              <ErrorIcon message="No Device found" />
            ) : (
              <Fragment>
                <div className="table device-table">
                  <TableHead titles={['Name', 'Type', 'Date Added', 'Last Seen', 'Room', 'Location']} />
                  <div className="table__body">{this.deviceComponents((
                    fetching ? dummyDevices : paginatedDeviceList
                  ))}
                  </div>
                </div>
                {
                  displayPaginator &&
                  <div>
                    <Pagination
                      totalPages={pages}
                      hasNext={hasNext}
                      hasPrevious={hasPrevious}
                      handleData={this.handlePageChange}
                      isFetching={fetching}
                      perPage={perPage}
                      currentPage={currentPage}
                    />
                  </div>
                }
              </Fragment>
            )
        }
      </div>
    );
  }
}


DeviceList.propTypes = {
  userLocationChanged: PropTypes.bool,
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
  getRooms: PropTypes.func.isRequired,
};

DeviceList.defaultProps = {
  userLocationChanged: PropTypes.bool,
  location: undefined,
};


export default DeviceList;
