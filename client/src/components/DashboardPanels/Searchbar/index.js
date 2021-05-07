import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import _ from "lodash";

const list = [
    {
        company: "Disney",
        stock_name: "DIS",
        stock_value: '$186.02'
    },
    {
        company: "Coca-Cola",
        stock_name: "KO",
        stock_value: '$53.98'
    },
    {
        company: "Apple",
        stock_name: "AAPL",
        stock_value: '$127.85'
    },
];

const initialState = { isLoading: false, results: [], value: '' }

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          results: [],
          isLoading: false,
          value: "",
        };
      }
    
      state = initialState
    
      handleResultSelect = (e, { result }) => this.setState({ value: result.company })
    
      handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = (result) => re.test(result.company)
    
          this.setState({
            isLoading: false,
            results: _.filter(list, isMatch),
          })
        }, 300)
      }

      render() {
        const { isLoading, value, results } = this.state
        const resRender = (data, key) => {
          return (
            <div key={key}>
              <div>
                { data.company }
              </div>
              <div>
                { data.stock_name}
              </div>
              <div>
                { data.stock_value }
              </div>
            </div>
          );
        }

        return (
            <Search
                fluid
                icon="search"
                placeholder="Search Stocks..."
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 200, {
                    leading: true,
                })}
                results={results}
                value={this.state.value}
                resultRenderer={resRender}
            />
        )
      }
}

export default Searchbar;