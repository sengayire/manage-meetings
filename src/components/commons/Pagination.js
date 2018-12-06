import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/pagination.scss';

const options = array =>
  array.map(item => <option key={item + 1}>{item}</option>);

class Pagination extends Component {
  state = {
    perPage: 5,
    page: 1,
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { perPage } = this.state;
    const { handleData } = this.props;

    if (name === 'perPage') {
      this.setState({ perPage: parseFloat(value), page: 1 }, () => {
        handleData(value, 1);
      });
    }
    if (name === 'page') {
      this.setState({ page: parseFloat(value), perPage }, () => {
        handleData(perPage, value);
      });
    }
  };

  handleNext = () => {
    const { page, perPage } = this.state;
    this.props.handleData(perPage, page + 1);
    this.setState({
      page: page + 1,
    });
  };

  handlePrevious = () => {
    const { page, perPage } = this.state;
    this.props.handleData(perPage, page - 1);
    this.setState({
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
};

Pagination.defaultProps = {
  itemsPerPage: [5, 10, 20, 50],
  totalPages: 4,
  hasNext: true,
  hasPrevious: false,
  reverse: false,
};

export default Pagination;
