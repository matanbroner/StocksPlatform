import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Header, Checkbox, Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
    handleSubmit = () => {
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            user_name: this.userName,
            email: this.email,
            password: this.password,
        }
        console.log(data);

        axios.post('/signup', data).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    };

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
                                    <input placeholder='First Name' 
                                    onChange={e => this.firstName = e.target.value}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name</label>
                                    <input placeholder='Last Name' 
                                    onChange={e => this.lastName = e.target.value}/>
                                </Form.Field>
                            </Form.Group>

                            {/* Add error messages later to check for invalid requests */}
                            <Form.Input label='Username' className='signup-user' placeholder='Username' 
                            onChange={e => this.userName = e.target.value}/>
                            <Form.Input label='Email' className='signup-email' placeholder='E-mail Address'
                            onChange={e => this.email = e.target.value}/>
                            <Form.Input label='Password' className='signup-password' placeholder='Password' 
                            onChange={e => this.password = e.target.value}/>
                            <Form.Field>
                                <Checkbox label='I agree to the Terms and Conditions'></Checkbox>
                            </Form.Field>
                            
                            {/* <Link to='/dashboard/home'> */}
                                <Form.Button className="signup-button" content="Create Account" />
                            {/* </Link> */}
                        </Form>
                    </Grid>
                </div>
            </Container>
        )
    }
}

export default Signup;