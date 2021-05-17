import React, { Component } from 'react';
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
  Sidebar,
  Visibility, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Logo() {
    return (
      <div id={styles.Logo}>
        <img src="/images/logo.png" alt="Banana Stocks Logo" id={styles.logoimage}/>
      </div>
    )
  }
  
  function Message() {
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
    )
  }
  
  function SignUpButton() {
    return (
      <div id={styles.Signup}>
        <Button basic inverted color="green" id={styles.sign_button}>Sign Up</Button>
      </div>
    )
  }
  
  function LogInButton() {
    return (
      <div id={styles.Login}>
        <Button basic inverted color="green">Log In</Button>
      </div>
    )
  }

class Home extends Component {
    render() {
      return (
          <div id={styles.HomeBackground}>
              <Header id={styles.Header} as='h2'>
                  <Logo />

                  <div id={styles.Buttons}>
                      <Link to='/signup'>
                          <SignUpButton />
                      </Link>
                      
                      <Link to='/login'>
                          <LogInButton />
                      </Link>
                  </div>
              </Header>
              <Message />
              <Segment id={styles.company_about} style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Header as='h3' style={{ fontSize: '2em' }}>
                        We Help Stock Buyers of All Interests
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>
                        We can help all stock buyers, whether experienced or just beginning.
                        We are simply here to help and bring the data and usability people need.
                      </p>
                      <Header as='h3' style={{ fontSize: '2em' }}>
                        We Always Keep You Up to Date
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>
                        Yes that's right, you will never be behind on the latest stock news.
                        No more being late to the latest stock trends!
                      </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={8}>
                      <Image id={styles.home_image} bordered rounded size='huge' src='/images/home-photo.jpg' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column textAlign='center'>
                      <br></br>
                      <br></br>
                      <br></br>
                      <Button size='huge' color='teal'>Check Out Our Reviews</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>

              <Segment style={{ padding: '0em' }} vertical>
                <Grid celled='internally' columns='equal' stackable>
                  <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                      <Header as='h3' style={{ fontSize: '2em' }}>
                        "Has the best Stock Metrics"
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>- Recorded from 10,000 surveyed users</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                      <Header as='h3' style={{ fontSize: '2em' }}>
                        "BananaStocks has helped me successfully earn hundreds of dollars!"
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>
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
                  <Header as='h3' style={{ fontSize: '2em' }}>
                    How BananaStocks Began
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    On April 5th, 2021, BananaStocks was first created by five students from the University
                    of California, Santa Cruz with a desire to simply the user's experiences
                    in discovering the best stocks to buy!
                  </p>
                  <br></br><br></br>
                  <Header as='h3' style={{ fontSize: '2em' }}>
                    How We Picked Our Name
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
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
                      {/* <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                          <List.Item as='a'>Sitemap</List.Item>
                          <List.Item as='a'>Contact Us</List.Item>
                          <List.Item as='a'>Religious Ceremonies</List.Item>
                          <List.Item as='a'>Gazebo Plans</List.Item>
                        </List>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Header inverted as='h4' content='Services' />
                        <List link inverted>
                          <List.Item as='a'>Banana Pre-Order</List.Item>
                          <List.Item as='a'>DNA FAQ</List.Item>
                          <List.Item as='a'>How To Access</List.Item>
                          <List.Item as='a'>Favorite X-Men</List.Item>
                        </List>
                      </Grid.Column>
                      <Grid.Column width={7}>
                        <Header as='h4' inverted>
                          Footer Header
                        </Header>
                        <p>
                          Extra space for a call to action inside the footer that could help re-engage users.
                        </p>
                      </Grid.Column> */}
                    </Grid.Row>
                  </Grid>
                </Container>
              </Segment>
          </div>
      )
    }
}

export default Home;