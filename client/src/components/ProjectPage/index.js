import React from "react";
import styles from "./styles.module.css";
import BasePanel from "../DashboardPanels/BasePanel";
import ApexChart from "../Charts/Apex";
import IntervalPicker from "../IntervalPicker";
import MultiPicker from "../MultiPicker";
import { Tab, Grid, Card, Button, Label } from "semantic-ui-react";

import ApiHandler from "../../api";

const baseArticles = [
  {
    headline: (ticker) => `Huge sales week for ${ticker}, millions sold!`,
    avg_sentiment: 0.85,
  },
  {
    headline: (ticker) => `Downturn for ${ticker} in legal battles.`,
    avg_sentiment: 0.23,
  },
  {
    headline: (ticker) =>
      `Partnership between US Govornment and ${ticker} begins.`,
    avg_sentiment: 0.68,
  },
  {
    headline: (ticker) =>
      `New product release by ${ticker} is very impressive.`,
    avg_sentiment: 0.92,
  },
  {
    headline: (ticker) =>
      `CEO of ${ticker} steps down after money laundering accusations.`,
    avg_sentiment: 0.32,
  },
];

const getArticle = (ticker) => {
  const article = baseArticles[Math.floor(Math.random() * baseArticles.length)];
  return {
    headline: article.headline(ticker),
    avg_sentiment: article.avg_sentiment,
    ticker,
  };
};

class ProjectPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectId: null,
      project: null,
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
          { menuItem: "NLP", render: this.renderNlpTab.bind(this) },
          { menuItem: "Settings", render: this.renderPortfolioTab },
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
                this.fetchTickersPriceHistory(false, true);

                // TODO: remove this and add actual news fetching with timer to fetch new data
                let articles = [];
                let { activeTickers } = this.state;
                for (let i = 0; i < 15; i++) {
                  const ticker =
                    activeTickers[
                      Math.floor(Math.random() * activeTickers.length)
                    ];
                  articles.push(getArticle(ticker));
                }
                this.setState({
                  articles,
                  articleFetchInterval: setInterval(() => {
                    let { activeTickers } = this.state;
                    const ticker =
                      activeTickers[
                        Math.floor(Math.random() * activeTickers.length)
                      ];
                    this.setState({
                      articles: [getArticle(ticker), ...this.state.articles],
                    });
                  }, 10 * 1000),
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
          {this.state.project ? <Label color="green">Active</Label> : null}
          <h5 className={styles.cardHeader}>Portfolio Health</h5>
          <Label color="green">Healthy</Label>
          <h5 className={styles.cardHeader}>Associated Tickers</h5>
          {this.renderTickerTabs()}
        </Card.Content>
      </Card>
    );
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
        <ApexChart
          series={this.formatTickerPriceHistory()}
          yLabel="Close Price"
        />
      </React.Fragment>
    );
    return this.renderPaneContainer("Analytics", content);
  }

  renderNlpTab() {
    const content = (
      <React.Fragment>
        <div id={styles.liveBlinkerWrapper}>
          <Label className={styles.liveBlinker} circular color="red" empty />
          <span>Fetching live news...</span>
        </div>
        {this.state.articles.map((article, i) => (
          <Card
            key={i}
            fluid
            color={article.avg_sentiment > 0.5 ? "green" : "red"}
          >
            <Card.Content>
              <Card.Header>
                {article.headline}
                <Label className={styles.articleTickerLabel} content={article.ticker} />
              </Card.Header>
              <Card.Meta>{article.avg_sentiment} Average Sentiment</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </React.Fragment>
    );
    return this.renderPaneContainer("News Feed", content);
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
