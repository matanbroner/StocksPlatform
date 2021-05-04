import React, { Component } from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
// import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Navbar from '../Navbar/index';
import Topbar from '../Topbar/index';
// import axios from 'axios';

class Dashboard extends Component {
    // componentDidMount() {
    //     const config = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }

    //     axios.get('user', config).then(
    //         res => {
    //             console.log(res);
    //         },
    //         err => {
    //             console.log(err);
    //         }
    //     )
    // }

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
                            <div className='dash-body'>
                                <div className='dash-title'>
                                    Welcome Back, { this.props.username }!
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;