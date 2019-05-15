import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMeetingRoom from './AverageMeetingList/QueryAnalyticsPerMeetingRoom';
import Tip from '../commons/Tooltip';
import Pagination from '../commons/Pagination';
import Overlay from '../commons/Overlay';
import { notFoundIcon } from '../../utils/images/images';
import ErrorIcon from '../commons/ErrorIcon';
import meetingDurationAnalyticsMock from '../../fixtures/meetingDurationAnalytics';
import { getAnalyticForMeetingDurations } from '../helpers/QueriesHelpers';

/**
 * Component for the average meeting list
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
export class AverageMeetingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyticsForMeetingsDurations: {},
      isFetching: false, // fetching new page
      currentPage: 1,
      perPage: 5,
      loading: true, // initial load
    };
  }

  componentDidMount() {
    const { perPage, currentPage } = this.state;
    this.getAnalyticForMeetingDurations(perPage, currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { queryCompleted } = this.props;
    const { analyticsForMeetingsDurations, error, loading } = this.state;
    if (!error && !loading) {
      queryCompleted('AverageMeetingList');
    }
    if (prevState && prevState.analyticsForMeetingsDurations !== analyticsForMeetingsDurations) {
      const { updateParent } = this.props;
      updateParent('averageMeetingTime', analyticsForMeetingsDurations);
    }
  }


  getAnalyticForMeetingDurations = async (perPage, currentPage) => {
    const { dateValue } = this.props;
    const { loading } = this.state;
    const args = {
      dateValue, perPage, currentPage,
    };

    if (!loading) {
      this.setState({ isFetching: true });
    }

    const { analyticsForMeetingsDurations } = await getAnalyticForMeetingDurations(args);
    this.props.queryCompleted('AverageMeetingDuration');
    this.setState({
      loading: false,
      isFetching: false,
      analyticsForMeetingsDurations,
      error: analyticsForMeetingsDurations === null,
      currentPage,
    });
  }

  showErrorMessage = message => (
    <div className="average-table-error">
      <div className="error_class">
        <img
          className="error_icon"
          src={notFoundIcon}
          alt="error_icon"
        />
        <b>
          <p className="error_msg">
            {message || 'An error occurred, cannot fetch data'}
          </p>
        </b>
      </div>
    </div>
  );

  render() {
    const tip =
     'The number of meetings in a room,  the average number of attendees to these meetings as well as the average duration of the meetings.';
    /* eslint no-param-reassign: "error" */
    const {
      isFetching,
      perPage,
      currentPage,
      error,
      loading,
      analyticsForMeetingsDurations,
    } = this.state;
    const { isFutureDateSelected } = this.props.dateValue;

    const analyticsForMeetingsDurationsMock = {
      MeetingsDurationaAnalytics: meetingDurationAnalyticsMock(3),
    };

    const analyticsData = loading
      ? analyticsForMeetingsDurationsMock
      : analyticsForMeetingsDurations;

    return (
      <div className="average-meeting overlay-container">
        {loading && isFetching && <Overlay />}
        <div className="average-meeting-control">
          <h4 className="header-title">Average time spent/Meeting Room</h4>
          <span className="moreVerticalIcon">{Tip(tip)}</span>
        </div>
        <div className="average-meeting-list">
          <div>
            <TableHead
              titles={['Room', 'No. of meetings', 'Average Meeting Duration']}
            />
            <div>
              {
                isFutureDateSelected ?
                this.showErrorMessage('You cannot fetch data beyond today')
                : (
                error ? (
                  <ErrorIcon
                    message={error.graphQLErrors.length > 0 && 'No resource found'}
                  />
                )
                : <QueryAnalyticsPerMeetingRoom
                  data={analyticsData}
                />
                )
              }
            </div>
          </div>
        </div>
        {!loading &&
          <div className="average-meeting-pagination">
            <div>
              { !isFutureDateSelected && !error && <Pagination
                totalPages={analyticsForMeetingsDurations.pages}
                hasNext={analyticsForMeetingsDurations.hasNext}
                hasPrevious={analyticsForMeetingsDurations.hasPrevious}
                handleData={this.getAnalyticForMeetingDurations}
                isFetching={isFetching}
                perPage={perPage}
                currentPage={currentPage}
              />
            }
            </div>
          </div>
        }
      </div>
    );
  }
}

AverageMeetingList.propTypes = {
  dateValue: PropTypes.shape({
    validatedStartDate: PropTypes.string,
    validatedEndDate: PropTypes.string,
    isFutureDateSelected: PropTypes.bool.isRequired,
  }),
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

AverageMeetingList.defaultProps = {
  dateValue: {},
  updateParent: null,
};

export default AverageMeetingList;
