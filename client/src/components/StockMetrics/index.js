import React from "react";
import { Button, Loader } from "semantic-ui-react"
import styles from "./styles.module.css";
import ApiHandler from "../../api";
import ScrollingDigits from "../ScrollingDigits"

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";

class StockMetrics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePrice: {
        interval: null,
        value: null,
        style: {
          color: "black",
          fontWeight: "normal"
        },
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
      const { data } = await ApiHandler.get(
        "data",
        `stock/price/${ticker}?interval=${this.state.interval}`
      );
      this.setState({ data });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  closePriceChart() {
    const data = this.state.data.map((point) => {
      return {
        name: point.date,
        open: point.open,
        close: point.close,
      };
    });
    return (
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="green" />
        <Line type="monotone" dataKey="open" stroke="teal" />
      </LineChart>
    );
  }

  intervalButtons(){
    const intervals = ["1m", "5m", "15m", "30m", "1h", "4h"]
    const changeInterval = (interval) => {
      this.setState({
        interval
      }, () => {
        this.fetchPriceData()
      })
    }
    return(
      <div id={styles.intervalButtons}>
        {
          intervals.map((interval) => {
            const active = this.state.interval === interval;
            return(
              <Button onClick={() => changeInterval(interval)} color={active ? "teal" : null}>{interval}</Button>
            )
          })
        } 
      </div>
    )
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
                  style: {
                    fontWeight: "bold",
                    color: "teal"
                  },
                },
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    activePrice: {
                      ...this.state.activePrice,
                      value: data[0].price,
                      style: {
                        fontWeight: "normal",
                        color: "black"
                      },
                    },
                  });
                }, 300)
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
    if(this.state.loading){
      return(
        <div id={styles.loaderWrapper}>
          <Loader size="big" active inline='centered'/>
        </div>
      )
    }
    return (
      <div id={styles.wrapper}>
        <span id={styles.header}>{this.props.ticker}</span>
        <p
          id={styles.activePrice}
          style={{
            ...this.state.activePrice.style,
            transition: "all 0.1s ease",
          }}
        >
          <ScrollingDigits sum={100.122}/>
          {this.state.activePrice.value
            ? `$${this.state.activePrice.value}`
            : null}
        </p>
        <div id={styles.charts}>
          {this.state.data.length ? this.closePriceChart() : null}
        </div>
        {this.intervalButtons()}
      </div>
    );
  }
}

export default StockMetrics;
