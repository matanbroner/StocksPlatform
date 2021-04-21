import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Checkbox, Grid, Container, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            firstNameError: false,
            lastNameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            formError: false,
            usernameError: false,
            createUserError: false,
            signUpSuccess: false
        }
    };

    handleFirstName(e) {
        this.setState({ firstname: e.target.value })
        // console.log(this.state.firstname);
    }
    
    handleLastName(e) {
        this.setState({ lastname: e.target.value })
    }

    handleUserName(e) {
        this.setState({ username: e.target.value })
    }

    handleEmail(e) {
        this.setState({ email: e.target.value })
    }

    handlePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleConfirmPassword(e) {
        this.setState({ confirm_password: e.target.value })
    }

    handleCheck(e) {
        this.setState({ check: e.target.value })
    }

    submit(e) {
        // Form Validation on submit
        if(this.state.firstname === undefined || this.state.firstname === '') {
            this.setState({
                firstNameError: true
            })
            console.log('Please put your first name');
        }
        if(this.state.lastname === undefined || this.state.lastname === '') {
            this.setState({
                lastNameError: true
            })
            console.log('Please put your last name');
        }
        if(this.state.username === undefined 
            || this.state.username === ""
            || this.state.username.length < 3
            || this.state.username.length > 15) {
            this.setState({
                usernameError: true,
            })
            console.log('Username must be 3 to 15 characters');
        }
        if(this.state.email === undefined 
            || this.state.email === ""
            || this.state.email.length < 3) {
            this.setState({
                emailError: true
            })
            console.log('Invalid Email');
        }
        if(this.state.password === undefined 
            || this.state.password === ""
            || this.state.password.length < 3
            || this.state.password.length > 15) {
            this.setState({
                passwordError: true,
            })
            console.log('Password must be 3 to 15 characters');
        }
        if(this.state.password !== this.state.confirm_password) {
            this.setState({
                confirmPasswordError: true
            })
            console.log('Passwords do not match');
        }
        if(this.state.firstNameError === false 
            && this.state.lastNameError === false 
            && this.state.emailError === false
            && this.state.passwordError === false
            && this.state.confirmPasswordError === false
            && this.state.formError === false
            && this.state.usernameError === false
            && this.state.createUserError === false) 
            {
                this.setState({
                    signUpSuccess: true
                })
            }
    }

    render() {
        return (
                <div className="signup">
                    <Grid className="centered middle">
                        <Container className="signup-container">
                            <Form className='signup-form' >
                                <div className='SignupTitle'>
                                    Sign Up
                                </div>

                                <Form.Group className="signup-form">
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input 
                                        placeholder='First Name'
                                        value={this.state.firstname}
                                        onChange={(e)=>this.handleFirstName(e)}
                                        />
                                    
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <input 
                                        placeholder='Last Name' 
                                        value={this.state.lastname}
                                        onChange={(e)=>this.handleLastName(e)}
                                        />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Input 
                                label='Username' 
                                className='signup-user' 
                                placeholder='Username' 
                                value={this.state.username}
                                onChange={(e)=>this.handleUserName(e)}
                                />
                                <Form.Input 
                                label='Email' 
                                className='signup-email' 
                                placeholder='E-mail Address'
                                value={this.state.email}
                                onChange={(e)=>this.handleEmail(e)}
                                />
                                <Form.Input 
                                label='Password' 
                                className='signup-password' 
                                placeholder='Password' 
                                value={this.state.password}
                                onChange={(e)=>this.handlePassword(e)}
                                />
                                <Form.Input 
                                label='Confirm Password' 
                                className='signup-password-confirm' 
                                placeholder='Confirm Password' 
                                value={this.state.confirm_password}
                                onChange={(e)=>this.handleConfirmPassword(e)}
                                />
                                <Form.Field>
                                    <Checkbox 
                                    label='I agree to the Terms and Conditions' 
                                    id='agree'
                                    onChange={(e)=>this.handleCheck(e)}>
                                    </Checkbox>
                                </Form.Field>
                                
                                {/* If registration is valid, route to Dashboard.js.
                                Else, display errors. */}
                                {/* <Link to='/dashboard/home'> */}
                                    <Form.Button
                                    color="teal" 
                                    className="signup-button" 
                                    content="Create Account"
                                    size="large"
                                    onClick={()=>this.submit()}
                                    error={this.state.firstNameError 
                                        || this.state.lastNameError
                                        || this.state.emailError
                                        || this.state.passwordError
                                        || this.state.confirmPasswordError
                                        || this.state.usernameError}
                                    disabled={!this.state.firstname 
                                        || !this.state.lastname 
                                        || !this.state.email
                                        || !this.state.username
                                        || !this.state.password
                                        || !this.state.confirm_password
                                    }
                                    />
                                {/* </Link> */}
                            </Form>
                            
                            {/* error toasters */}
                            {this.state.emailError === true
                                ?
                                    <Message
                                    className="email-error"
                                    error
                                    header="Invalid Email Address"
                                    list={[
                                        "Please enter a valid email address."
                                    ]}
                                    />
                                :
                                null
                            } 
                            {this.state.passwordError === true
                                ?
                                    <Message
                                    className="password-error"
                                    error
                                    header="Invalid Password"
                                    list={[
                                        "Password must be 3 to 15 characters."
                                    ]}
                                    />
                                :
                                null
                            } 
                            {this.state.confirmPasswordError === true
                                ?
                                    <Message
                                    className="confirm-password-error"
                                    error
                                    header="Passwords Don't Match"
                                    list={[
                                        "Passwords did not match. Please try again."
                                    ]}
                                    />
                                :
                                null
                            } 
                            {this.state.usernameError === true
                                ?
                                    <Message
                                    className="username-error"
                                    error
                                    header="Invalid Username"
                                    list={[
                                        "Username must be 3 to 15 characters.",
                                        "Username is taken"
                                    ]}
                                    />
                                :
                                null
                            } 
                        </Container>
                    </Grid>
                </div>
        )
    }
}

export default Signup;