import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { MenuItem, Menu } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';

import { addFavorite } from '../../redux/modules/jokes';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuItem: {
    textDecoration: 'none',
    color: '#000000'
  }
};

class MenuContainer extends PureComponent {
  state = {
    anchorEl: null,
    checked: false,
    randomActivated: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = event => {
    this.setState({ checked: event.target.checked, randomActivated: !this.state.randomActivated });
  };

  logout = () => {
    const { logout } = this.props;
    logout();
    this.handleClose();
  }

  dispatchRandomFavorite = () => {
    const { dispatch, jokes } = this.props;

    return jokes && jokes.forEach(randomJoke => {
      console.log(randomJoke)
      const { joke, id} = randomJoke;
      dispatch(addFavorite(joke, id));
    })
  }

  addRandomJokesToFavorites = () => {
    this.dispatchRandomFavorite();
  }

  render() {
    const { classes, auth } = this.props;
    const { anchorEl, checked } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Chuck Norris Jokes
            </Typography>
            
            <Fragment>
              {auth.user &&
                <Switch
                  value="Add Random Jokes"
                  checked={checked}
                  onChange={this.handleChange}
                  tabIndex={-1}
                  onClick={this.addRandomJokesToFavorites()}
                />
              }
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {auth.user &&
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem>
                      <Link to="/jokes/" onClick={this.handleClose} className={classes.menuItem}>
                      Get Jokes
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/favorites/" onClick={this.handleClose} className={classes.menuItem}>
                        View Favorites
                      </Link>
                    </MenuItem>
                    <MenuItem>   
                      {auth.user &&
                      <Link to="/login" onClick={this.logout}>
                      Log Out
                      </Link>}
                    </MenuItem>
                  </Menu>
                }
            </Fragment>
          </Toolbar>
        </AppBar>
      </div> 
    );
  }
}

MenuContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

MenuContainer = connect(globalState => ({
  auth: globalState.auth,
  jokes: globalState.jokes.jokes,
})
)(MenuContainer);

export default withStyles(styles)(MenuContainer);

