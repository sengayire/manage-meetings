import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SelectInput } from '../commons';
import stripTypenames from '../helpers/StripTypeNames';
import { orderByLevel } from '../../utils/formatSetupData';
import { getRoomsStructure } from '../helpers/QueriesHelpers';
import { dataTree, getNestedChildren } from '../helpers/ParseOfficeStructure';
import removeFilter from '../commons/RemoveFilter';
import clearImg from '../../assets/images/clearImg.png';

class LocationFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOptions: [],
      level1: '',
      level2: '',
      secondLevelMenu: '',
      thirdLevelMenu: '',
    };
  }

  componentDidMount() {
    this.getStructureData();
  }
  /**
   * get the data of all structures
   *
   *  @returns {void}
   */
  getStructureData = async () => {
    const allTheStructures = await getRoomsStructure();
    const { allStructures } = allTheStructures;
    const formattedData = orderByLevel(stripTypenames(allStructures));
    const structuredData = dataTree(formattedData);
    const parsed = getNestedChildren(structuredData, structuredData[0].parentId);
    const dropDownOptions = parsed && this.generateDropDownArray(parsed);
    this.setState({
      dropDownOptions,
    });
  }

  /**
  * generates a drop down array from formatted location data
  *
  *  @returns {array}
  */
  generateDropDownArray = (array) => {
    const optionsDropDown = [];
    array.forEach((data) => {
      const dropDown = {
        levels: [],
      };
      dropDown.name = data.name;
      dropDown.tag = data.tag;
      dropDown.value = data.name;
      dropDown.structureId = data.structureId;
      data.children.forEach((dataChild1) => {
        const info1 = {
          levels: [],
        };
        info1.name = dataChild1.name;
        info1.tag = dataChild1.tag;
        info1.value = dataChild1.name;
        info1.structureId = dataChild1.structureId;

        dropDown.levels.push(info1);

        dataChild1.children && dataChild1.children.forEach((dataChild2) => {
          const info2 = {
            levels: [],
          };
          info2.name = dataChild2.name;
          info2.tag = dataChild2.tag;
          info2.value = dataChild2.name;
          info2.structureId = dataChild2.structureId;
          info1.levels.push(info2);
        });
      });
      optionsDropDown.push(dropDown);
    });
    return optionsDropDown;
  };

  initialArray = (array) => {
    const menu = {
      name: '',
      id: '',
      value: '',
      options: [],
      isValue: true,
      tag: '',
    };
    array.forEach((data) => {
      menu.name = data.tag;
      menu.id = data.tag;
      menu.value = data.tag;
      menu.options.push({ name: data.name, structureId: data.structureId });
      menu.tag = data.tag;
    });
    return menu;
  };

  /**
   * Capitalizes first letter of string
   * and returns the new string
   *
   * @param {string}
   *
   * @returns {string}
   */
  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  generateMoreMenu = (value, level, state) => {
    this.setState({ [`${level}`]: value[1] });
    let menuArray;
    let secondMenuArray;
    let secondMenuArrayContainer;
    if (level === 'level1') {
      secondMenuArray = false;
      menuArray = this.state.dropDownOptions.filter(data => data.name === value[1]);
      this.setState({ thirdLevelMenu: '' });
    }
    if (level === 'level2') {
      menuArray = false;
      secondMenuArrayContainer = this.state.dropDownOptions.filter(
        data => data.name === this.state.level1,
      );
      secondMenuArray = secondMenuArrayContainer[0].levels.filter(
        data => data.name === value[1],
      );
    }
    const arrayArgument = (menuArray && menuArray.length > 0 && menuArray[0].levels) ||
      (secondMenuArray.length > 0 && secondMenuArray[0].levels) ||
      [];
    const moreMenu = this.initialArray(arrayArgument);
    this.setState({ [`${state}`]: moreMenu });
  }


  /**
* It handles creating of select input
*
* @returns {jsx}
*/
  createSelectInputs = () => {
    const {
      handleInputChange, wrapperClassName, selectInputClassName, displayTitle, className,
    } = this.props;
    const { dropDownOptions, secondLevelMenu, thirdLevelMenu } = this.state;
    const menu = this.initialArray(dropDownOptions);
    const {
      name, id, value, options, isValue, tag,
    } = menu;
    const propsName = this.props.name;
    return (
      <Fragment>
        <Fragment>
          <div key={id} className={className}>
            <SelectInput
              labelText={displayTitle ? this.capitalizeFirstLetter(tag) : null}
              wrapperClassName={wrapperClassName}
              name={propsName || name}
              id={id}
              value={value}
              onChange={(event) => {
                this.generateMoreMenu([event.target.name, event.target.value], 'level1', 'secondLevelMenu'); handleInputChange(event, 1);
              }}
              selectInputClassName={selectInputClassName}
              placeholder="Select a Building"
              options={options}
              isValue={isValue}
            />
          </div>

          {this.state.level1 !== '' &&
            (
              <div key={secondLevelMenu.id} className={className}>
                <SelectInput
                  labelText={displayTitle ? this.capitalizeFirstLetter(secondLevelMenu.tag) : null}
                  wrapperClassName={wrapperClassName}
                  name={propsName || secondLevelMenu.name}
                  id={secondLevelMenu.id}
                  value={secondLevelMenu.value}
                  onChange={(event) => { this.generateMoreMenu([event.target.name, event.target.value], 'level2', 'thirdLevelMenu'); handleInputChange(event, 2); }}
                  selectInputClassName={selectInputClassName}
                  placeholder="Select a Floor"
                  options={secondLevelMenu.options}
                  isValue={secondLevelMenu.isValue}
                />
              </div>
            )
          }

          {this.state.level1 !== '' &&
            this.state.level2 !== '' &&
            (this.state.thirdLevelMenu.options && this.state.thirdLevelMenu.options.length > 0) &&
            (
              <div key={thirdLevelMenu.id} className={className}>
                <SelectInput
                  labelText={displayTitle ? this.capitalizeFirstLetter(thirdLevelMenu.tag) : null}
                  wrapperClassName={wrapperClassName}
                  name={propsName || thirdLevelMenu.name}
                  id={thirdLevelMenu.id}
                  value={thirdLevelMenu.value}
                  onChange={event => handleInputChange(event, 2)}
                  selectInputClassName={selectInputClassName}
                  placeholder="Select a Wing"
                  options={thirdLevelMenu.options}
                  isValue={thirdLevelMenu.isValue}
                />
              </div>
            )
          }
        </Fragment>
        {(this.props.showClearFilter && this.state.level1) && removeFilter(this.handleClearClick, 'Clear filters', clearImg, 'reset-image')}
      </Fragment>
    );
  };

  /**
  * It handles reset click
  *
  * @returns {void}
  */

  handleClearClick = () => {
    document.getElementById('LocationFilters').reset();
    this.setState({ level1: '', level2: '' });
    this.props.handleInputChange({ target: { name: '', value: '' } }, 'reset');
  }

  render() {
    return (
      this.createSelectInputs()
    );
  }
}

LocationFilters.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  wrapperClassName: PropTypes.string.isRequired,
  selectInputClassName: PropTypes.string.isRequired,
  displayTitle: PropTypes.bool.isRequired,
  className: PropTypes.string,
  showClearFilter: PropTypes.bool,
};
LocationFilters.defaultProps = {
  name: '',
  className: '',
  showClearFilter: false,
};

export default LocationFilters;
