import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,
    color: '#000000',
  },
  grow: {
    flexGrow: 1,
  },
  barContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButtons: {
    justifyContent: 'flex-end',
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
  }
};

export const CustomButton = ({ id, title, link, onClick, classes }) => (
  <Button color="inherit" id={id} onClick={onClick}>
    <Link to={link} className={classes && classes.link}>{title}</Link>
  </Button>
);

class MenuContainer extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.barContainer}>
          User registration
          
          
          <div className={classes.menuButtons}>
            <CustomButton id="add-user" title="Add User" link="/new" classes={classes} />
            <CustomButton id="users" title="Users" link="/users" classes={classes} />
          </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuContainer);

