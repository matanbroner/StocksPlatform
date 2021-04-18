import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='thin'
                    >
                    
                    <Link to='/dashboard/home'>
                        <Menu.Item as='div'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                    </Link>

                    <Link to='/dashboard/projects'>
                        <Menu.Item as='div'>
                            <Icon name='users' />
                            Projects
                        </Menu.Item>
                    </Link>

                    <Link to='/dashboard/stock-search'>
                        <Menu.Item as='div'>
                            <Icon name='chart line' />
                            Stock Search
                        </Menu.Item>
                    </Link>

                    <Link to='/dashboard/settings'>
                        <Menu.Item as='div'>
                            <Icon name='settings' />
                            Settings
                        </Menu.Item>
                    </Link>
                </Sidebar>
            </div>
        )
    }
}

export default Navbar;