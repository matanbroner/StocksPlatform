import React, { Component } from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Logo() {
    return (
      <div className="Logo">
        <img src="/images/logo.png" alt="Banana Stocks Logo" className="home-logo"/>
      </div>
    )
  }
  
  function Message() {
    return (
      <Header size="large">
        <div className="HomeMessage">
          Here to support all your stock portfolio needs.
        </div>
      </Header>
    )
  }
  
  function SignUpButton() {
    return (
      <div className="Signup">
        <Button basic inverted color="green" className="home-sign-up">Sign Up</Button>
      </div>
    )
  }
  
  function LogInButton() {
    return (
      <div className="Login">
        <Button basic inverted color="green" className="home-log-in">Log In</Button>
      </div>
    )
  }

class Home extends Component {
    render() {
      return (
          <div className="HomeBackground">
              <Header className="Header" as='h2'>
                  <Logo />
                  <Message />

                  <div className="Buttons">
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