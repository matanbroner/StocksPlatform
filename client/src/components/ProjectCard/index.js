import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import styles from "./styles.module.css";

const ProjectCard = (props) => {
  return (
    <Card>
      <Card.Content header={props.projectName} />
      <Card.Content description={props.description} />
      <Card.Content extra>
        <Icon name="chart line" />{props.stocksCount} Stocks
      </Card.Content>
      <Button color='grey'>Delete</Button>
    </Card>
  );
};

export default ProjectCard
