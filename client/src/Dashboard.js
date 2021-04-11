import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
    return (
        <div>
            <Navbar />

            <div className='dash-body'>
                <div className='dash-title'>
                    Welcome Back, [Name]!
                </div>
            </div>
        </div>
    )
}

export default Dashboard;