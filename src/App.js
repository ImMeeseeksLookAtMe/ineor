import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './Page'

function App() {
  return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Page}/>
          </Switch>
        </Fragment>
      </Router>
  );
}

export default App;
