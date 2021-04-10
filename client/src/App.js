import React, { Component } from 'react'
import { Header, Segment, Button, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

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


const App = () => {
  return (
    <div className="App">
      <div className="HomeBackground">
        <Header className="Header" as='h2'>
          <Logo />
          <Message />
          <div className="Buttons">
            <SignUpButton />
            <LogInButton />
          </div>
        </Header>
      </div>
    </div>
  );
}

export default App;
