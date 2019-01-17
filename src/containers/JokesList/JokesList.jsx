import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import JokesListItem from '../JokesListItem/JokesListItem.jsx';
import * as jokesActions from '../../redux/modules/jokes';

class JokesList extends React.PureComponent {
  componentDidMount() {
    this.props.loadJokes();
  }

  render() {
    const { jokes: { jokes, loading, error } } = this.props;
console.log('hey')
    return (
      <div style={{'marginTop': '40px'}}>
      {loading && <Fragment>Loading...</Fragment>}
      {jokes && jokes.length > 0 && (
        <FormControl>
          <FormHelperText margin="dense">Pick your favorites</FormHelperText>
          <List style={{'paddingTop': '0'}}>
            {jokes.map(item => {
              const { id, joke } = item;
              return (
                <JokesListItem
                  key={id}
                  id={id}
                  joke={joke}
                />
              )
            })}
          </List>
        </FormControl>
      )}
      {error && error.message && <Fragment>{error.message}</Fragment>}
      </div>
    );
  }
}

JokesList = connect(globalState => ({
  error: globalState.error,
  jokes: jokesActions.getJokes(globalState),
}),
  jokesActions
)(JokesList);
export default JokesList;