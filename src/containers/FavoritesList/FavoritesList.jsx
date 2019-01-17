import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import JokesListItem from '../JokesListItem/JokesListItem.jsx';

import { getFavorites } from '../../redux/modules/jokes';

class FavoritesList extends React.PureComponent {
  render() {
    const { favorites } = this.props;

  const isJokeInFavorites = (id) => favorites &&
    !!favorites.find(c =>  parseInt(c.id, 10) === parseInt(id, 10));
console.log(this)
    return (
      <div style={{'marginTop': '40px'}}>
      {!favorites || !favorites.length ?
        <Fragment>Nothing to see here</Fragment> :
        <FormControl>
          <FormHelperText>Remove quote</FormHelperText>
          <List>
            {favorites.map(item => {
              const { id, joke } = item;
              return (
                <JokesListItem
                  key={id}
                  id={id}
                  joke={joke} 
                  checked={isJokeInFavorites(id)}
                />
              )
            })}
          </List>
        </FormControl>
      }
      </div>
    );
  }
}

FavoritesList = connect(globalState => ({
  favorites: getFavorites(globalState)
}))(FavoritesList);
export default FavoritesList;