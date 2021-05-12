import React from "react";
import BasePanel from "../BasePanel";
import { Card, Icon, Image } from "semantic-ui-react";
import userDefaultImage from '../../../assets/images/user_default.png';
import Charts from "../Charts/index";

class HomePanel extends React.PureComponent {
  renderProfileCard() {
    return (
      <Card>
        <Image src={userDefaultImage} wrapped ui={false} />
        <Card.Content>
          <Card.Header>[Name]</Card.Header>
          <Card.Meta>
            <span className="date">Joined in [Year]</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="chart line" />
            [Number] Active Projects
          </a>
        </Card.Content>
      </Card>
    );
  }

  render 
  render() {
    return (
      <BasePanel title={`Welcome back [Name]!`}>
        <Charts />
        <div>
            {this.renderProfileCard()}
        </div>
      </BasePanel>
    );
  }
}

export default HomePanel;
