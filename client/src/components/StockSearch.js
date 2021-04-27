import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
// import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Navbar from './Navbar';
import Topbar from './Topbar';

class StockSearch extends Component {
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
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default StockSearch;