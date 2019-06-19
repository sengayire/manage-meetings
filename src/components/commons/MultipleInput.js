import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/multipleInput.scss';
import { X } from './SVGs';

const MultipleInput = ({ submit, initialValue, placeholder }) => {
  const [currentItem, updateCurrentItem] = useState('');
  const [existingItems, updateExistingItems] = useState(initialValue || []);

  useEffect(() => {
    submit(existingItems);
  }, [existingItems]);

  const handleUpdate = () => {
    if (currentItem.length <= 1) {
      return;
    }
    if (!existingItems.includes(currentItem)) {
      updateExistingItems([...existingItems, currentItem]);
    }
    updateCurrentItem('');
  };

  const onKeyDown = (e) => {
    const key = e.keyCode || e.charCode;

    if ((key === 8 || key === 46) && currentItem === '' && existingItems[0]) updateExistingItems(existingItems.slice(0, -1));

    if (key === 13) {
      handleUpdate();
    }
  };

  const onChange = ({ target: { value } }) => {
    if (value.includes(',')) {
      handleUpdate();
    } else {
      updateCurrentItem(value);
    }
  };

  const handleRemove = itemToDelete =>
    updateExistingItems(existingItems.filter(item => item !== itemToDelete));

  const renderExistingItems = () => existingItems.map(item => (
    <div className="multiple-input__item" key={item}>
      <button onClick={() => handleRemove(item)}><X /></button>
      <div className="multiple-input__item__text">
        <p>
          {item}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="multiple-input">
      {
        existingItems[0] && (
        <div className="multiple-input__items">
          {renderExistingItems()}
        </div>
        )
      }
      <div className="multiple-input__input-container question-form inputs">
        <input
          className="multiple-input__input"
          type="text"
          placeholder={placeholder}
          value={currentItem}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

MultipleInput.propTypes = {
  initialValue: PropTypes.instanceOf(Array),
  submit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

MultipleInput.defaultProps = {
  initialValue: undefined,
  placeholder: 'Enter Value',
};

export { MultipleInput as default };
