import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../assets/styles/officeStructure.scss';

class SelectionDropdown extends Component {
  state = {
    levelTypesOptions: [
      {
        key: 'fl',
        value: 'Floors',
        text: 'Floors',
      },
      {
        key: 'wi',
        value: 'Wings',
        text: 'Wings',
      },
    ],
  };

  render() {
    const { levelTypesOptions } = this.state;
    const { handleLeveltype, levelType } = this.props;
    return (
      <div className="level-type-dropdown">
        <Dropdown
          placeholder="Select Level Types"
          fluid
          search
          selection
          options={levelTypesOptions}
          onChange={handleLeveltype}
          value={levelType}
        />
      </div>
    );
  }
}

SelectionDropdown.propTypes = {
  handleLeveltype: PropTypes.func.isRequired,
  levelType: PropTypes.isRequired,
};

export default SelectionDropdown;
