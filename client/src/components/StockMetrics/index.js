import React from "react";
import { Button, Loader } from "semantic-ui-react";
import styles from "./styles.module.css";
import ApiHandler from "../../api";
import AnimatedNumber from "animated-number-react";
import ApexCandelstickChart from "../Charts/ApexCandlestickChart";

class StockMetrics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePrice: {
        interval: null,
        value: null,
        compare: 0,
      },
      interval: "1h",
      loading: false,
    };
  }

  componentDidMount() {
    this.setCurrentPriceInterval();
    this.fetchPriceData();
  }

  componentWillUnmount() {
    if (this.state.activePrice.interval) {
      clearInterval(this.state.activePrice.interval);
    }
  }

  async fetchPriceData() {
    const { ticker } = this.props;
    this.setState({
      loading: true,
    });
    try {
      let { data } = await ApiHandler.get(
        "data",
        `stock/price/${ticker}?interval=${this.state.interval}`
      );
      data = data.slice(data.length - 30);
      this.setState({ data });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  formatPriceData() {
    return [
      {
        data: this.state.data.map((point) => {
          return {
            x: new Date(point.date),
            y: [point.open, point.high, point.low, point.close],
          };
        }),
      },
    ];
  }

  renderChart() {
    return this.state.data ? (
      <ApexCandelstickChart data={this.formatPriceData()} />
    ) : null;
  }

  intervalButtons() {
    const intervals = ["1m", "5m", "15m", "30m", "1h", "4h"];
    const changeInterval = (interval) => {
      this.setState(
        {
          interval,
        },
        () => {
          this.fetchPriceData();
        }
      );
    };
    return (
      <div id={styles.intervalButtons}>
        {intervals.map((interval) => {
          const active = this.state.interval === interval;
          return (
            <Button
              onClick={() => changeInterval(interval)}
              color={active ? "teal" : null}
            >
              {interval}
            </Button>
          );
        })}
      </div>
    );
  }

  setCurrentPriceInterval() {
    const { ticker } = this.props;
    this.setState({
      activePrice: {
        interval: setInterval(async () => {
          try {
            const { data } = await ApiHandler.get(
              "data",
              `stock/price/${ticker}`,
              {},
              {},
              {
                removeTrailingSlash: true,
              }
            );
            this.setState(
              {
                activePrice: {
                  ...this.state.activePrice,
                },
              },
              () => {
                let compare;
                if (data[0].price < this.state.activePrice) {
                  compare = -1;
                } else if (data[0].price > this.state.activePric) {
                  compare = 1;
                } else {
                  compare = 0;
                }
                setTimeout(() => {
                  this.setState({
                    activePrice: {
                      ...this.state.activePrice,
                      value: data[0].price,
                      compare,
                    },
                  });
                }, 300);
              }
            );
          } catch (e) {
            console.log(e);
          }
        }, 1500),
      },
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div id={styles.loaderWrapper}>
          <Loader size="big" active inline="centered" />
        </div>
      );
    }
    let color;
    if (this.state.activePrice.compare == 0) {
      color = "black";
    } else if (this.state.activePrice.compare == 1) {
      color = "green";
    } else {
      color = "red";
    }
    return (
      <div id={styles.wrapper}>
        <span id={styles.header}>{this.props.ticker}</span>
        {this.state.activePrice.value ? (
          <p
            style={{
              color,
            }}
            className={styles.activePrice}
          >
            $
            <AnimatedNumber
              value={`${this.state.activePrice.value}`}
              duration={300}
              formatValue={(value) => value.toFixed(2)}
            />
          </p>
        ) : null}

        <div id={styles.charts}>
          {this.state.data.length ? this.renderChart() : null}
        </div>
        {this.intervalButtons()}
      </div>
    );
  }
}

export default StockMetrics;
