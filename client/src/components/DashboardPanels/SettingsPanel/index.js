import React, { Component } from 'react';
import styles from './styles.module.css';
import { Grid, Divider, Table, Icon, Button } from "semantic-ui-react";
import BasePanel from "../BasePanel";

const SettingsPanel = (props) => {
    function renderProfile() {
        return (
            <div>
                <Grid>
                    <Grid.Column>
                        <Icon 
                        size='big' 
                        name="user outline"
                        id={styles.user_icon} 
                        >
                            <div id={styles.title} >
                                Account
                            </div>
                        </Icon>
                    </Grid.Column>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <b>First Name:</b> {props.user.firstName}
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <b>Last Name:</b> {props.user.lastName}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <b>Username:</b> {props.user.username}
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <b>Email Address:</b> {props.user.email}
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
                        <br></br>
                        <Table.Row>
                            {renderProfile()}
                        </Table.Row>
                        <br></br>
                        <br></br>
                        <Table.Row id={styles.table_buttons}>
                            <Button color='green' onClick={handleChangePassword}>
                                Change Password
                            </Button>
                        </Table.Row>
                        <br></br>
                        <Table.Row>
                            <Button color='red' onClick={handleDeleteAccount}>
                                Delete Account
                            </Button>
                        </Table.Row>
                        <br></br>
                    </Table.Body>
                </Table>
            </BasePanel>
        );
    }

export default SettingsPanel;