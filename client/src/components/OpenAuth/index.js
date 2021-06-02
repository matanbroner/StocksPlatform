import React, { useState } from "react";
import styles from "./styles.module.css";
import { Icon } from "semantic-ui-react";

const OpenAuth = (props) => {
  const [hover, setHover] = useState(false);
  const formatProviderName = () => {
    return props.provider.charAt(0).toUpperCase() + props.provider.slice(1);
  };

  const providerLink = () => {
    return `http://localhost:5001/oauth/${props.provider}/login`;
  };

  const icon = () => {
    switch (props.provider) {
      case "google":
        return <Icon name="google" />;
      case "facebook":
        return <Icon name="facebook f" />;
    }
  };

  const backgroundColor = () => {
    switch (props.provider) {
      case "google":
        return hover ? "#F35138" : "#D84832";
      case "facebook":
        return hover ? "#648CDE" : "#577AC0";
    }
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <a href={providerLink()}>
        <div
          className={styles.oauthButton}
          style={{
            backgroundColor: backgroundColor(),
          }}
        >
          {icon()}
          <span style={{ paddingLeft: "30px" }}>
            Login with {formatProviderName()}
          </span>
        </div>
      </a>
    </div>
  );
};

export default OpenAuth;
