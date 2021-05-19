import React from 'react'
import { Divider } from "semantic-ui-react";
import styles from './styles.module.css'

const BasePanel = (props) => (
  <div id={styles.wrapper}>
    <h1 className="base-panel-title">{props.title}</h1>
    <Divider hidden section/>
    <div className="base-panel-contents">{props.children}</div>
  </div>
);

export default BasePanel;
