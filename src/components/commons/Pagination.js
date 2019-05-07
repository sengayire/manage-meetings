import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/pagination.scss';

const options = array =>
  array.map(item => <option key={item + 1}>{item}</option>);

/**
 * Reusable pagination component
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class Pagination extends Component {
  state = {
    perPage: 5,
    page: 1,
  };

  componentDidMount = () => {
    const { currentPage } = this.props;
    this.setState({ page: currentPage });
  }

  /**
   * Handles changes to the pagination field
   *
   * @returns {void}
   */
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { perPage } = this.state;
    const { handleData, dataFetched } = this.props;
    if (name === 'perPage' && dataFetched) {
      this.setState({ perPage: parseFloat(value), page: 1 }, () => {
        handleData(value, 1);
      });
    }
    if (name === 'page' && dataFetched) {
      this.setState({ page: parseFloat(value), perPage }, () => {
        handleData(perPage, parseInt(value, 10));
      });
    }
  };

  /**
   * Calls data for the next page when the next button is hit.
   *
   * @returns {void}
   */
  handleNext = () => {
    const {
      handleData, dataFetched, perPage, currentPage,
    } = this.props;
    handleData(perPage, currentPage + 1);
    dataFetched &&
      this.setState({
        page: currentPage + 1,
      });
  };

  /**
   * Calls data for the previous page when the previous button is hit.
   *
   * @returns {Function} handleData
   */
  handlePrevious = () => {
    const {
      handleData, dataFetched, currentPage,
    } = this.props;
    const { perPage } = this.state;
    handleData(perPage, currentPage - 1);
    dataFetched &&
      this.setState({
        page: currentPage - 1,
      });
  };

  render() {
    const {
      itemsPerPage,
      totalPages,
      hasNext,
      hasPrevious,
      reverse,
      isFetching,
      perPage,
    } = this.props;
    const { page } = this.state;
    return (
      <nav className="page-navigation">
        <div className="perPageBlock">
          <ul className="pagination">
            <select
              name="perPage"
              value={perPage}
              id="perPage"
              className="page-select"
              onChange={this.handleChange}
              disabled={isFetching}
            >
              {options(itemsPerPage)}
            </select>
            <li>Items per page</li>
          </ul>
        </div>
        <div className="showingBlock">
          <ul className="pagination">
            <li>
              <button
                id="previous"
                onClick={this.handlePrevious}
                className={!isFetching && hasPrevious ? 'enabled' : 'disabled'}
              >
                Previous
              </button>
            </li>
            <li className="results">
              <ul>
                <span>Showing {reverse ? '' : 'page'}</span>
                <select
                  className="totalPage"
                  id="totalPage"
                  name="page"
                  value={page}
                  onChange={this.handleChange}
                  disabled={isFetching}
                >
                  {[...Array(totalPages).keys()].map(item => (
                    <option key={item}>{item + 1}</option>
                  ))}
                </select>
                {!reverse && <span className="pageNum"> of {totalPages}</span>}
                {reverse && (
                  <span className="pageNum reverse">
                    {' '}
                    of {totalPages} Results
                  </span>
                )}
              </ul>
            </li>
            <li>
              <button
                id="next"
                onClick={this.handleNext}
                className={hasNext && !isFetching ? 'enabled' : 'disabled'}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Pagination.propTypes = {
  perPage: PropTypes.number, // eslint-disable-line
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  totalPages: PropTypes.number,
  handleData: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataFetched: PropTypes.bool,
  isFetching: PropTypes.bool,
};

Pagination.defaultProps = {
  perPage: 5,
  itemsPerPage: [5, 10, 20, 50],
  totalPages: 4,
  currentPage: 1,
  hasNext: true,
  hasPrevious: false,
  reverse: false,
  dataFetched: true,
  isFetching: false,
};

export default Pagination;
