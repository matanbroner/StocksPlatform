import React, { Component, useState,} from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Button , Header, Grid} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            successMessage: ''
        }
    }

    changeEmail(e) {
        this.setState({ email: e.target.value })
    }

    changePassword(e) {
        this.setState({ password: e.target.value })
    }

    login(e) {
        if(this.state.email === undefined || this.state.email === '' || this.state.password === undefined || this.state.password === "") {
            this.setState({
                errorMessage: 'Missing Email or Password'
            })
        }
        else {
            this.setState({
                successMessage: 'Welcome username!'
            })
        }
        console.log(this.state.email);
        console.log(this.state.password);
    }

    //     axios.post('/login', data).then(
    //         res => {
    //             localStorage.setItem('token', res.data.token);
    //         }
    //     ).catch(
    //         err => {
    //             console.log(err);
    //         }
    //     )
    // };

    render() {
        return (
            <Grid columns={2}>
                <Grid.Column width={5}>
                    <Header size='large' className='LoginTitle'>
                        Log in to Stocked
                    </Header>

                    <Form onSubmit={ this.handleSubmit } className='login-form'>
                        {/* Add error messages later to check for invalid requests */}
                        <Form.Input 
                        className='login-email' 
                        placeholder='E-mail Address' 
                        value={this.state.email}
                        onChange={(e)=>this.changeEmail(e)}/>

                        <Form.Input 
                        className='login-password' 
                        placeholder='Password'
                        value={this.state.password} 
                        onChange={(e)=>this.changePassword(e)}/>
                        
                        <Link to='/dashboard/home'>
                            <Form.Button 
                            className="login-button" 
                            content="Login" 
                            onClick={() => this.login()}/>
                        </Link>
                    </Form>
                </Grid.Column>

                <Grid.Column width={10}>
                    <Header size='huge' className='LoginMessage'>
                        Welcome back!
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;