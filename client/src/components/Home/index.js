import React, { Component } from "react";
import styles from "./styles.module.css";
import { 
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Message,
  Sidebar,
  Visibility,
  Modal } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class Home extends Component {
  renderLogo() {
    return (
      <div id={styles.Logo}>
        <img
          src="/images/logo.png"
          alt="Banana Stocks Logo"
          id={styles.logoimage}
        />
      </div>
    );
  }

  renderMessage() {
    return (
      <Header size="large">
        <div id={styles.HomeMessage}>
          BananaStocks
        </div>
        <br></br>
        <div id={styles.HomeMessage2}>
          Here to support all your stock portfolio needs
        </div>
      </Header>
    );
  }

  renderSignUpButton() {
    return (
      <div id={styles.Signup}>
        <Button basic inverted color="teal">
          Sign Up
        </Button>
      </div>
    );
  }

  renderLogInButton() {
    return (
      <div id={styles.Login}>
        <Button basic inverted color="teal">
          Log In
        </Button>
      </div>
    );
  }
  render() {
    return (
      <div id={styles.HomeBackground}>
        <Header id={styles.Header} as="h2">
          {this.renderLogo()}
          {this.renderMessage()}

          <div id={styles.buttons}>
            <Link to="/signup">{this.renderSignUpButton()}</Link>
            <Link to="/login">{this.renderLogInButton()}</Link>
          </div>
        </Header>
        <div id={styles.background}>
          <Segment id={styles.company_about} style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as='h3' style={{ fontSize: '2.3em' }}>
                    We Help Stock Buyers of All Interests
                  </Header>
                  <p style={{ fontSize: '1.5em', color: 'black' }}>
                    We can help all stock buyers, whether experienced or just beginning.
                    We are simply here to help and bring the data and usability people need.
                  </p>
                  <Header as='h3' style={{ fontSize: '2.3em' }}>
                    We Always Keep You Up to Date
                  </Header>
                  <p style={{ fontSize: '1.5em', color: 'black' }}>
                    Yes that's right, you will never be behind on the latest stock news.
                    No more being late to the latest stock trends!
                  </p>
                </Grid.Column>
                <Grid.Column floated='right' width={8}>
                  <Image id={styles.home_image} bordered rounded size='huge' src='/images/home-photo.jpg' />
                  {/* <iframe src="https://giphy.com/embed/RtOXrOEjQ78VywITBN" id={styles.giphy} allowFullScreen></iframe> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Modal
                    trigger={<Button size='huge' color='teal'>Check Out Our Reviews</Button>}
                    header='BananaStocks Reviews'
                    content='Reviews Feature Coming Soon!'
                    actions={[{ key: 'done', content: 'Done', positive: true }]}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2.3em' }}>
                    "Has the best Stock Metrics"
                  </Header>
                  <p style={{ fontSize: '1.5em', color: 'black' }}>- Recorded from 10,000 surveyed users</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2.3em' }}>
                    "BananaStocks has helped me successfully earn hundreds of dollars!"
                  </Header>
                  <p style={{ fontSize: '1.5em', color: 'black' }}>
                    - John Smith
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Divider
                as='h4'
                className='header'
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <div id={styles.divider}>Our History</div>
              </Divider>
              <br></br>
              <Header as='h3' style={{ fontSize: '2.1em' }}>
                How BananaStocks Began
              </Header>
              <p style={{ fontSize: '1.4em', color: 'black' }}>
                On April 5th, 2021, BananaStocks was first created by five students from the University
                of California, Santa Cruz with a desire to simply the user's experiences
                in discovering the best stocks to buy!
              </p>
              <br></br><br></br>
              <Header as='h3' style={{ fontSize: '2.1em' }}>
                How We Picked Our Name
              </Header>
              <p style={{ fontSize: '1.4em', color: 'black' }}>
                Interestingly enough, this was only suppose to be a temporary name that 
                was supposed be changed later. But since so many users loved the name BananaStocks,
                we kept it the same all these years! 
                We also just love bananas, so don't forget to eat your bananas!
              </p>
              {/* <Button as='a' size='large'>
                Read More
              </Button> */}
            </Container>
          </Segment>

          <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Icon name='copyright outline' />
                  <div>
                    BananaStocks 2021
                  </div>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </div>
      </div>
    );
  }
}

export default Home;
