import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './Page'
import SendData from './SendData'

function App() {
  return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Page}/>
            <Route exact path="/senddata" component={SendData} />
          </Switch>
        </Fragment>
      </Router>
  );
}

export default App;
