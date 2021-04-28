import React, { Component } from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
// import { Link } from 'react-router-dom';
import { Grid, Search } from 'semantic-ui-react';
import Navbar from '../Navbar/index';
import Topbar from '../Topbar/index';
import ApiHandler from "../../api";

const results = [
    {
      name: "John",
      age: 14
    },
    {
      name: "Mary",
      age: 92
    }
];

class StockSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: "",
        };
    }

    render() {
        const resRender = () => (
            <span key="name">
              Hello it works!
            </span>
        );
        return (
            <div>
                <Grid>
                    <Grid.Row className="stock-top">
                        <Grid.Column stretched width={16}>
                            <Topbar />
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column stretched width={16}>
                        </Grid.Column>  
                    </Grid.Row>          
                    <Grid.Row>
                        <Grid.Column stretched width={16}>
                            <Navbar />
                        </Grid.Column>
                        <Grid.Column stretched width={16}>
                            <div className='stock-body'>
                                <div className='stock-title'>
                                    Stock Search
                                </div>
                                <div className='stock-search'>
                                    <Search
                                        fluid
                                        icon="search"
                                        placeholder="Search Stocks..."
                                        results={results}
                                        onChange={(e) => this.updateForm("stock", e)}
                                        resultRenderer={resRender}
                                    />
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default StockSearch;