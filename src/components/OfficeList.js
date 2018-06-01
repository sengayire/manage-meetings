import React from 'react';
import Office from './Office';
import AddOffice from './AddOffice';
import officeList from '../fixtures/offices';
import '../assets/styles/officelist.scss';

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
        <AddOffice />
        <div className="settings-offices-list">
          <table>
            <colgroup>
              <col className="first-col" />
              <col />
              <col />
              <col className="last-col" />
            </colgroup>
            <thead>
              <tr>
                <th>Office</th>
                <th>Location</th>
                <th>Time Zone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.offices.map(office => <Office office={office} key={office.name} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OfficeList;
