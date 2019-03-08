import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';

import { FormControl, TextField, Button, InputLabel, NativeSelect, Input } from '@material-ui/core';

import { createUser, editUser, loadUsers } from '../../redux/modules/users';
import { validate } from '../../utils/validation';


const styles = {
  selectForm: {
    marginLeft: "0"
  },
  btnSubmit: {
    marginTop: "20px"
  },
  mainSignUpPage: {
    marginTop: "70px"
  }
}

export const CustomTextField = ({
  required,
  id,
  label,
  onChange,
  value,
  identifier,
  errors,
}) => (
  <TextField
    required={required}
    id={id}
    label={label}
    className="form-control"
    value={value}
    onChange={onChange}
    margin="normal"
    helperText={errors && errors[identifier] && errors[identifier].join(', ')}
    error ={errors && errors[identifier] && errors[identifier].length > 0}
  />
);

export const SubmitButton = ({ classes, handleSubmit, errors, name, email, phone }) => (
  <Button
    color="primary"
    variant="contained"
    className={`btn btn-success ${ classes && classes.btnSubmit}`}
    onClick={handleSubmit}
    disabled={(!name || !email || !phone || (errors && errors.length > 0))}
  >
    Submit
  </Button>
);

class SignUp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      errors: props.error,
    };
  }

  static get defaultProps() {
    return {
      user: {
        name: '',
        gender: '',
        phone: '',
        address: [{
          number: '',
          street: '',
          city: '',
          zipcode: ''
        }],
      },
      errors: null,
    };
  }

  handleChange = (name, required) => event => {
    const { target: { value } } = event;
    const errors = validate(name, value, required);
    const { user: { address } } = this.state;

    if (Object.keys(address[0]).includes(name)) {
      this.setState({
        user: {
          ...this.state.user,
          address: [{
            ...address[0],
            [name]: value,
          }],
        },
        errors
      });
    } else {
      this.setState({ user: { ...this.state.user, [name]: value }, errors });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { dispatch, history, edit, onClose } = this.props;

    if (edit) {
      dispatch(editUser(user, user.id))
        .then(() => dispatch(loadUsers()));
      onClose();
    } else {
      dispatch(createUser(user))
      .then(() => dispatch(loadUsers()));
      history.push('/users/');
    }
    
    this.setState({
      user: {
        ...this.state.user,
        name: '',
        gender: '',
        phone: '',
        email: '',
        address: [{
          number: '',
          street: '',
          city: '',
          zipcode: ''
        }],
      },
      errors: null,
    });
  }

  render() {
    const {
      user: {
        name = '',
        gender = '',
        phone = '',
        email = '',
        address = [],
      },
      errors
    } = this.state;
    const { edit, classes } = this.props;

    return (
      <div className={`container signUpPage ${!edit && classes.mainSignUpPage}`}>
        <Helmet title="SignUp" />
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <CustomTextField
                required
                id="standard-name"
                label="Name"
                value={name}
                onChange={this.handleChange('name', true)}
                identifier="name"
                errors={errors}
              />
            </div>

            <div className="form-group">   
            <FormControl className={classes.selectForm}>
              <InputLabel htmlFor="filled-age-simple">Gender</InputLabel>
              <NativeSelect
                value={gender}
                onChange={this.handleChange('gender')}
                input={<Input name="gender" id="uncontrolled-native" />}
              >
                <option value='' />
                <option value="None">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </NativeSelect>
            </FormControl>
            </div>

            <div className="form-group">   
              <CustomTextField
                required
                id="standard-email"
                label="Email"
                value={email}
                onChange={this.handleChange('email', true)}
                identifier="email"
                errors={errors}
              />
            </div>

            <div className="form-group">   
              <CustomTextField
                required
                id="standard-phone"
                label="Phone"
                value={phone}
                onChange={this.handleChange('phone', true)}
                identifier="phone"
                errors={errors}
              />
            </div>

            <div className="form-group">   
              <CustomTextField
                id="standard-street"
                label="Street"
                value={address[0].street}
                onChange={this.handleChange('street')}
                identifier="street"
                errors={errors}
              />
            </div>

            <div className="form-group">   
              <CustomTextField
                id="standard-number"
                label="Number"
                value={address[0].number}
                onChange={this.handleChange('number')}
                identifier="number"
                errors={errors}
              />
            </div>

            <div className="form-group">   
              <CustomTextField
                id="standard-city"
                label="City"
                value={address[0].city}
                onChange={this.handleChange('city')}
                identifier="city"
                errors={errors}
              />
            </div>

            <div className="form-group">   
              <CustomTextField
                id="standard-zipcode"
                label="Zipcode"
                value={address[0].zipcode}
                onChange={this.handleChange('zipcode')}
                identifier="zipcode"
                errors={errors}
              />
            </div>

            <div className="form-group">
              <SubmitButton
                classes={classes}
                handleSubmit={this.handleSubmit}
                errors={errors}
                name={name}
                email={email}
                phone={phone}
              />
            </div>
          </form>
      </div>
    );
  }
}

SignUp = connect()(SignUp)


export default withStyles(styles)(SignUp);