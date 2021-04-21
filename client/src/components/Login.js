import React, { Component, } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Grid, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: false,
            successMessage: false
        }
    };

    changeEmail(e) {
        this.setState({ email: e.target.value })
    }

    changePassword(e) {
        this.setState({ password: e.target.value })
    }

    login(e) {
        if(this.state.email === undefined 
            || this.state.email === '' 
            || this.state.password === undefined 
            || this.state.password === ""
            || this.state.password.length < 3) {
            this.setState({
                errorMessage: true
            })
            console.log('Invalid Email or Password');
        }
        else {
            this.setState({
                successMessage: 'Welcome username!'
            })
            console.log('Welcome!');
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
            <Grid columns={2} style={{height: '110vh'}}>
                <Grid.Column style={{ height: "100%"}} width={4} className="login-column-1">
                    <div className="first-column">
                        <div className="login-logo">
                            Logo
                        </div>

                        <div className='LoginTitle'>
                            Log in
                        </div>

                        <Form className='login-form'>
                            {/* Add error messages later to check for invalid requests */}
                            <Form.Input 
                            size="large"
                            className='login-email' 
                            placeholder='E-mail Address' 
                            value={this.state.email}
                            onChange={(e)=>this.changeEmail(e)}/>

                            <Form.Input 
                            size="large"
                            className='login-password' 
                            placeholder='Password'
                            value={this.state.password} 
                            onChange={(e)=>this.changePassword(e)}/>

                            <div className="no-account">
                                Don't have an account?    
                                <div className="go-to-sign">
                                    Sign up!
                                </div>
                            </div>
                            
                            {/* <Link to='/dashboard/home'> */}
                                <Form.Button 
                                size="large"
                                className="login-button" 
                                content="Login" 
                                color="teal"
                                onClick={()=>this.login()}
                                error={this.state.errorMessage}
                                disabled={!this.state.email
                                    || !this.state.password
                                }
                                />
                            {/* </Link> */}
                        </Form>

                        {this.state.errorMessage === true
                            ?
                                <Message
                                className="login-error"
                                error
                                header="Invalid Email or Password"
                                list={[
                                    "Please put the correct email and password."
                                ]}
                                />
                            :
                            null
                        } 
                    </div>
                </Grid.Column>

                <Grid.Column width={12} style={{ height: "100%"}} className="login-column-2">
                    <div className='LoginMessage'>
                        Stock Trading Simplified
                    </div>
                    <div className="LoginMessage2">
                        We help you get the best data on all your 
                        stock needs.
                    </div>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;