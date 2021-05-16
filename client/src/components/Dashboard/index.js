import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Navbar from "../Navbar";
import Topbar from "../Topbar/index";

import HomePanel from "../DashboardPanels/HomePanel/index";
import ProjectsPanel from "../DashboardPanels/ProjectsPanel";
import StocksPanel from "../DashboardPanels/StocksPanel/index";
import SettingsPanel from "../DashboardPanels/SettingsPanel/index";

import ProjectPage from "../ProjectPage"

class Dashboard extends React.Component {
  renderSubrouter() {
    return (
      <>
        <Route path="/dashboard" exact component={(props) => (
                <HomePanel
                  {...props}
                  user={this.props.user}
                />
        )}
        />
        <Route path="/dashboard/projects" exact component={ProjectsPanel} />
        <Route path="/dashboard/projects/:id" component={ProjectPage} />
        <Route path="/dashboard/stocks" exact component={StocksPanel} />
        <Route path="/dashboard/settings" exact component={SettingsPanel} />
      </>
    );
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row className="dash-top">
            <Grid.Column stretched width={16}>
              <Topbar 
              onLogout={() => this.props.onLogout()}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column stretched width={4}>
              <Navbar />
            </Grid.Column>
            <Grid.Column stretched width={12}>
              {this.renderSubrouter()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profile,
  };
};

export default connect(mapStateToProps)(Dashboard);
