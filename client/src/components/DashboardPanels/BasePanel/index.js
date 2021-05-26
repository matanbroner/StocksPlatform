import React from "react";
import { Divider, Loader } from "semantic-ui-react";
import styles from "./styles.module.css";

const BasePanel = (props) => {
  const renderLoader = () => {
    return <Loader id={styles.loader} size="massive" active />;
  };
  const renderContent = () => {
    return (
      <div id={styles.content}>
        <h1 id={styles.title}>{props.title}</h1>
        {props.subtitle ? <p id={styles.subtitle}>{props.subtitle}</p> : null}
        <Divider hidden />
        {props.children}
      </div>
    );
  };
  return (
    <div id={styles.wrapper}>
      {props.loading ? renderLoader() : renderContent()}
    </div>
  );
};

export default BasePanel;
