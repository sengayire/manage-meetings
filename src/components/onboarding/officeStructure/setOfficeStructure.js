/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SelectionDropdown from '../../commons/selectionDropdown';
import BuildingCard from '../../commons/BuildingCard';
import InputWithNumbers from '../../commons/numberInput';
import InputsWithAddIcons from '../../commons/AddIconInput/index';
import backIcon from '../../../assets/images/ic_back.svg';
import '../../../assets/styles/officeStructure.scss';

const SetOfficeStructure = ({
  blocks,
  activeBlock,
  handleLeveltype,
  onChangeValue,
  inputValue,
  onInputChange,
  toggleBlock,
  levelType,
}) => (
  <Fragment>
    <div className="structure-title-container">
      <div className="back_icon">
        <img src={backIcon} alt="back icon" />
      </div>
      <span className="structure-title">Office Structure</span>
    </div>
    <span className="set-structure-title">
      Set the structure of your Center
    </span>
    <BuildingCard blocks={blocks} activeBlock={activeBlock} toggleBlock={toggleBlock} />
    <span className="set-structure-labels">Select Level Type for Block A</span>
    <SelectionDropdown handleLeveltype={handleLeveltype} levelType={levelType} />
    <span className="set-structure-labels">How many floors are in Block A</span>
    <InputWithNumbers onChangeValue={onChangeValue} inputValue={inputValue} />
    <span className="set-structure-labels">Name your floors</span>
    <InputsWithAddIcons onInputChange={onInputChange} />
  </Fragment>
);

SetOfficeStructure.propTypes = {
  blocks: PropTypes.array,
  activeBlock: PropTypes.string,
  handleLeveltype: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  toggleBlock: PropTypes.func.isRequired,
  levelType: PropTypes.string.isRequired,
};

SetOfficeStructure.defaultProps = {
  blocks: [],
  activeBlock: '',
};

export default SetOfficeStructure;
