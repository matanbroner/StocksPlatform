import React, { Component } from 'react';
import { connect } from "react-redux"
import { withRouter } from "react-router";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';

import {
    removeUser
} from "../../store/actions/userActions"

class Topbar extends Component {

    logout(){
        this.props.removeUser();
        this.props.onLogout();
        this.props.history.push("/login")
    }
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

                    <Menu.Item>
                        <Button onClick={() => this.logout()} color="teal">Logout</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: () => dispatch(removeUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topbar));