import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import toastr from 'toastr';
import '../../assets/styles/checkboxSlide.scss';
import notification from '../../utils/notification';

/**
 * Give the user feedback based on the action carried on the checkboxSlide
 *
 * @param {boolean} isActive - status of the CheckboxSlide
 */
const notifyUser = (isActive) => {
  if (isActive) return notification(toastr, 'success', 'Successfully activated')();
  return notification(toastr, 'success', 'Successfully deactivated')();
};

/**
 * Updates the cache after the mutation was successful
 *
 * @param {Object} store - A reference to the apollo-cache store/cache
 * @param {Object} dataUpdated - data returned after the mutation executes
 * @param {number} Id - unique id of the entity the mutation was carried on
 * @param {string} updateQuery - The graphQL query to be called after the mutation executes
 */
export const updateCache = (store, dataReturned, Id, updateQuery) => {
  const questionUpdated = dataReturned.data.updateQuestion.question;
  const data = store.readQuery({
    query: updateQuery,
  });
  const dataToUpdate = data.questions.questions.find(question => parseInt(question.id, 10) === Id);
  dataToUpdate.isActive = questionUpdated.isActive;
  store.writeQuery({ query: updateQuery, data });
};

/**
 * Changes the state of the checkbox slide by adding or removing either
 * the 'checked' or 'false' class and then calling the mutation function
 *
 * @param {Object} event - event object of the DOM element
 * @param {method} mutation - the mutation function provided by react-apollo
 */
export const updateStatus = (event, mutation = null) => {
  const checkbox = event.target.nextSibling;
  if (checkbox.classList.contains('checked')) {
    checkbox.classList.remove('checked');
    checkbox.classList.add('false');
    notifyUser(false);
  } else {
    checkbox.classList.remove('false');
    checkbox.classList.add('checked');
    notifyUser(true);
  }
  mutation && mutation();
};

/**
 * Renders the HTML of the checkboxSlide component
 *
 * @param {boolean} isChecked - determines if the 'checked' class attribute
 * should be added to the checkbox tag
 * @param {method} mutation - The mutation we want to execute when an action is performed
 */
export const checkboxSlideHTML = (isChecked, mutation) => (
  <label className="switch" htmlFor="CheckboxSlide">
    <input
      type="checkbox"
      className="checkbox"
      onChange={event => updateStatus(event, mutation)}
    />
    <span className={`${isChecked && 'checked'} slider round`} />
  </label>
);

/**
 * This gets rendered when we want to perform a mutation
 * anytime we click on the checkboxSlide
 *
 * @param {object} props - restructured props
 */
export const performMutation = ({
  isChecked, questionId, mutationQuery, updateQuery,
}) => (
  <Mutation
    mutation={mutationQuery}
    variables={{ isActive: !isChecked, questionId }}
    update={(store, dataReturned) => (
      updateCache(store, dataReturned, questionId, updateQuery)
    )}
  >
    {mutation => checkboxSlideHTML(isChecked, mutation)}
  </Mutation>
);

/**
 * @param {object} prop - The props passed down from the parent component
 */
const CheckboxSlide = (prop) => { // eslint-disable-line
  switch (prop.actionToPerform) {
    case 'mutation':
      return performMutation(prop);
    default:
  }
};

performMutation.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  questionId: PropTypes.number.isRequired,
  mutationQuery: PropTypes.string,
  updateQuery: PropTypes.string,
};

performMutation.defaultProps = {
  mutationQuery: '',
  updateQuery: '',
};

export default CheckboxSlide;
