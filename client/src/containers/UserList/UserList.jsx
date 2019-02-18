import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import {
  getUsers,
  loadUsers,
  deleteUser,
  isLoading,
  isLoaded
} from '../../redux/modules/users';

import { TITLES } from '../../constants/titles';

import SignUp from '../SignUp/SignUp';

const styles = {
  error: {
    color: '#F85D73'
  },
  container: {
    marginTop: '80px'
  },
  closeButton: {
    justifyContent: 'flex-end',
  }
};

export const UserItem = ({
  user,
  removeUser,
  editUser,
}) => (
  <TableRow>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.gender}</TableCell>
    <TableCell>{user.phone}</TableCell>
    {user.address && (
      <TableCell>
        {`${user.address[0].street || ''} ${user.address[0].number || ''} ${user.address[0].city || ''} ${user.address[0].zipcode || ''}`}
      </TableCell>
    )}
    <TableCell padding="checkbox">
      <Button id="edit-button" onClick={() => editUser(user)}>
        <img src={require('../../images/outline-edit-24px.svg')} alt={`edit-${user.id}`} />
      </Button>
    </TableCell>
    <TableCell padding="checkbox">
      <Button id="delete-button" onClick={removeUser}>
        <img src={require('../../images/outline-delete-24px.svg')} alt={`delete-${user.id}`} id={user.id} />
      </Button>
    </TableCell>
  </TableRow>
);

const UserTitle = () => (
  <TableRow>
    {TITLES.map(title => (
      <TableCell className="thead-sm" key={title}>{title}</TableCell>
    ))}
    <TableCell></TableCell>
    <TableCell></TableCell>
  </TableRow>
);

const SignUpDialog = ({ open, handleClose, classes, user }) => (
  <Dialog
    id="sign-up-dialog"
    open={open}
    onClose={handleClose}
    fullScreen
    aria-labelledby="form-dialog-title"
  >
    <Button onClick={handleClose} className={classes.closeButton}>
      <img
        src={require('../../images/outline-close-24px.svg')}
        alt="close"
      />
    </Button>
    
    <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
    <SignUp user={user} onClose={handleClose} edit />
  </Dialog>
);

class UserList extends PureComponent {
  state = {
    open: false,
  }

  componentDidMount() {
    this.props.dispatch(loadUsers());
  }

  removeUser = (event) => {
    const { dispatch } = this.props
    dispatch(deleteUser(event.target.id))
      .then(() => dispatch(loadUsers()));
  }

  editUser = (user) => {
    this.setState({ open: true, user })
  }

  handleClose = () => {
    this.setState({ open: false, })
  }

  render() {
    const { loading, loaded, error, classes, users } = this.props;
    const { open, user } = this.state;

    return (
      <div className={classes.container}>
        {loading && <Fragment>Loading...</Fragment>}
        {error && <div className={classes.error}>{error}</div>}

        {!loaded && (
          <Table>
            <TableHead>
              <UserTitle />
            </TableHead>
            <TableBody>
              {users && users.map(user => {
                const { id } = user;
                return (
                  <UserItem
                    key={`row-${id}`}
                    user={user}
                    removeUser={this.removeUser}
                    editUser={this.editUser}
                  />
                );
              })}
            </TableBody>
          </Table>
        )}

        <SignUpDialog
          handleClose={this.handleClose}
          classes={classes}
          open={open}
          user={user}
        />
      </div>
    );
  }
}

UserList = connect(globalState => ({
  error: globalState.error,
  users: getUsers(globalState),
  loading: isLoading(globalState),
  loaded: isLoaded(globalState),
}))(UserList);

UserList = withStyles(styles)(UserList);

export default UserList;