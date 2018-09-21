import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Office from './Office';
import AddOffice from './AddOffice'; // eslint-disable-line
import '../assets/styles/officelist.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';

import { GET_ALL_OFFICES } from '../graphql/queries/Offices';

export const OfficeList = (props) => {
  const { allOffices: { offices } = {}, loading } = props.allOffices;
  return (
    loading ? <h2>Loading...</h2> :
    <div className="settings-offices">
      <div className="settings-offices-control">
        <AddOffice />
      </div>
      <div className="settings-offices-list">
        <table>
          <ColGroup />
          <TableHead titles={['Office', 'Location', 'Timezone', 'Action']} />
          <tbody>
            {offices && offices.map(office => (
              <Office
                office={office}
                key={office.name}
                officeId={office.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

OfficeList.propTypes = {
  allOffices: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
      timeZone: PropTypes.string,
    }),
  }),
};

OfficeList.defaultProps = {
  allOffices: {
    id: 1,
    name: 'Epic tower',
    location: {
      name: 'Lagos',
      timeZone: 'WEST_AFRICA_TIME',
    },
  },
};

export default graphql(GET_ALL_OFFICES, { name: 'allOffices' })(OfficeList);
