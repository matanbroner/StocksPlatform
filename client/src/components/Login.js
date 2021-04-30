import React, { Component } from "react";
import "../App.css";
import { Form, Grid, Message } from "semantic-ui-react";
import ApiHandler from "../api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: "",
      },
      error: null,
      loading: false,
    };
  }

  updateForm(key, e, value = null) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value || e.target.value,
      },
    });
  }

  formIsComplete() {
    return this.state.form.email && this.state.form.password;
  }

  validateForm() {
    if (!this.state.form.email || !/\S+@\S+\.\S+/.test(this.state.form.email)) {
      this.setState({
        error: "Invalid email address",
      });
      return false;
    }
    if (!this.state.form.password) {
      this.setState({
        error: "Invalid password",
      });
      return false;
    }
    this.setState({
      error: null,
    });
    return true;
  }

  submit() {
    if (this.validateForm()) {
      const { email, password } = this.state.form;
      this.setState({
        loading: true,
      });
      ApiHandler.post(
        "users",
        "users/login",
        {},
        {
          email,
          password,
        }
      )
        .then((res) => {
          this.props.history.push("/dashboard");
          this.props.setUser(res.data);
        })
        .catch((e) => {
          this.setState({
            error: e.error,
            loading: false,
          });
        });
    }
  }

  render() {
    return (
      <Grid columns={2} style={{ height: "110vh" }}>
        <Grid.Column
          style={{ height: "100%" }}
          width={4}
          className="login-column-1"
        >
          <div className="first-column">
            <div>
                <img src="/images/logo.png" alt="Banana Stocks Logo" className="login-logo"/>
            </div>

            <div className="LoginTitle">Log in</div>

            {this.state.error ? (
              <Message negative>
                <Message.Header>Login Error</Message.Header>
                <p>{this.state.error}</p>
            </Message>
            ) : null}

            <Form className="login-form">
              <Form.Input
                size="large"
                className="login-email"
                placeholder="E-mail Address"
                value={this.state.form.email}
                onChange={(e) => this.updateForm("email", e)}
              />
              <Form.Input
                size="large"
                className="login-password"
                placeholder="Password"
                value={this.state.form.password}
                onChange={(e) => this.updateForm("password", e)}
              />

              <div className="no-account">
                Don't have an account?
                <div
                  className="go-to-sign"
                  onClick={() => {
                    this.props.history.push("/signup");
                  }}
                >
                  Sign up!
                </div>
              </div>

              <Form.Button
                size="large"
                className="login-button"
                content="Login"
                color="teal"
                onClick={() => this.submit()}
                disabled={!this.formIsComplete()}
                loading={this.state.loading}
              />
              {/* </Link> */}
            </Form>
          </div>
        </Grid.Column>

        <Grid.Column
          width={12}
          style={{ height: "100%" }}
          className="login-column-2"
        >
          <div className="LoginMessage">Stock Trading Simplified</div>
          <div className="LoginMessage2">
            We help you get the best data on all your stock needs.
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
