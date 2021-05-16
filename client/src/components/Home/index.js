import React, { Component } from 'react';
import styles from "./styles.module.css";
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Logo() {
    return (
      <div id={styles.Logo}>
        <img src="/images/logo.png" alt="Banana Stocks Logo" id={styles.logoimage}/>
      </div>
    )
  }
  
  function Message() {
    return (
      <Header size="large">
        <div id={styles.HomeMessage}>
          Here to support all your stock portfolio needs.
        </div>
      </Header>
    )
  }
  
  function SignUpButton() {
    return (
      <div id={styles.Signup}>
        <Button basic inverted color="green">Sign Up</Button>
      </div>
    )
  }
  
  function LogInButton() {
    return (
      <div id={styles.Login}>
        <Button basic inverted color="green">Log In</Button>
      </div>
    )
  }

class Home extends Component {
    render() {
      return (
          <div id={styles.HomeBackground}>
              <Header id={styles.Header} as='h2'>
                  <Logo />
                  <Message />

                  <div id={styles.Buttons}>
                      <Link to='/signup'>
                          <SignUpButton />
                      </Link>
                      
                      <Link to='/login'>
                          <LogInButton />
                      </Link>
                  </div>
              </Header>
          </div>

      )
    }
}

export default Home;