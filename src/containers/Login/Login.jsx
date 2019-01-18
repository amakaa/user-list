import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { login } from '../../redux/modules/auth';
import { validatePassword } from '../../utils/validation';

const styles = require('./Login.scss');

class Login extends PureComponent {
  constructor(props) {
    super(props);


    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  handleChange = name => event => {
    const { target: { value } } = event;
    if (name === 'password') {
      this.handlePasswordChange(name, value);
    }
    if (name === 'username') {
      this.handleUserNameChange(value);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.state.username;
    const { dispatch, history } = this.props

    dispatch(login(input));
    history.push('/jokes/');
    this.setState({
      username: '',
    });
  }

  handlePasswordChange = (name, password) => {
    const errors = validatePassword(name, password);

    this.setState({
      error: errors.password,
      password,
    });
  }

  handleUserNameChange = (username) => {
    this.setState({
      username,
    });
  }

  render() {
    const { username, error, password } = this.state;

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <Dialog
          open
          fullWidth
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
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

            <div className="form-group">
              <Button
                color="primary"
                variant="contained"
                className="btn btn-success"
                onClick={this.handleSubmit}
                disabled={!username || !password || (error && error.length > 0)}
              >
                Submit
              </Button>
            </div>
          </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Login = connect()(Login)


export default Login;