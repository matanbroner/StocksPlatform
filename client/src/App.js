import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Project from './Project';
import StockSearch from './StockSearch';
import Settings from './Settings';

/* Central app file which holds our app router allowing us to switch between files */
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard/home' component={Dashboard} />
          <Route path='/dashboard/projects' component={Project} />
          <Route path='/dashboard/stock-search' component={StockSearch} />
          <Route path='/dashboard/settings' component={Settings} />
          {/* <Route path='/dashboard/my-profile' component={Profile} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
