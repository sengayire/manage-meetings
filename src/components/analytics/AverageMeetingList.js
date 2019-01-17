import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import '../../assets/styles/averageMeetinglist.scss';
import TableHead from '../helpers/TableHead';
import QueryAnalyticsPerMeetingRoom from './AverageMeetingList/QueryAnalyticsPerMeetingRoom';
import Tip from '../commons/Tooltip';
import MEETING_DURATION_ANALYTICS from '../../graphql/queries/analytics';
import Pagination from '../commons/Pagination';
import QueryAnalyticsLoading from './AverageMeetingList/QueryAnalyticsLoading';
import Overlay from '../commons/Overlay';

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
      analyticsForMeetingsDurations: {
        ...props.data.analyticsForMeetingsDurations,
      },
      isFetching: false,
    };
  }

  componentWillReceiveProps(props) {
    const { analyticsForMeetingsDurations } = props.data;
    this.setState({
      analyticsForMeetingsDurations,
    });
  }

  /**
   * fetches data for the given number of pages
   *
   * @param {number} perPage
   * @param {number} page
   *
   * @returns {void}
   */
  handleData = (perPage, page) => {
    this.setState({ isFetching: true });
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data
      .fetchMore({
        variables: {
          startDate: this.props.dateValue.startDate,
          endDate: this.props.dateValue.endDate,
          page,
          perPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          this.setState({
            analyticsForMeetingsDurations:
              fetchMoreResult.analyticsForMeetingsDurations,
          });
        },
      })
      .then(() => this.setState({ isFetching: false }))
      .catch(() => this.setState({ isFetching: false }));
  };

  render() {
    const tip =
      'The number of meetings in a room,  the average number of attendees to these meetings as well as the average duration of the meetings.';
    /* eslint no-param-reassign: "error" */
    const { analyticsForMeetingsDurations, isFetching } = this.state;
    const { loading, error } = this.props.data;
    if (loading) return <QueryAnalyticsLoading />;
    if (error) return `Error: ${error}`;
    return (
      <div className="average-meeting">
        <div className="average-meeting-control">
          <h4 className="header-title">Average time spent/Meeting Room</h4>
          <span className="moreVerticalIcon">{Tip(tip)}</span>
        </div>
        <div className="average-meeting-list">
          {isFetching ? <Overlay id="average-meeting" /> : null}
          <table>
            <TableHead
              titles={['Room', 'No. of meetings', 'Average Meeting Duration']}
            />
            <tbody>
              <QueryAnalyticsPerMeetingRoom
                data={analyticsForMeetingsDurations}
              />
            </tbody>
          </table>
        </div>
        <div className="average-meeting-pagination">
          <div>
            <Pagination
              totalPages={analyticsForMeetingsDurations.pages}
              hasNext={analyticsForMeetingsDurations.hasNext}
              hasPrevious={analyticsForMeetingsDurations.hasPrevious}
              handleData={this.handleData}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
    );
  }
}

AverageMeetingList.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  data: PropTypes.shape({
    analyticsForMeetingsDurations: PropTypes.object,
    fetchMore: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.any,
  }).isRequired,
};
AverageMeetingList.defaultProps = {
  dateValue: {},
};

export default compose(
  graphql(MEETING_DURATION_ANALYTICS, {
    name: 'data',
    options: props => ({
      variables: {
        startDate: props.dateValue.startDate,
        endDate: props.dateValue.endDate,
        page: 1,
        perPage: 5,
      },
    }),
  }),
)(AverageMeetingList);
