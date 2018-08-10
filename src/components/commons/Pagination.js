import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/pagination.scss';

const options = array => (
  array.map(item =>
    <option key={item}>{item}</option>)
);

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 5,
      page: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'perPage') {
      this.setState({ perPage: value, page: 1 });
    } else {
      this.setState({ page: value });
    }
  }

  render() {
    const { page, perPage } = this.state;
    const { itemsPerPage, totalPages } = this.props;

    return (
      <nav className="page-navigation">
        <ul className="pagination">
          <select className="perPage" name="perPage" value={perPage} onChange={this.handleChange}>
            {options(itemsPerPage)}
          </select>
          <li>Items per page</li>
        </ul>
        <ul className="pagination">
          <li className="disabled">Previous</li>
          <li>Showing Page</li>
          <select name="page" value={page} onChange={this.handleChange}>
            {[...Array(totalPages)].map((n, item) => (
              <option key={n}>{item + 1}</option>
                    ))}
          </select>
          <li>of</li>
          <li className="pageNum">{totalPages}</li>
          <li className="disabled">Next</li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  totalPages: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  itemsPerPage: [5, 10, 20, 50],
};

export default Pagination;
