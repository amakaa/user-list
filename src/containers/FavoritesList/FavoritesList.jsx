import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import JokesListItem from '../JokesListItem/JokesListItem.jsx';

import { getFavorites } from '../../redux/modules/jokes';

class FavoritesList extends PureComponent {
  render() {
    const { favorites } = this.props;

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
                    key={uuidv4()}
                    id={id}
                    joke={joke}
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