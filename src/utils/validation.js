import intersection from 'lodash/intersection';

const isEmpty = value => value === undefined || value === null || value === '';
const MIN = 3;
const MAX = 32;
const ENUMERATION = ['O', 'l', 'i'];

export const validatePassword = (name, value) => {
  let errors = {};
  const valueAsArray = value.split('');
  const alphabeticalValues = [...value].filter((v, i) => {
    if (value.charAt(i+1) < v) {
      return false;
    } else if ((value.charCodeAt(i+1) - value.charCodeAt(i)) > 1) {
      return false;
    }
    return true;
  });
  const isValueAlphabetical = alphabeticalValues.length > 0;

  errors[name] = [];

  if (isEmpty(value)) {
    errors[name] = [...errors[name], 'Required'];
  }

  if (!isEmpty(value) && value.length < MIN) {
    errors[name] = [...errors[name], `Must be at least ${MIN} characters`];
  }

  if (!isEmpty(value) && value.length > MAX) {
    errors[name] = [...errors[name], `Must be no more than ${MAX} characters`];
  }

  if (intersection(ENUMERATION, valueAsArray).length > 0) {
    errors[name] = [...errors[name], `Must not be one of: ${ENUMERATION.join(', ')}`];
  }

  if (/[A-Z]/.test(value)) {
    errors[name] = [...errors[name], 'Must only contain lowercase letters'];
  }

  if (!/^[a-z]+$/i.test(value)) {
    errors[name] = [...errors[name], 'Must be letters only'];
  }

  if (!isValueAlphabetical) {
    errors[name] = [...errors[name], 'Must be in alphabetical order e.g xyz, abc'];
  }

  if (/(.).*\1/.test(value)) {
    errors[name] = [...errors[name], 'Must contain non-overlapping characters'];
  }

  return errors;
}