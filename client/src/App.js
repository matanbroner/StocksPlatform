import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Particles from "react-particles-js";
import "./App.css";
import Home from "./components/Home/index";
import Login from "./components/Login/index";
import Signup from "./components/Signup/index";
import Dashboard from "./components/Dashboard/index";
import ApiHandler from "./api";

import { setUser } from "./store/actions/userActions";

// TODO: This should be moved away to a token verify/refresh module
const ACCESS_KEY = "stocks_access_key";
const REFRESH_KEY = "stocks_refresh_key";
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

  async refreshAccessKey(refreshKey) {
    try {
      const res = await ApiHandler.post(
        "users",
        "jwt/refresh",
        {},
        {
          refreshKey,
        }
      );
      const { accessKey } = res.data;
      localStorage.setItem(ACCESS_KEY, accessKey);
      this.handleReLogin(); // log in again after new token is set
    } catch (e) {
      console.log(e); // TODO: replace with toaster
      window.location.pathname = "/login"; // cannot get new key, have user log in
    }
  }

  async handleReLogin() {
    const accessKey = localStorage.getItem(ACCESS_KEY);
    const refreshKey = localStorage.getItem(REFRESH_KEY);
    try {
      ApiHandler.setToken(accessKey); // set regardless, doesn't matter if null
      if (!accessKey && !OPEN_ROUTES.includes(window.location.pathname)) {
        throw Error("Path requires login");
      } else if (accessKey) {
        const res = await ApiHandler.post(
          "users",
          "jwt/verify",
          {},
          {
            accessKey,
          }
        );
        const profile = res.data;
        this.props.setUser(profile, accessKey, refreshKey);
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // TODO: replace with toaster error
      this.setState({
        loading: false,
      });
      if (
        e.error // if is internal JSON error
      ) {
        if (e.error && e.error.includes("TokenExpiredError")) {
          this.refreshAccessKey(refreshKey);
        } else if (!OPEN_ROUTES.includes(window.location.pathname)) {
          console.log("in here");
          window.location.pathname = "/login";
        }
      } else {
        // TODO: handle client error here, should go to a crash page
        return;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Particles
          className="particleCanvas"
          params={{
            particles: {
              color: {
                value: "#008080"
              },
              line_linked: {
                color: {
                  value: "#008080"
                }
              },
              move: {
                speed: 0.3
              },
              number: {
                value: 100
              },
              size: {
                value: 3
              }
            }
          }}
        />
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              component={(props) => (
                <Login
                  {...props}
                  setTokens={(accessKey, refreshKey) => {
                    ApiHandler.setToken(accessKey);
                    localStorage.setItem(ACCESS_KEY, accessKey);
                    localStorage.setItem(REFRESH_KEY, refreshKey);
                  }}
                />
              )}
            />
            {this.state.loading ? null : (
              <Route
                path="/dashboard"
                component={(props) => (
                  <Dashboard
                    {...props}
                    onLogout={() => {
                      localStorage.removeItem(ACCESS_KEY);
                      localStorage.removeItem(REFRESH_KEY);
                      ApiHandler.revokeToken();
                    }}
                  />
                )}
              />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (profile, accessKey, refreshKey) =>
      dispatch(setUser(profile, accessKey, refreshKey)),
  };
};

export default connect(null, mapDispatchToProps)(App);
