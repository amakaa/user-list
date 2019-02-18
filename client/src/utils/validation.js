const isEmpty = value => value === undefined || value === null || value === '';
let errors = {};

export const validate = (name, value, required) => {
  errors[name] = [];

  if (isEmpty(value) && required) {
    errors[name] = [...errors[name], 'Required'];
  }

  switch(name) {
    case 'name':
    case 'street':
    case 'city':
      if (!/^[a-z\s]+$/i.test(value)) {
        errors[name] = [...errors[name], 'Must be letters only'];
      }
      break;
    case 'email':
      if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(value)) {
        errors[name] = [...errors[name], 'Must be a valid email address'];
      }
      break;
    case 'phone':
      if (!/^[+]?[(]?[0-9]{2,3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{1,9}$/i.test(value)) {
        errors[name] = [...errors[name], 'Must be a valid phone number'];
      }
      break;
    case 'number':
    case 'zipcode':
      if (!/^[0-9](\/?[0-9a-z])*\/?$/.test(value)) {
        errors[name] = [...errors[name], 'Must start with a number and contain alphanumeric characters only'];
      }
      break;
    default:
      break;
  }

  return errors;
}