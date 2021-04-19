import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import { Menu, Button, Input, Icon } from 'semantic-ui-react';
import Navbar from './Navbar';
import axios from 'axios';

class Dashboard extends Component {
    // componentDidMount() {
    //     const config = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }

    //     axios.get('user', config).then(
    //         res => {
    //             console.log(res);
    //         },
    //         err => {
    //             console.log(err);
    //         }
    //     )
    // }

    render() {
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
}

export default Dashboard;