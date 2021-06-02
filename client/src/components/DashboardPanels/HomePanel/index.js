import React from "react";
import BasePanel from "../BasePanel";
import { Card, Icon, Image } from "semantic-ui-react";
import userDefaultImage from '../../../assets/images/user_default.png'
import { dateStringToEnglish } from "../../../util"

const HomePanel = (props) => {
  function renderProfileCard() {
    return (
      <Card>
        <Image src={userDefaultImage} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.user.firstName}</Card.Header>
          <Card.Meta>
            <span className="date">Joined {dateStringToEnglish(props.user.createdAt)}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }

    return (
      <BasePanel title={`Welcome back ${props.user.firstName}!`}>
        <div>
            {renderProfileCard()}
        </div>
      </BasePanel>
    );
}

export default HomePanel;
