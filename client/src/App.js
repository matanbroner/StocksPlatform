import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import ApiHandler from "./api";

// TODO: This should be moved away to a token verify/refresh module
const JWT_KEY = "stocks_jwt";
const OPEN_ROUTES = ["/", "/login", "/signup"];

/* Central app file which holds our app router allowing us to switch between files */
class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // set to true to allow for token verification to take place on load
      loading: true,
    };
  }

  componentDidMount() {
    this.handleReLogin();
  }

  async handleReLogin() {
    try {
      const token = localStorage.getItem(JWT_KEY);
      ApiHandler.setToken(token); // set regardless, doesn't matter if null
      if (!token && !OPEN_ROUTES.includes(window.location.pathname)) {
        throw Error("Path requires login");
      } else if (token) {
        const res = await ApiHandler.post(
          "users",
          "jwt/verify",
          {},
          {
            token,
          }
        );
        this.setState({
          user: res.data,
          token,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // TODO: replace with toaster error
      window.location.pathname = "/login";
      this.setState({
        loading: false,
      });
    }
  }

  _updateGlobalState(key, value) {
    return this.setState({
      [key]: value,
    });
  }

  _getGlobalState(key) {
    return this.state[key];
  }

  render() {
    return (
      <div className="App">
        
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route
                path="/login"
                component={(props) => (
                  <Login
                    {...props}
                    setUser={(user) => {
                      this._updateGlobalState("user", user);
                      ApiHandler.setToken(this.state.user.accessKey);
                      localStorage.setItem(JWT_KEY, this.state.user.accessKey);
                    }}
                  />
                )}
              />
              {
                this.state.loading 
                ? null
                : [
                  <Route path="/dashboard" component={Dashboard} />
                ]
              }
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
