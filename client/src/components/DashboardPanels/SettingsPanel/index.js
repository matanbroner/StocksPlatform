import React, { Component } from 'react';
import styles from './styles.module.css';
import { Grid, Table, Icon, Button, Segment, Image } from "semantic-ui-react";
import userDefaultImage from '../../../assets/images/user_default.png'
import BasePanel from "../BasePanel";

const SettingsPanel = (props) => {
    function renderProfile() {
        return (
            <div>
                <Grid>
                    <Grid.Column width={2} >
                        <Image 
                            id={styles.profile}
                            src={userDefaultImage}
                            size='medium' circular 
                        />
                    </Grid.Column>
                    <Grid.Column id={styles.column} width={2}>
                        <div id={styles.title}>
                            Account
                        </div>
                    </Grid.Column>
                    <Grid.Column id={styles.column} width={3}>
                        <div id={styles.title_2}>
                            Settings
                        </div>
                    </Grid.Column>
                    <Grid.Column id={styles.button_1} width={3}>
                        <Button color='teal' onClick={handleChangePassword}>
                            Change Password
                        </Button>
                    </Grid.Column>
                    <Grid.Column id={styles.button_2} width={3}>
                        <Button color='red' onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </Grid.Column>
                    <Grid.Row id={styles.row}>
                        <Grid.Column>

                        </Grid.Column>
                        <Grid.Column width={5} id={styles.account_info}>
                            <b>First Name:</b> 
                            <Segment color="teal">{props.user.firstName}</Segment>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={5} id={styles.account_info}>
                            <b>Last Name:</b> 
                            <Segment color="teal">{props.user.lastName}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row id={styles.row}>
                        <Grid.Column>
                            
                        </Grid.Column>
                        <Grid.Column width={5} id={styles.account_info}>
                            <b>Username:</b> 
                            <Segment color="teal">{props.user.username}</Segment>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={5} id={styles.account_info}>
                            <b>Email Address:</b> 
                            <Segment color="teal">{props.user.email}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

    function handleChangePassword() {
        return (
            console.log("Change Password")
        );
    }

    function handleDeleteAccount() {
        return (
            console.log("Account Deleted")
        );
    }

        return (
            <BasePanel
            title="Platform Settings">
                <Table id={styles.table}>
                    <Table.Body>
                        <Table.Row id={styles.profile}>
                            {renderProfile()}
                        </Table.Row>
                        <br></br>
                    </Table.Body>
                </Table>
            </BasePanel>
        );
    }

export default SettingsPanel;