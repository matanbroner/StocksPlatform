import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
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

                <div className='project-buttons'>
                    <Button primary>Create Project</Button>
                    <Button secondary>Delete Project</Button>
                </div>
            </div>
        </div>
    )
}

export default Project;