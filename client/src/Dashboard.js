import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import { Menu, Button, Input, Icon } from 'semantic-ui-react';
import Navbar from './Navbar';

function Dashboard() {
    return (
        <div>
            <Navbar />

            <Menu secondary>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>

                    <Menu.Item>
                        [Name] 
                        <Icon name='user circle' className='profile-icon' />
                    </Menu.Item>

                    <Link to='../login'>
                        <Menu.Item>
                            <Button basic inverted color="green">Log Out</Button>
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>

            <div className='dash-body'>
                <div className='dash-title'>
                    Welcome Back, [Name]!
                </div>
            </div>
        </div>
    )
}

export default Dashboard;