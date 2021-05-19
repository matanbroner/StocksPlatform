import React from 'react'
import { Divider } from "semantic-ui-react";
import styles from './styles.module.css'

const BasePanel = (props) => (
  <div id={styles.wrapper}>
    <h1 id={styles.base_panel_title}>{props.title}</h1>
    <Divider hidden section/>
    <div id={styles.base_panel_contents}>{props.children}</div>
  </div>
);

export default BasePanel;
