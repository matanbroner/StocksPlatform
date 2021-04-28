import React, { Component } from 'react';
import '../../App.css';
import { Grid } from 'semantic-ui-react';
import Navbar from '../Navbar';
import Topbar from '../Topbar';

class SettingsPanel extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row className="setting-top">
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
                            <div className='setting-body'>
                                <div className='setting-title'>
                                    My Settings
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default SettingsPanel;