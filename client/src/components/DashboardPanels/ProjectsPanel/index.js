import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Divider, Dimmer, Loader } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import ApiHandler from "../../../api";
import BasePanel from "../BasePanel";
import ProjectCreateModal from "../../Modals/ProjectCreateModal";
import ProjectDeleteModal from "../../Modals/ProjectDeleteModal";
import ProjectCard from "../../ProjectCard";
import styles from "./styles.module.css";

class ProjectsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectForm: {
        title: "",
        description: "",
        tickers: [],
      },
      projects: [],
      createModalOpen: false,
      deleteModalOpen: false,
      deleteModalProject: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  updateModalState(modalName, isOpen) {
    this.setState({
      [modalName]: isOpen,
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

  updateStocks(ticker, remove = false) {
    if (remove) {
      this.updateForm("tickers", null, [
        ...this.state.newProjectForm.tickers.filter((s) => s !== ticker),
      ]);
    } else if (this.state.newProjectForm.tickers.indexOf(ticker) === -1) {
      this.updateForm("tickers", null, [
        ...this.state.newProjectForm.tickers,
        ticker,
      ]);
    }
  }

  fetchProjects() {
    this.setState(
      {
        loading: true,
      },
      () => {
        ApiHandler.get("data", "project")
          .then((res) => {
            this.setState({
              projects: [...res.data],
            });
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.setState({
              loading: false,
            });
          });
      }
    );
  }

  submitNewProject() {
    this.setState({
      loading: true,
    });
    const { title, description, tickers } = this.state.newProjectForm;
    ApiHandler.post(
      "data",
      "project",
      {},
      {
        project_name: title,
        description,
        tickers,
      }
    )
      .then((res) => {
        this.setState({
          projects: [...this.state.projects, res.data],
          createModalOpen: false,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          createModalOpen: false,
          loading: false,
        });
      });
  }

  deleteProject() {
    try {
      this.setState(
        {
          loading: true,
        },
        async () => {
          await ApiHandler.delete(
            "data",
            `project/${this.state.deleteModalProject.id}`,
            {},
            {},
            {
              removeTrailingSlash: true,
            }
          );
          this.setState({
            loading: false,
            projects: this.state.projects.filter((p) => p.id !== this.state.deleteModalProject.id),
            deleteModalOpen: false,
            deleteModalProject: {}
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  renderCreateProjectModal() {
    return (
      <ProjectCreateModal
        open={this.state.createModalOpen}
        stocks={this.state.newProjectForm.tickers}
        onStateChange={(state) =>
          this.updateModalState("createModalOpen", state)
        }
        onFormUpdate={this.updateForm.bind(this)}
        onStockUpdate={this.updateStocks.bind(this)}
        onSubmit={this.submitNewProject.bind(this)}
        loading={this.state.loading}
      />
    );
  }

  renderDeleteProjectModal() {
    return (
      <ProjectDeleteModal
        projectName={this.state.deleteModalProject.project_name}
        open={this.state.deleteModalOpen}
        onStateChange={(state) =>
          this.updateModalState("deleteModalOpen", state)
        }
        onDelete={this.deleteProject.bind(this)}
        loading={this.state.loading}
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
                  projectName={project.project_name}
                  description={project.description}
                  stocksCount={project.stocks.length}
                  onClickOpen={() =>
                    this.props.history.push(`/dashboard/projects/${project.id}`)
                  }
                  onClickDelete={() =>
                    this.setState({
                      deleteModalOpen: true,
                      deleteModalProject: project,
                    })
                  }
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
      <BasePanel
        title={`${this.props.user.firstName}'s Projects`}
        subtitle={`Projects are an easy way to organize your various trading strategies and portfolios.\nAttach a number of stock tickers to your project and track progress over time.`}
        loading={this.state.loading}
      >
        <Button
          id={styles.button}
          color="teal"
          onClick={() => this.updateModalState("createModalOpen", true)}
        >
          Create a Project
        </Button>
        <Divider hidden />
        {this.renderProjectCards()}
        {this.renderCreateProjectModal()}
        {this.renderDeleteProjectModal()}
      </BasePanel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profile,
  };
};

export default connect(mapStateToProps)(ProjectsPanel);
