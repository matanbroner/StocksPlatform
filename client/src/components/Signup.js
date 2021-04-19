import React, { Component, setState, useState } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Header, Checkbox, Grid, Container } from 'semantic-ui-react';
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
            check: ''
        }
    };

    // handleInputChange(e) {
    //     const target = e.target;
    //     const name = target.name;
    //     this.setState({
    //         [name]: e.target.value
    //     });
    // };

    handleFirstName(e) {
        this.setState({ firstname: e.target.value })
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

    handleCheck(e) {
        this.setState({ check: e.target.value })
    }

    submit(e) {
        if(this.state.email === undefined || this.state.email === '' || this.state.password === undefined || this.state.password === "") {
            this.setState({
                errorMessage: 'Missing Email or Password'
            })
            console.log('Invalid Email or Password');
        }
        else {
            this.setState({
                successMessage: 'Welcome username!'
            })
            console.log('Welcome!');
        }
    }
    // handleSubmit = () => {
    //     axios.post('/signup', data).then(
    //         res => {
    //             console.log(res);
    //         }
    //     ).catch(
    //         err => {
    //             console.log(err);
    //         }
    //     )
    // };

    render() {
        return (
                <div className="signup">
                    <Grid className="centered middle">

                        <Container className="signup-container">
                            <Form onSubmit={ this.handleSubmit } className='signup-form' >
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

                                {/* Add error messages later to check for invalid requests */}
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
                                <Form.Field>
                                    <Checkbox 
                                    label='I agree to the Terms and Conditions' 
                                    value={this.state.check}
                                    onChange={(e)=>this.handleCheck(e)}>
                                    </Checkbox>
                                </Form.Field>
                                
                                <Link to='/dashboard/home'>
                                    <Form.Button
                                    color="teal" 
                                    className="signup-button" 
                                    content="Create Account"
                                    size="large" 
                                    onClick={()=>this.submit()}
                                    disabled={(!this.state.firstname 
                                        || !this.state.lastname 
                                        || !this.state.email
                                        || !this.state.username
                                        || !this.state.password)
                                        || this.state.check
                                    }
                                    />
                                </Link>
                            </Form>
                        </Container>
                    </Grid>
                </div>
        )
    }
}

export default Signup;