import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Wing from './wings'; // eslint-disable-line
import AddWing from './addWing'; // eslint-disable-line
import '../assets/styles/officelist.scss';
import ColGroup from './helpers/ColGroup';
import TableHead from './helpers/TableHead';
import { GET_ALL_WINGS } from '../graphql/queries/wings';
import MenuTitle from './MenuTitle';
import Spinner from './commons/Spinner';

export const WingList = (props) => {
  const { allWings, loading } = props.allWings;
  return (
    /* istanbul ignore next */
    loading ? <Spinner /> :
    <div>
      <div className="settings-offices">
        <div className="settings-offices-control">
          <MenuTitle title="Wings" />
          <AddWing />
        </div>
        <div className="settings-offices-list">
          <table>
            <ColGroup />
            <TableHead titles={['Wing', 'Block', 'Floor', 'Action']} />
            <tbody>
              {allWings && allWings.map(wing => (
                <Wing
                  wing={wing}
                  key={wing.name}
                  wingId={wing.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

WingList.propTypes = {
  allWings: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

WingList.defaultProps = {
  allWings: {
    id: 1,
    name: '',
  },
};

export default graphql(GET_ALL_WINGS, { name: 'allWings' })(WingList);

