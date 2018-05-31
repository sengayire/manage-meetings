import React from 'react';
import Office from './Office';
import offices from '../../fixtures/offices';
import AddOffice from './AddOffice';

class OfficeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offices: offices(),
    };
  }

  render() {
    return (
      <div className="settings-offices">
        <AddOffice />
        <div className="settings-offices-table">
          <table>
            <thead>
              <tr>
                <th>Office</th>
                <th>Location</th>
                <th>Time Zone</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              <col className="first-col" />
              <col />
              <col />
              <col span="2" className="last-col" />
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
