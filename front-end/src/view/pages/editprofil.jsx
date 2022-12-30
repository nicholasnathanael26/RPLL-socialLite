import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";
import FormEditProfile from "../components/formEditProfile";
import NavbarComponent from "../components/navbarComponent";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChangePassword from "../components/changepassword";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      marginLeft="100px"
    >
      {value === index && (
        <Box p={3} width={950}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

class Editprofil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  render() {
    const style = {
      margin: {
        marginTop: "150px",
      },
      style_hr: {
        marginTop: "50px",
      },
    };

    const useStyles = (theme) => ({
      root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
      },
    });

    const change = (event, newValue) => this.setState({ value: newValue });

    return (
      <Container>
        <NavbarComponent />
        <Row style={style.margin}>
          <div className={useStyles.root}>
            <Paper position="fixed" color="default">
              <Tabs
                value={this.state.value}
                onChange={change}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Edit Profile" {...a11yProps(0)}></Tab>
                <Tab label="Change Password" {...a11yProps(1)}></Tab>
              </Tabs>
              <TabPanel value={this.state.value} index={0}>
                <FormEditProfile />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <ChangePassword />
              </TabPanel>
            </Paper>
          </div>
        </Row>
      </Container>
    );
  }
}
export default Editprofil;
