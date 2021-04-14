import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Logo() {
    return (
      <div className="Logo">
        Stocked (Logo)
      </div>
    )
  }
  
  function Message() {
    return (
      <Header size="large">
        <div className="HomeMessage">
          Welcome to the Site. Come check out our stuff!
        </div>
      </Header>
    )
  }
  
  function SignUpButton() {
    return (
      <div className="Signup">
        <Button basic inverted color="green">Sign Up</Button>
      </div>
    )
  }
  
  function LogInButton() {
    return (
      <div className="Login">
        <Button basic inverted color="green">Log In</Button>
      </div>
    )
  }

function Home() {
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

export default Home;