import React, { Component } from "react";
import styles from "./styles.module.css";
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Home extends Component {
  renderLogo() {
    return (
      <div id={styles.Logo}>
        <img
          src="/images/logo.png"
          alt="Banana Stocks Logo"
          id={styles.logoimage}
        />
      </div>
    );
  }

  renderMessage() {
    return (
      <Header size="large">
        <div id={styles.HomeMessage}>
          BananaStocks
        </div>
        <br></br>
        <div id={styles.HomeMessage2}>
          Here to support all your stock portfolio needs
        </div>
      </Header>
    );
  }

  renderSignUpButton() {
    return (
      <div id={styles.Signup}>
        <Button basic inverted color="green">
          Sign Up
        </Button>
      </div>
    );
  }

  renderLogInButton() {
    return (
      <div id={styles.Login}>
        <Button basic inverted color="green">
          Log In
        </Button>
      </div>
    );
  }
  render() {
    return (
      <div id={styles.HomeBackground}>
        <Header id={styles.Header} as="h2">
          {this.renderLogo()}
          {this.renderMessage()}

          <div id={styles.buttons}>
            <Link to="/signup">{this.renderSignUpButton()}</Link>
            <Link to="/login">{this.renderLogInButton()}</Link>
          </div>
        </Header>
      </div>
    );
  }
}

export default Home;
