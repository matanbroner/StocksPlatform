import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import styles from "./styles.module.css";

const ProjectCard = (props) => {
  return (
    <Card className={styles.wrapper}>
      <Card.Content header={props.projectName} />
      <Card.Content description={props.description} />
      <Card.Content extra>
        <Icon name="chart line" />{props.stocksCount} {props.stocksCount === 1 ? "Ticker" : "Tickers"}
      </Card.Content>
      <Button color='red'>Delete</Button>
    </Card>
  );
};

export default ProjectCard
