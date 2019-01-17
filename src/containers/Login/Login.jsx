import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { debounce } from 'lodash';
import * as authActions from '../../redux/modules/auth';
import { validatePassword } from '../../utils/validation';

import TextField from '@material-ui/core/TextField';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';

const styles = require('./Login.scss');

class Login extends Component {
  constructor(props) {
    super(props);


    this.state = {
      username: '',
      password: '',
      error: null,
    };

    this.emitChangeDebounced = debounce(this.emitChangeDebounced, 100)
  }

  handleChange = name => event => {
    const { target: { value } } = event;
    this.emitChangeDebounced(name, value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.state.username;

    this.props.login(input);
    this.props.history.push("/jokes/");
    this.setState({
      username: '',
    });
  }

  handlePasswordChange = (name, value) => {
    this.validatePasswordEntry(name, value);
  }

  validatePasswordEntry = (name, password) => {
    const errors = validatePassword(name, password);

    this.setState({
      error: errors.password,
      password,
    })
  }

  emitChangeDebounced (name, value) {
    if (name === 'password') {
      this.handlePasswordChange(name, value);
    }

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { user } = this.props;
    const { username, error, password } = this.state;

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">   
              <TextField
                id="standard-name"
                placeholder="Enter a username"
                label="Username"
                className="form-control"
                value={username}
                onChange={this.handleChange('username')}
                margin="normal"
              />
            </div>

            <div className="form-group">
              <TextField
                required
                error ={error && error.length > 0}
                id="standard-password-input"
                placeholder="Enter a password"
                label="Password"
                className="form-control"
                type="password"
                autoComplete="current-password"
                margin="normal"
                helperText={error && error.join(', ')}
                onChange={this.handleChange('password')}
              />
            </div>
            <CustomButton
              color="primary"
              variant="contained"
              className="btn btn-success"
              title="Submit"
              handleClick={this.handleSubmit}
              disabled={!username || !password || (error && error.length > 0)}
            />
          </form>
        </div>
        }
      </div>
    );
  }
}



Login = connect(globalState => ({
    user: globalState.auth && globalState.auth.user,
  }),
  authActions
)(Login)


export default withRouter(Login);