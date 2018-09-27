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

  handleNext = () => {
    const { page, perPage } = this.state;
    this.props.handleData(perPage, page + 1);
    this.setState({
      page: page + 1,
    });
  }

  handlePrevious = () => {
    const { page, perPage } = this.state;
    this.props.handleData(perPage, page - 1);
    this.setState({
      page: page - 1,
    });
  }

  render() {
    const { page, perPage } = this.state;
    const {
      itemsPerPage, totalPages, hasNext, hasPrevious,
    } = this.props;

    return (
      <nav className="page-navigation">
        <div>
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

        <ul className="pagination">
          <button
            id="previous"
            onClick={this.handlePrevious}
            className={hasPrevious ? 'enabled' : 'disabled'}
          >
            Previous
          </button>
          <li id="show">Showing page</li>
          <select
            className="totalPage"
            name="page"
            value={page}
            onChange={this.handleChange}
          />
          <button id="previous" onClick={this.handlePrevious} className={hasPrevious ? 'enabled' : 'disabled'}>Previous</button>
          <li>Showing page</li>
          <select className="totalPage" name="page" value={page} onChange={this.handleChange}>
            {[...Array(totalPages).keys()].map(item => (
              <option key={item}>{item + 1}</option>
            ))}
          </select>
          <li>of</li>
          <li className="pageNum">{totalPages}</li>
          <button
            id="next"
            onClick={this.handleNext}
            className={hasNext ? 'enabled' : 'disabled'}
          >
            Next
          </button>
        </ul>
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
};

Pagination.defaultProps = {
  itemsPerPage: [5, 10, 20, 50],
  totalPages: 4,
  hasNext: true,
  hasPrevious: false,
};

export default Pagination;
