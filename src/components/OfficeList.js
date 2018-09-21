import React from 'react';
import Office from './Office';
import AddOffice from './AddOffice'; // eslint-disable-line
import officeList from '../fixtures/offices';
import '../assets/styles/officelist.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';

class OfficeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offices: officeList,
    };
  }

  render() {
    return (
      <div className="settings-offices">
        <div className="settings-offices-control">
          <AddOffice />
        </div>
        <div className="settings-offices-list">
          <table>
            <ColGroup />
            <TableHead titles={['Office', 'Location', 'Timezone', 'Actions']} />
            <tbody>
              {this.state.offices.map(office => (
                <Office office={office} key={office.name} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OfficeList;
