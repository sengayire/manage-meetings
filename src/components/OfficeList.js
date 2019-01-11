import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Office from './Office';
import AddOffice from './AddOffice'; // eslint-disable-line
import '../assets/styles/officelist.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import Pagination from './commons/Pagination';

import { GET_ALL_OFFICES } from '../graphql/queries/Offices';
import MenuTitle from './MenuTitle';
import Spinner from './commons/Spinner';

export class OfficeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allOffices: { ...props.data.allOffices },
      currentPage: 1,
      dataFetched: true, // true when there is an active internet connection.

    };
  }

  componentWillReceiveProps(props) {
    const { allOffices } = props.data;
    this.setState({
      allOffices,
    });
  }

  /**
  * Handles pagination data retrieval.
  *
  * @param {number} page the current page
  * @param {number} perpage the number of items in a page
  *
  * @returns {void}
  */
  handleData = (perPage, page) => {
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data.fetchMore({
      variables: {
        page,
        perPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          allOffices: fetchMoreResult.allOffices,
          currentPage: page,
        });
      },
    }).then(() => this.setState({ dataFetched: true }))
      .catch(() => this.setState({ dataFetched: false }));
  };

  render() {
    const { loading, refetch, error } = this.props.data;
    const { allOffices, currentPage, dataFetched } = this.state;
    if (error) return <div>{error.message}</div>;
    return loading ? (
      <Spinner />
    ) : (
      <div className="settings-offices">
        <div className="settings-offices-control">
          <MenuTitle title="Offices" />
          <AddOffice
            refetch={refetch}
            currentPage={currentPage}
          />
        </div>
        <div className="settings-offices-list">
          <table>
            <ColGroup />
            <TableHead titles={['Office', 'Location', 'Timezone', 'Action']} />
            <tbody>
              {allOffices.offices &&
                allOffices.offices.map(office => (
                  <Office
                    office={office}
                    key={office.name}
                    refetch={refetch}
                    officeId={office.id}
                    currentPage={currentPage}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={allOffices.pages}
          hasNext={allOffices.hasNext}
          hasPrevious={allOffices.hasPrevious}
          handleData={this.handleData}
          currentPage={currentPage}
          dataFetched={dataFetched}
        />
      </div>
    );
  }
}

OfficeList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    refetch: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    allOffices: PropTypes.shape({
      offices: PropTypes.array,
      pages: PropTypes.number,
    }),
  }),
};

OfficeList.defaultProps = {
  data: {
    loading: true,
    allOffices: {
      id: 1,
      name: 'Epic tower',
      location: {
        name: 'Lagos',
        timeZone: 'WEST_AFRICA_TIME',
      },
    },
  },
};

export default graphql(GET_ALL_OFFICES, {
  options: () => ({
    /* istanbul ignore next */
    /* Reasoning: no explicit way of testing configuration options */
    variables: {
      page: 1,
      perPage: 5,
    },
  }),
})(OfficeList);
