import React, { Component } from "react";
import "../App.css";
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

import ProjectsPanel from "./DashboardPanels/ProjectsPanel";
import StocksPanel from "./DashboardPanels/StocksPanel";
import SettingsPanel from "./DashboardPanels/SettingsPanel";

class Dashboard extends Component {
  renderSubrouter() {
    return (
      <>
        <Route path="/dashboard" exact component={this.renderDashboardHomePanel()} />
        <Route path="/dashboard/projects" exact component={ProjectsPanel} />
        <Route path="/dashboard/stocks" exact component={StocksPanel} />
        <Route path="/dashboard/settings" exact component={SettingsPanel} />
      </>
    );
  }

  renderDashboardHomePanel() {
    return (
      <div className="dash-body">
        <div className="dash-title">Welcome Back, [Name]!</div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row className="dash-top">
            <Grid.Column stretched width={16}>
              <Topbar />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column stretched width={16}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column stretched width={16}>
              <Navbar />
            </Grid.Column>
            <Grid.Column stretched width={16}>
              {this.renderSubrouter()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
