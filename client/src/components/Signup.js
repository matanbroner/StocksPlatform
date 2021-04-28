import React, { Component } from "react";
import "../App.css";
import { Form, Checkbox, Grid, Container, Message } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

import ApiHandler from "../api";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      },
      error: null,
      loading: false
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
    for (let key of Object.keys(this.state.form)) {
      if (!this.state.form[key]) {
        return false;
      }
    }
    return true;
  }

  validateForm() {
    if (!this.state.form.firstName) {
      this.setState({
        error: "First name is required",
      });
      return false;
    }
    if (!this.state.form.lastName) {
      this.setState({
        error: "Last name is required",
      });
      return false;
    }
    if (
      !this.state.form.username.length ||
      this.state.form.username.length < 3 ||
      this.state.form.username.length > 15
    ) {
      this.setState({
        error: "Username must be between 3 and 15 characters",
      });
      return false;
    }
    if (!this.state.form.email || !/\S+@\S+\.\S+/.test(this.state.form.email)) {
      this.setState({
        error: "Invalid email address",
      });
      return false;
    }
    if (
      this.state.form.password !== this.state.form.confirmPassword ||
      this.state.form.password.length < 5
    ) {
      this.setState({
        error: "Passwords must match and be at least 5 characters",
      });
      return false;
    }
    if (!this.state.form.agreeTerms) {
      this.setState({
        error: "Please agree to terms and conditions",
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
      this.setState({
          loading: true
      })
      const {
          username,
          email,
          password
      } = this.state.form
      ApiHandler.post('users', 'users/sign-up', {}, {
        username,
        email,
        password
      }).then(() => {
        this.props.history.push("/login");
      }).catch((e) => {
          console.log(e)
          this.setState({
              loading: false,
              error: e.error
          })
      })
    }
  }

  render() {
    return (
      <div className="signup">
        <Grid className="centered middle">
          <Container className="signup-container">
            {this.state.error ? (
              <Message negative>
                <Message.Header>Signup Error</Message.Header>
                <p>{this.state.error}</p>
              </Message>
            ) : null}
            <Form className="signup-form">
              <div className="SignupTitle">Sign Up</div>

              <Form.Group className="signup-form">
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    value={this.state.form.firstName}
                    onChange={(e) => this.updateForm("firstName", e)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    value={this.state.form.lastName}
                    onChange={(e) => this.updateForm("lastName", e)}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Input
                label="Username"
                className="signup-user"
                placeholder="Username"
                value={this.state.form.username}
                onChange={(e) => this.updateForm("username", e)}
              />
              <Form.Input
                label="Email"
                className="signup-email"
                placeholder="E-mail Address"
                value={this.state.form.email}
                onChange={(e) => this.updateForm("email", e)}
              />
              <Form.Input
                label="Password"
                className="signup-password"
                placeholder="Password"
                value={this.state.form.password}
                onChange={(e) => this.updateForm("password", e)}
              />
              <Form.Input
                label="Confirm Password"
                className="signup-password-confirm"
                placeholder="Confirm Password"
                value={this.state.form.confirmPassword}
                onChange={(e) => this.updateForm("confirmPassword", e)}
              />
              <Form.Field>
                <Checkbox
                  label="I agree to the Terms and Conditions"
                  onChange={(e) =>
                    this.updateForm(
                      "agreeTerms",
                      e,
                      !this.state.form.agreeTerms
                    )
                  }
                ></Checkbox>
              </Form.Field>

              <Form.Button
                color="teal"
                className="signup-button"
                content="Create Account"
                size="large"
                onClick={this.submit.bind(this)}
                disabled={!this.formIsComplete()}
                loading={this.state.loading}
              />
            </Form>
          </Container>
        </Grid>
      </div>
    );
  }
}

export default Signup;
