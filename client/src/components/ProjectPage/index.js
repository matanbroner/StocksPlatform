import React from "react";
import styles from "./styles.module.css";
import BasePanel from "../DashboardPanels/BasePanel";
import ApexLineChart from "../Charts/ApexLineChart";
import IntervalPicker from "../IntervalPicker";
import MultiPicker from "../MultiPicker";
import {
  Tab,
  Grid,
  Card,
  Button,
  Label,
  Checkbox,
  Form,
} from "semantic-ui-react";

import ApiHandler from "../../api";

class ProjectPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectId: null,
      project: null,
      editedProjectKeys: {},
      priceHistory: {},
      activeTickers: [],
      articles: [],
      articleFetchInterval: null,
      interval: "1m",
      panes: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (!id) {
      this.props.history.push("/dashboard/projects");
    }
    this.setState(
      {
        projectId: id,
        panes: [
          { menuItem: "Portfolio", render: this.renderPortfolioTab.bind(this) },
          { menuItem: "News Feed", render: this.renderNewsFeedTab.bind(this) },
          { menuItem: "Settings", render: this.renderSettingsTab.bind(this) },
        ],
      },
      () => this.fetchProject()
    );
  }

  componentWillUnmount() {
    if (this.state.articleFetchInterval) {
      clearInterval(this.state.articleFetchInterval);
    }
  }

  fetchProject() {
    const { projectId } = this.state;
    this.setState(
      {
        loading: true,
      },
      () => {
        ApiHandler.get(
          "data",
          `project/${projectId}`,
          {},
          {},
          { removeTrailingSlash: true }
        )
          .then((res) => {
            this.setState(
              {
                project: res.data,
                activeTickers: res.data.stocks.map((s) => s.ticker),
              },
              () => {
                this.fetchTickersPriceHistory(false, false);
                this.fetchTickerNewsFeed(false, true);
                this.setState({
                  articleFetchInterval: setInterval(
                    () => this.fetchTickerNewsFeed(false, false),
                    10 * 1000
                  ),
                });
              }
            );
          })
          .catch((e) => {
            console.log(e);
          });
      }
    );
  }

  async fetchTickersPriceHistory(
    setLoadingTrue = false,
    setLoadingFalse = false
  ) {
    if (setLoadingTrue) {
      this.setState({
        loading: true,
      });
    }
    const fetchPrices = this.state.activeTickers.map((ticker) => {
      return ApiHandler.get(
        "data",
        `stock/price/${ticker}?interval=${this.state.interval}`
      );
    });
    Promise.all(fetchPrices)
      .then((res) => {
        let priceHistory = {};
        res.map((r, i) => {
          const ticker = this.state.activeTickers[i];
          priceHistory[ticker] = r.data;
        });
        this.setState({
          priceHistory,
        });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (setLoadingFalse) {
          this.setState({
            loading: false,
          });
        }
      });
  }

  fetchTickerNewsFeed(setLoadingTrue = false, setLoadingFalse = false) {
    if (setLoadingTrue) {
      this.setState({
        loading: true,
      });
    }
    const fetchNews = this.state.activeTickers.map((ticker) => {
      // fetch one week old news at max
      return ApiHandler.get(
        "data",
        `news/article?ticker=${ticker}&time_frame=7`
      );
    });
    let articles = [];
    Promise.allSettled(fetchNews)
      .then((resps) => {
        resps.forEach((res) => {
          if (res.status === "fulfilled") {
            articles = [...articles, ...res.value.data];
          }
        });
        articles = articles.sort(
          (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published)
        );
        console.log(articles);
        this.setState({ articles });
      })
      .finally(() => {
        if (setLoadingFalse) {
          this.setState({
            loading: false,
          });
        }
      });
  }

  saveProjectSettings() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const res = await ApiHandler.put(
          "data",
          `project/${this.state.project.id}`,
          {},
          this.state.editedProjectKeys,
          { removeTrailingSlash: true }
        );
        this.setState({
          loading: false,
          project: res.data,
          editedProjectKeys: {},
        });
      }
    );
  }

  formatTickerPriceHistory() {
    return Object.entries(this.state.priceHistory).map(([ticker, history]) => {
      return {
        name: ticker,
        data: history.map((entry) => {
          return {
            x: new Date(entry.date),
            y: entry.close,
          };
        }),
      };
    });
  }

  formatNewsFeedSentiment() {}

  editProjectSettings(key, e, value = null) {
    if (value === null) {
      value = e.target.value;
    }
    this.setState({
      editedProjectKeys: {
        ...this.state.editedProjectKeys,
        [key]: value,
      },
    });
  }

  renderTickerTabs() {
    if (this.state.project) {
      return this.state.project.stocks.map((stock) => {
        return <Label key={stock.ticker}>{stock.ticker}</Label>;
      });
    }
  }

  renderProjectInfoCard() {
    return (
      <Card className={styles.infoCard}>
        <Card.Content>
          <Card.Header>Project Information</Card.Header>
          <h5 className={styles.cardHeader}>Created Date</h5>
          <p>{this.state.project ? this.state.project.created_at : null}</p>
          <h5 className={styles.cardHeader}>Active Status</h5>
          {this.state.project ? this.renderProjectActiveLabel() : null}
          <h5 className={styles.cardHeader}>Portfolio Health</h5>
          <Label color="green">Healthy</Label>
          <h5 className={styles.cardHeader}>Associated Tickers</h5>
          {this.renderTickerTabs()}
        </Card.Content>
      </Card>
    );
  }

  renderProjectActiveLabel(){
    if(this.state.project.is_active){
      return(
        <Label color="green">Active</Label>
      )
    } else {
      return(
        <Label color="red">Inactive</Label>
      )
    }
  }

  renderPaneContainer(title, children) {
    return (
      <div className={styles.pane}>
        <Grid id={styles.gridContent}>
          <Grid.Row id={styles.paneContentRow}>
            <Grid.Column width={3}>{this.renderProjectInfoCard()}</Grid.Column>
            <Grid.Column width={13} id={styles.panelContentColumn}>
              <Card className={styles.paneContentCard}>
                <Card.Content>
                  <Card.Header>{title}</Card.Header>
                  {children}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  renderPortfolioTab() {
    const content = (
      <React.Fragment>
        <h5 className={styles.cardHeader}>Interval</h5>

        <IntervalPicker
          interval={this.state.interval}
          onChange={(interval) =>
            this.setState({ interval }, () =>
              this.fetchTickersPriceHistory(true, true)
            )
          }
        />
        <h5 className={styles.cardHeader}>Active Tickers</h5>
        {this.state.project ? (
          <MultiPicker
            items={this.state.project.stocks.map((s) => s.ticker)}
            activeItems={this.state.activeTickers}
            onChange={(ticker) => {
              let { activeTickers } = this.state;
              console.log(activeTickers);
              if (activeTickers.indexOf(ticker) === -1) {
                activeTickers = [...activeTickers, ticker];
              } else {
                activeTickers = [...activeTickers.filter((i) => i !== ticker)];
              }
              this.setState(
                {
                  activeTickers,
                },
                () => this.fetchTickersPriceHistory(true, true)
              );
            }}
          />
        ) : null}
        <h5 className={styles.cardHeader}>Closing Prices</h5>
        <ApexLineChart
          series={this.formatTickerPriceHistory()}
          yLabel="Close Price"
        />
      </React.Fragment>
    );
    return this.renderPaneContainer("Analytics", content);
  }

  renderNewsFeedTab() {
    const content = (
      <React.Fragment>
        <div id={styles.liveBlinkerWrapper}>
          <Label className={styles.liveBlinker} circular color="red" empty />
          <span>Fetching live news...</span>
        </div>
        {this.state.articles.map((article, i) => {
          let color;
          if (article.avg_sentiment == 0) {
            color = "yellow";
          } else {
            color = article.avg_sentiment > 0 ? "green" : "red";
          }
          return (
            <Card key={i} fluid color={color}>
              <Card.Content>
                <Card.Header>
                  <a
                    style={{ display: "table-cell" }}
                    href={article.article_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.headline}
                  </a>
                  <Label
                    className={styles.articleTickerLabel}
                    content={article.ticker}
                  />
                </Card.Header>
                <Card.Meta>{article.avg_sentiment} Average Sentiment</Card.Meta>
              </Card.Content>
            </Card>
          );
        })}
      </React.Fragment>
    );
    return this.renderPaneContainer("News Feed", content);
  }

  renderSettingsTab() {
    const content = (
      <React.Fragment>
        <Form className={styles.form}>
          <Form.Field>
            <label>Project Name</label>
            <input
              value={
                this.state.editedProjectKeys.project_name ||
                this.state.project.project_name
              }
              onChange={(e) => this.editProjectSettings("project_name", e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Project Description</label>
            <textarea
              value={
                this.state.editedProjectKeys.description ||
                this.state.project.description
              }
              onChange={(e) => this.editProjectSettings("description", e)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              toggle
              checked={
                "is_active" in this.state.editedProjectKeys
                  ? this.state.editedProjectKeys.is_active
                  : this.state.project.is_active
              }
              onChange={(e, d) => {
                this.editProjectSettings("is_active", e, d.checked);
              }}
              label="Project Active"
            />
          </Form.Field>
          <Button
            disabled={Object.keys(this.state.editedProjectKeys).length === 0}
            onClick={() => this.saveProjectSettings()}
            type="submit"
          >
            Save Changes
          </Button>
        </Form>
      </React.Fragment>
    );
    return this.renderPaneContainer("Project Settings", content);
  }

  render() {
    return (
      <BasePanel
        title={this.state.project ? this.state.project.project_name : null}
        subtitle={
          this.state.project ? `${this.state.project.description}` : null
        }
        loading={this.state.loading}
      >
        <Button
          secondary
          content="All Projects"
          icon="left arrow"
          labelPosition="left"
          onClick={() => this.props.history.push("/dashboard/projects")}
        />
        <Tab
          className={styles.tabPanes}
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
      </BasePanel>
    );
  }
}

export default ProjectPage;
