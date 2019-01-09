import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/pagination.scss';

const options = array =>
  array.map(item => <option key={item + 1}>{item}</option>);

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 5,
      page: 1,
    };
  }

  componentWillMount() {
    const { currentPage } = this.props;
    this.setState({ page: currentPage });
  }

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

  handleNext = () => {
    const { handleData, dataFetched } = this.props;
    const { page, perPage } = this.state;
    handleData(perPage, page + 1);
    dataFetched && this.setState({
      page: page + 1,
    });
  };

  handlePrevious = () => {
    const { page, perPage } = this.state;
    const { handleData, dataFetched } = this.props;
    handleData(perPage, page - 1);
    dataFetched && this.setState({
      page: page - 1,
    });
  };

  render() {
    const { page, perPage } = this.state;
    const {
      itemsPerPage, totalPages, hasNext, hasPrevious, reverse,
    } = this.props;

    return (
      <nav className="page-navigation">
        <div className="perPageBlock">
          <ul className="pagination">
            <select
              className="page-select"
              name="perPage"
              value={perPage}
              onChange={this.handleChange}
            >
              {options(itemsPerPage)}
            </select>
            <li>Items per page</li>
          </ul>
        </div>
        <div className="showingBlock">
          <ul className="pagination">
            <li>
              <button id="previous" onClick={this.handlePrevious} className={hasPrevious ? 'enabled' : 'disabled'}>Previous</button>
            </li>
            <li className="results">
              <ul>
                <span>Showing {reverse ? '' : 'page'}</span>
                <select className="totalPage" name="page" value={page} onChange={this.handleChange}>
                  {[...Array(totalPages).keys()].map(item => (
                    <option key={item}>{item + 1}</option>
                  ))}
                </select>
                {!reverse && <span className="pageNum"> of {totalPages}</span>}
                {reverse && <span className="pageNum reverse"> of {totalPages} Results</span>}
              </ul>
            </li>
            <li>
              <button id="next" onClick={this.handleNext} className={hasNext ? 'enabled' : 'disabled'}>Next</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  totalPages: PropTypes.number,
  handleData: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataFetched: PropTypes.bool,
};

Pagination.defaultProps = {
  itemsPerPage: [5, 10, 20, 50],
  totalPages: 4,
  currentPage: 1,
  hasNext: true,
  hasPrevious: false,
  reverse: false,
  dataFetched: true,
};

export default Pagination;
