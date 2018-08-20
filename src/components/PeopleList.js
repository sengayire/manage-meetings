import React from 'react';
import '../assets/styles/peopleList.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import People from './People';
import PeopleFixures from '../fixtures/people';

const peopleListItems = PeopleFixures.map(person => (
  <People people={person} key={person.name} />
));
const PeopleList = () => (
  <div className="settings-people-list">
    <div className="action-menu">
      <p className="sort-by">Sort by: <span className="location">Location</span></p>
    </div>
    <table>
      <ColGroup />
      <TableHead titles={['Name', 'Location', 'Access Level', 'Action']} />
      <tbody>
        {peopleListItems}
      </tbody>
    </table>
  </div>
);
export default PeopleList;
