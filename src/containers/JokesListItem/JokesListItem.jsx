import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import uuidv4 from 'uuid/v4';

import { getFavorites, removeFavorite, addFavorite } from '../../redux/modules/jokes';

class JokesListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.favorites && !!props.favorites.find(c =>  c.id === String(props.id))
    }
    this.handleChange = this.handleChange.bind(this);
    this.addJokesToFavorites = this.addJokesToFavorites.bind(this);
    this.removeJokesFromFavorites = this.removeJokesFromFavorites.bind(this);
  }

  static getDerivedStateFromProps({ favorites, id }, prevState) {
    if (favorites && !!favorites.find(c =>  c.id === String(id)) !== prevState.checked) {
      return {
        checked: !!favorites.find(c =>  c.id === String(id))
      }
    }

    return null;
  }

  handleChange(event) {
    const { checked } = this.state;

    if (checked) {
      this.removeJokesFromFavorites(event);
    } else {
      this.addJokesToFavorites(event);
    }
  }

  addJokesToFavorites(event) {
    const { dispatch } = this.props;
    const { target: { value, id } } = event;

    dispatch(addFavorite(value, id));
  }

  removeJokesFromFavorites(event) {
    const { dispatch } = this.props;
    const { target: { id } } = event;

    dispatch(removeFavorite(id));
  }

  render() {
    const { id, joke, checked } = this.props;

    return (
      <ListItem key={uuidv4()}>
        <Switch
          id={`${id}`}
          value={joke}
          checked={checked}
          onChange={this.handleChange}
          tabIndex={-1}
        />
        <ListItemText primary={joke} />
      </ListItem>
    );
  }
}

JokesListItem = connect(globalState => ({
  favorites: getFavorites(globalState)
})
)(JokesListItem);
export default JokesListItem;