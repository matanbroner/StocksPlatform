import React, { Component } from 'react';
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';

class Topbar extends Component {
    render() {
        return (
            <Menu secondary>
                <Menu.Menu position='right'>
                    {/* <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item> */}

                    <Menu.Item className='profile-icon'>
                        <Icon name='user' />
                        <div>
                            Username
                        </div>
                    </Menu.Item>

                    <Link to='../login'>
                        <Menu.Item>
                            <Button color="teal">Logout</Button>
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Topbar;