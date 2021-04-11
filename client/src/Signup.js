import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Button , Message, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div>
            <Header size='large' className='SignupTitle'>
                Sign Up
            </Header>
            
            <Form className='signup-form'>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='First name'
                        placeholder='First name'
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Last name'
                        placeholder='Last name'
                    />
                </Form.Group>
                {/* Add error messages later to check for invalid requests */}
                <Form.Input label='Username' className='signup-user' placeholder='Username' />
                <Form.Input label='Email' className='signup-email' placeholder='E-mail Address' />
                <Form.Input label='Password' className='signup-password' placeholder='Password' />
                
                <Link to='/dashboard'>
                    <Button className='signup-button'>Create Account</Button>
                </Link>
            </Form>
        </div>
    )
}

export default Signup;