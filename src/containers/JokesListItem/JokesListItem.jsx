import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getFavorites, removeFavorite, addFavorite } from '../../redux/modules/jokes';
import Checkbox from '@material-ui/core/Checkbox';

class JokesListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.addJokesToFavorites = this.addJokesToFavorites.bind(this);
    this.removeJokesFromFavorites = this.removeJokesFromFavorites.bind(this);
  }

  componentDidMount(){
    const { favorites, id } = this.props;
    const isJokeInFavorites = favorites &&
      !!favorites.find(c => parseInt(c.id, 10) === parseInt(id, 10));

    this.setState({
      checked: isJokeInFavorites,
    })
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
    const { id, joke } = this.props;
    const { checked } = this.state;

    return (
      <ListItem>
        <Checkbox
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
}))(JokesListItem);
export default JokesListItem;