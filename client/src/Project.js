import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Project() {
    return (
        <div>
            <Navbar />

            <div className='project-body'>
                <div className='project-title'>
                    Projects
                </div>
            </div>
        </div>
    )
}

export default Project;