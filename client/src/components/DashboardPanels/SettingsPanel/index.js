import React, { Component } from 'react';
import styles from './styles.module.css';
import { Grid, Divider, Table, Icon, Button } from "semantic-ui-react";
import BasePanel from "../BasePanel";
import ChangePassword from "../../ChangePassword";
import DeleteAccount from "../../DeleteAccount";

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
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <b>Last Name:</b> {props.user.lastName}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <b>Username:</b> {props.user.username}
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <b>Email Address:</b> {props.user.email}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
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
                    <Divider />
                    <br></br>
                    <Table.Row>
                        <ChangePassword user={props.user}/>
                    </Table.Row>
                    <br></br>
                    <Divider />
                    <br></br>
                    <Table.Row>
                        <DeleteAccount user={props.user}/>
                    </Table.Row>
                    <br></br>
                </Table.Body>
            </Table>
        </BasePanel>
    );
}

export default SettingsPanel;