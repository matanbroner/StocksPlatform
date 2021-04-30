import React, { Component } from "react";
import { Button, Grid, Divider, Dimmer, Loader } from "semantic-ui-react";
import ApiHandler from "../../../api";
import BasePanel from "../BasePanel";
import ProjectCreateModal from "../../Modals/ProjectCreateModal";
import ProjectCard from "../../ProjectCard";
import styles from './styles.module.css'

const projects = [
  {
    id: 0,
    projectName: "My Project",
    description: "This is my project",
    stocksCount: 4,
  },
  {
    id: 1,
    projectName: "My Project",
    description: "This is my project",
    stocksCount: 4,
  },
  {
    id: 2,
    projectName: "My Project",
    description: "This is my project",
    stocksCount: 4,
  },
  {
    id: 3,
    projectName: "My Project",
    description: "This is my project",
    stocksCount: 4,
  },
];

class ProjectsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectForm: {
        title: "",
        description: "",
        stocks: []
      },
      projects: projects,
      modalOpen: false,
      loading: false,
    };
  }

  updateModalState(isOpen) {
    this.setState({
      modalOpen: isOpen,
    });
  }

  updateForm(key, e, value = null) {
    this.setState({
      newProjectForm: {
        ...this.state.newProjectForm,
        [key]: value || e.target.value,
      },
    });
  }

  renderLoader() {
    return (
        <Loader id={styles.loader} size='massive' active />
    );
  }

  renderModal() {
    return (
      <ProjectCreateModal
        open={this.state.modalOpen}
        onStateChange={this.updateModalState.bind(this)}
        onFormUpdate={this.updateForm.bind(this)}
      />
    );
  }

  renderProjectCards() {
    const { projects } = this.state;
    /*
        We chunk the array of projects into "chunks" of size 3.
        This is because SUI rows don't naturally spill over into new rows.
        We should ideally find a cleaner way of doing this.
    */
    var projectChunks = [];
    const chunkSize = 3;
    for (var i = 0; i < projects.length; i += chunkSize) {
      projectChunks.push(projects.slice(i, i + chunkSize));
    }
    const rows = projectChunks.map((chunk, chunkIdx) => {
      return (
        <Grid.Row id={chunkIdx} columns={12}>
          {chunk.map((project) => {
            return (
              <Grid.Column id={project.id} stackable width={4}>
                <ProjectCard
                  projectName={project.projectName}
                  description={project.description}
                  stocksCount={project.stocksCount}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      );
    });
    return <Grid>{rows}</Grid>;
  }

  render() {
    return (
      <BasePanel title="[Name]'s Projects">
        {this.state.loading ? (
          this.renderLoader()
        ) : (
          <React.Fragment>
            <Button
              className="project-button"
              color="teal"
              onClick={() => this.updateModalState(true)}
            >
              Add Project
            </Button>
            <Divider hidden />
            {this.renderProjectCards()}
            {this.renderModal()}
          </React.Fragment>
        )}
      </BasePanel>
    );
  }
}

export default ProjectsPanel;
