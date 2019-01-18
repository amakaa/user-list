import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import JokesListItem from '../JokesListItem/JokesListItem.jsx';

import { getJokes, loadJokes } from '../../redux/modules/jokes';

const styles = {
  error: {
    color: '#F85D73'
  },
};

class JokesList extends PureComponent {
  componentDidMount() {
    this.props.dispatch(loadJokes());
  }

  render() {
    const { jokes: { jokes, loading, error }, classes } = this.props;

    return (
      <div style={{'marginTop': '40px'}}>
        {loading && <Fragment>Loading...</Fragment>}
        {error && <div className={classes.error}>{error.join(', ')}</div>}
        {jokes && jokes.length > 0 && (
          <FormControl>
            <FormHelperText margin="dense">Pick your favorites</FormHelperText>
            <List style={{'paddingTop': '0'}}>
              {jokes.map(item => {
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
        )}
      </div>
    );
  }
}

JokesList = connect(globalState => ({
  error: globalState.error,
  jokes: getJokes(globalState),
}))(JokesList);

export default withStyles(styles)(JokesList);