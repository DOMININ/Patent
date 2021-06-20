import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ArduinoMain from './ArduinoMain.js';
import DroneMain from './DroneMain.js';
import Header from '@components/Header/Header';

const App = () => {
  return (
    <Router>
      <Header />

      <Switch>
        <Redirect exact from="/" to="/arduino" />
        <Route exact path="/arduino">
          <ArduinoMain />
        </Route>
        <Route exact path="/drone">
          <DroneMain />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
