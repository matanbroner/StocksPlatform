import React, { Component, useState } from "react";
import { Sidebar, Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = (props) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <div>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={isOpen}
        width="thin"
        id={styles.nav_sidebar}
      >
        <Menu.Item as="div" id={styles.logo}>
          <img
            src="/images/logo.png"
            alt="Banana Stocks Logo"
            id={styles.nav_logo}
          />
        </Menu.Item>

        <Link to="/dashboard">
          <Menu.Item as="div">
            <Icon name="home" id={styles.nav_icon} />
            <div id={styles.title}>Home</div>
          </Menu.Item>
        </Link>

        <Link to="/dashboard/projects">
          <Menu.Item as="div">
            <Icon name="archive" className="nav-icon" />
            <div className="nav-title">Projects</div>
          </Menu.Item>
        </Link>

        <Link to="/dashboard/stocks">
          <Menu.Item as="div">
            <Icon name="chart line" id={styles.nav_icon} />
            <div id={styles.title}>Stock Search</div>
          </Menu.Item>
        </Link>

        <Link to="/dashboard/settings">
          <Menu.Item as="div">
            <Icon name="settings" id={styles.nav_icon} />
            <div id={styles.title}>Settings</div>
          </Menu.Item>
        </Link>
        
        <Menu.Item id={styles.collapseBtn}>
          <Button onClick={() => setOpen(!isOpen)}>
            <Icon name="angle double left" />
          </Button>
        </Menu.Item>
      </Sidebar>
      <Button id={styles.openBtn} onClick={() => setOpen(!isOpen)}>
        <Icon name="angle double right" />
      </Button>
    </div>
  );
};

export default Navbar;
