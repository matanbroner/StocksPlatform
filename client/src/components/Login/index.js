import React, { Component } from "react";
import { connect } from "react-redux"
import { Form, Grid, Message } from "semantic-ui-react";
import ApiHandler from "../../api";
import styles from "./styles.module.css";
import OpenAuth from "../OpenAuth";

import {
  setUser
} from "../../store/actions/userActions"

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

  componentDidMount(){
    if(this.props.accessKey){
      this.props.history.push("/dashboard")
    }
    ApiHandler.get(
      "users",
      "oauth/profile",
      {},
      {}
    )
      .then((res) => {
        if(res.status === 200) {
          const profile = res.data;
          const { accessKey, refreshKey } = profile.data;
          delete profile.data.accessKey;
          delete profile.data.refreshKey;
          console.log('accessKey', accessKey)
          console.log('refreshKey', refreshKey)
          this.props.setUser(profile.data, accessKey, refreshKey)
          this.props.setTokens(accessKey, refreshKey);
          this.props.history.push("/dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
          const profile = res.data;
          const { accessKey, refreshKey } = profile;
          delete profile.accessKey;
          delete profile.refreshKey;
          this.props.setUser(profile, accessKey, refreshKey)
          this.props.setTokens(accessKey, refreshKey);
          this.props.history.push("/dashboard");
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
          id={styles.firstcolumn}
        >
          <div id={styles.seccolumn}>
            <div>
                <img src="/images/logo.png" alt="Banana Stocks Logo" id={styles.logo}/>
            </div>

            <div id={styles.title}>Log in</div>

            {this.state.error ? (
              <Message negative>
                <Message.Header>Login Error</Message.Header>
                <p>{this.state.error}</p>
            </Message>
            ) : null}

            <Form className="login-form">
              <Form.Input
                size="large"
                id={styles.email}
                placeholder="E-mail Address"
                value={this.state.form.email}
                onChange={(e) => this.updateForm("email", e)}
              />
              <Form.Input
                size="large"
                id={styles.password}
                type="password"
                placeholder="Password"
                value={this.state.form.password}
                onChange={(e) => this.updateForm("password", e)}
              />

              <div id={styles.account}>
                Don't have an account?
                <div
                  id={styles.sign}
                  onClick={() => {
                    this.props.history.push("/signup");
                  }}
                >
                  Sign up!
                </div>
              </div>

              <Form.Button
                size="large"
                id={styles.button}
                content="Login"
                color="teal"
                onClick={() => this.submit()}
                disabled={!this.formIsComplete()}
                loading={this.state.loading}
              />
              {/* </Link> */}
            </Form>
            <div className="oauth" style={{ paddingTop:"40px" }}>
              <OpenAuth provider='google'/>
              <OpenAuth provider='facebook'/>
            </div>
          </div>
        </Grid.Column>

        <Grid.Column
          width={12}
          style={{ height: "100%" }}
          id={styles.thirdcolumn}
        >
          <div id={styles.message1}>Stock Trading Simplified</div>
          <div id={styles.message2}>
            We help you get the best data on all your stock needs.
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessKey: state.user.accessKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (profile, accessKey, refreshKey) => dispatch(setUser(profile, accessKey, refreshKey)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
