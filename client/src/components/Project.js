import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ProjectTile from './ProjectTile'

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectArray: {
                id: "",
                name: "",
                description: "",
                stock: "",
                body: "Hello this is project"
            },
        };
    }

    createTile(e) {

    }

    render() {
        return (
            <div>
                <Navbar />

                <div className='project-body'>
                    <div className='project-title'>
                        Projects
                    </div>

                    <div className='project-buttons'>
                        <Button onClick={(e)=>this.createTile(e)} primary>Create Project</Button>
                        <Button secondary>Delete Project</Button>
                    </div>

                    <div>
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default Project;