import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Modal, Search, Grid } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Topbar from './Topbar';
import ApiHandler from "../api";

const results = [
    {
      name: "John",
      age: 14
    },
    {
      name: "Mary",
      age: 92
    }
  ];

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectArray: {
                id: "",
                title: "",
                description: "",
                stock: "",
            },
            modalOpen: false,
            results: "",
        };
    }

    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }

    handleClose() {
        this.setState({
            modalOpen: false
        });
    }

    updateForm(key, e, value = null) {
        this.setState({
          projectArray: {
            ...this.state.projectArray,
            [key]: value || e.target.value,
          },
        });
      }


    render() {
        const resRender = () => (
            <span key="name">
              Hello it works!
            </span>
        );
        return (
            <div>
                 <Grid>
                    <Grid.Row className="project-top">
                        <Grid.Column stretched width={16}>
                            <Topbar />
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column stretched width={16}>
                        </Grid.Column>  
                    </Grid.Row>          
                    <Grid.Row>
                        <Grid.Column stretched width={16}>
                            <Navbar />
                        </Grid.Column>
                        <Grid.Column stretched width={16}>
                            <div className='project-title'>
                                My Projects
                            </div>
                        </Grid.Column>  
                        <Grid.Column stretched width={16}>
                            <div className='project-modal'>
                                <Modal
                                onClose={() => this.handleClose()}
                                open={this.modalOpen}
                                trigger={<Button className='project-button' color='teal'>Add Project</Button>}
                                >
                                    <Modal.Header>Create a Project</Modal.Header>
                                    <Modal.Content>
                                    <Modal.Description>
                                        <p>
                                        Start adding stocks to a project. Give the project a description.
                                        </p>
                                    </Modal.Description>
                                        <Form>
                                            <Form.Field>
                                                <label>Project Title</label>
                                                <input 
                                                    placeholder="Title"
                                                    onChange={(e) => this.updateForm("title", e)}
                                                />
                                            </Form.Field>
                                            <Form.TextArea 
                                                label='Project Description' 
                                                placeholder='Describe your project' 
                                                onChange={(e) => this.updateForm("description", e)}
                                            />
                                            <Search
                                                fluid
                                                icon="search"
                                                placeholder="Search Stocks..."
                                                results={results}
                                                onChange={(e) => this.updateForm("stock", e)}
                                                resultRenderer={resRender}
                                            />
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button onClick={() => this.handleClose()}>
                                        Cancel
                                        </Button>
                                        <Button
                                        content="Create Project"
                                        labelPosition='left'
                                        icon='add'
                                        onClick={() => this.handleClose()}
                                        positive
                                        />
                                    </Modal.Actions>
                                </Modal>    
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Project;