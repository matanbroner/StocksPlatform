import React, { Component } from "react";
import styles from "./styles.module.css";
import "semantic-ui-css/semantic.min.css";

class OpenAuth extends Component {
  constructor(props) {
    super(props);
  }

  uppercase(provider) {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  }

  render() {
    var provider = this.uppercase(this.props.provider)
    var icon = `images/${this.props.provider}-icon.png`
    var link = `http://localhost:5001/oauth/${provider}/login`
    return (
        <div id={styles.oauthElement}>
            <a href={link}>
                <div id={styles.oauthButton}>
                    <img id={styles.oauthIcon} src={icon} width="25px" height="25px"></img>
                    <span style={{paddingLeft:"30px"}}>Login with {provider}</span>
                </div>
            </a>
        </div>
        
    )
  }
}

export default OpenAuth;
