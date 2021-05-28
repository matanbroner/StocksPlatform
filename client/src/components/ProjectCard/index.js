import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import styles from "./styles.module.css";

const ProjectCard = (props) => {
  return (
    <Card className={styles.wrapper}>
      <Card.Content header={props.projectName} />
      <Card.Content id={styles.description} description={props.description} />
      <Card.Content id={styles.ticker} extra >
        <Icon name="chart line" />{props.stocksCount} {props.stocksCount === 1 ? "Ticker" : "Tickers"}
      </Card.Content>
      <Button color='grey'>Delete</Button>
    </Card>
  );
};

export default ProjectCard
