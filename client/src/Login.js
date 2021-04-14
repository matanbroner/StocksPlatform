import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Button , Header, Grid} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <body>
            <Grid columns={2}>
                <Grid.Column width={5}>
                    <Header size='large' className='LoginTitle'>
                        Log in to Stocked
                    </Header>

                    <Form className='login-form'>
                        {/* Add error messages later to check for invalid requests */}
                        <Form.Input className='login-email' placeholder='E-mail Address' />
                        <Form.Input className='login-password' placeholder='Password' />
                        
                        <Link to='/dashboard/home'>
                            <Button className='login-button'>Login</Button>
                        </Link>
                    </Form>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Header size='huge' className='LoginMessage'>
                        Welcome back!
                    </Header>
                </Grid.Column>
            </Grid>
        </body>
    )
}

export default Login;