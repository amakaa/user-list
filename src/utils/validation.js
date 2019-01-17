const isEmpty = value => value === undefined || value === null || value === '';
const MIN = 3;
const MAX = 32;
const ENUMERATION = ['O', 'l', 'i'];

export const validatePassword = (name, value) => {
  let errors = {};
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

  if (~ENUMERATION.indexOf(value.split())) {
    errors[name] = [...errors[name], `Must not be one of: ${ENUMERATION.join(', ')}`];
  }

  if (/[A-Z]/.test(value)) {
    errors[name] = [...errors[name], 'Must only contain lowercase letters'];
  }

  if (/(.).*\1/.test(value)) {
    errors[name] = [...errors[name], 'Must contain non-overlapping characters'];
  }

  console.log(value, errors, ENUMERATION.includes(value))
  return errors;
}