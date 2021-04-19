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
            errorMessage: '',
            successMessage: ''
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
            <Container>
                <div className="signup">
                    <Grid className="center aligned">

                        <Form onSubmit={ this.handleSubmit } className='signup-form' >
                            <Header size='huge' className='SignupTitle'>
                                Sign Up
                            </Header>

                            <Form.Group>
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
                                <Checkbox label='I agree to the Terms and Conditions'></Checkbox>
                            </Form.Field>
                            
                            <Link to='/dashboard/home'>
                                <Form.Button 
                                className="signup-button" 
                                content="Create Account" 
                                onClick={()=>this.submit()}
                                />
                            </Link>
                        </Form>
                    </Grid>
                </div>
            </Container>
        )
    }
}

export default Signup;