import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

class Settings extends Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className='settings-body'>
                    <div className='settings-title'>
                        Settings
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;