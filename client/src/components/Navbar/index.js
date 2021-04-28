import React, { Component } from 'react';
import './styles.css';
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
                    className="nav-sidebar"
                    >
                    <Menu.Item as='div' className="nav-logo">
                        <img src="/images/logo.png" alt="Banana Stocks Logo" className="nav-logo"/>
                    </Menu.Item>
                    
                    <Link to='/dashboard/home'>
                        <Menu.Item as='div'>
                            <Icon name='home' className="nav-icon"/>
                            <div className="nav-title">
                                Home
                            </div>
                        </Menu.Item>
                    </Link>

                    <Link to='/dashboard/projects'>
                        <Menu.Item as='div' >
                            <Icon name='users' className="nav-icon"/>
                            <div className="nav-title">
                                Projects
                            </div>
                        </Menu.Item>
                    </Link>

                    <Link to='/dashboard/stock-search'>
                        <Menu.Item as='div'>
                            <Icon name='chart line' className="nav-icon"/>
                            <div className="nav-title">
                                Stock Search
                            </div>
                        </Menu.Item>
                    </Link>

                    <Link to='/dashboard/settings'>
                        <Menu.Item as='div'>
                            <Icon name='settings' className="nav-icon"/>
                            <div className="nav-title">
                                Settings
                            </div>
                        </Menu.Item>
                    </Link>
                </Sidebar>
            </div>
        )
    }
}

export default Navbar;