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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { addFavorite } from '../../redux/modules/jokes';
import { logout } from '../../redux/modules/auth';

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
  },
  switch: {
    color: '#ffffff',
  }
};
const FAVORITES_MAX = 10;

class MenuContainer extends PureComponent {
  state = {
    anchorEl: null,
    checked: false,
    shouldAddToFavorites: false,
    timeouts: [],
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = event => {
    const { target: { checked } } = event;

    this.setState({ checked });
    if (checked) {
      this.setState({ shouldAddToFavorites: true });
      this.addRandomJokesToFavorites();
    } else {
      this.setState({ shouldAddToFavorites: false });
      this.clearRandomDelay();
    }
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
    this.handleClose();
  }

  queueRandomJokes = () => {
    const { jokes } = this.props;
    const timeouts = [];

    jokes && jokes.forEach((randomJoke, i) => {
      const { joke, id} = randomJoke;
      const timeout = setTimeout(() =>
        this.dispatchRandomJokesToFavorites(joke, id), 5000*i);

      timeouts.push(timeout);
    });

    this.setState({ timeouts })
  }

  dispatchRandomJokesToFavorites = (joke, id) => {
    const { dispatch, favorites } = this.props;
    const { shouldAddToFavorites } = this.state;

    if (shouldAddToFavorites) {
      dispatch(addFavorite(joke, id));
    }

    if (favorites.length >= FAVORITES_MAX) {
      this.setState({ checked: false, shouldAddToFavorites: false });
      this.clearRandomDelay();
    }
  }

  clearRandomDelay = () => {
    const { timeouts } = this.state;

    timeouts.forEach(function(timer) {
      clearTimeout(timer);
    });
  }

  addRandomJokesToFavorites = () => {
    const { favorites } = this.props;

    if (favorites.length < FAVORITES_MAX) {
      this.queueRandomJokes();
    } else {
      this.setState({ shouldAddToFavorites: false });
      this.clearRandomDelay();
    }
  }

  componentWillUnMount () {
    this.clearRandomDelay();
  }

  render() {
    const { classes, auth, favorites } = this.props;
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
                <FormControlLabel
                  className={classes.switch}
                  control={
                    <Switch
                      checked={checked}
                      onChange={this.handleChange}
                      tabIndex={-1}
                      disabled = {favorites.length >= 10}
                    />
                  }
                  label="Add Random Jokes"
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
                    {auth.user &&
                      <MenuItem onClick={this.logout}>
                        <Link to="/login/">
                          Log Out
                        </Link>
                      </MenuItem>
                    }
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
  favorites: globalState.jokes.favorites,
}))(MenuContainer);

export default withStyles(styles)(MenuContainer);

