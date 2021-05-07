import React, { Component } from "react";
import styles from "./styles.module.css";
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Navbar from "../Navbar";
import Topbar from "../Topbar/index";

import HomePanel from "../DashboardPanels/HomePanel/index";
import ProjectsPanel from "../DashboardPanels/ProjectsPanel";
import StocksPanel from "../DashboardPanels/StocksPanel/index";
import SettingsPanel from "../DashboardPanels/SettingsPanel/index";

class Dashboard extends Component {
  renderSubrouter() {
    return (
      <>
        <Route path="/dashboard" exact component={HomePanel} />
        <Route path="/dashboard/projects" exact component={ProjectsPanel} />
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
              <Topbar />
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

export default Dashboard;
