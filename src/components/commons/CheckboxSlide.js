import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../../assets/styles/checkboxSlide.scss';
import notification from '../../utils/notification';
import { getItemFromLocalStorage } from '../../utils/Utilities';

/**
 * Builds reusable component for checkboxes
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const CheckboxSlide = (props) => {
  const changeStatus = (event) => {
    const { updateQuestion, questionId } = props;
    const checkbox = event.target.nextSibling;
    let isActive;

    if (checkbox.classList.contains('checked')) {
      checkbox.classList.remove('checked');
      checkbox.classList.add('false');
      isActive = false;
    } else {
      checkbox.classList.remove('false');
      checkbox.classList.add('checked');
      isActive = true;
    }

    updateQuestion({
      variables: { isActive, questionId },
    })
      .then(() => {
        if (isActive) {
          return notification(toastr, 'success', 'Question successfully activated')();
        }
        return notification(toastr, 'success', 'Question successfully deactivacted')();
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        if (checkbox.classList.contains('checked')) {
          checkbox.classList.remove('checked');
          checkbox.classList.add('false');
        } else {
          checkbox.classList.remove('false');
          checkbox.classList.add('checked');
        }

        notification(toastr, 'error', 'Your request was not successful. Please try again.')();
      });
  };
  const access = getItemFromLocalStorage('access');
  return (
    <label className="switch" htmlFor="CheckboxSlide">
      <input
        type="checkbox"
        className="checkbox"
        onChange={changeStatus}
        disabled={parseInt(access, 10) === 1}
      />
      <span className={`${props.checked && 'checked'} slider round`} />
    </label>
  );
};

CheckboxSlide.propTypes = {
  checked: PropTypes.bool,
  updateQuestion: PropTypes.func.isRequired,
  questionId: PropTypes.number,
};

CheckboxSlide.defaultProps = {
  checked: false,
  questionId: 0,
};

export default CheckboxSlide;
