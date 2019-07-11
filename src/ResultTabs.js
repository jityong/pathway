import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import MyMap from "./myMap";
import TestMap from "./TestMap";
import PcDialog from "./PcDialog";
import GpDialog from "./GpDialog";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

const ResultTabs = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="GP" />
          <Tab label="Polyclinic" />
          <Tab label="Map View" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          {props.GP.map(clinic => {
            return (
              <div key={clinic.properties.id}>
                <GpDialog clinic={clinic} />
                <hr />
              </div>
            );
          })}
        </TabContainer>
        <TabContainer dir={theme.direction}>
          {props.PC.map(clinic => {
            return (
              <div key={clinic.id}>
                <PcDialog clinic={clinic} />
                <hr />
              </div>
            );
          })}
        </TabContainer>
        <TabContainer dir={theme.direction}>
          {/* <object type="text/html" style={{width:"100vh", height:"100vh"}} data="https://data.gov.sg/dataset/chas-clinics/resource/21dace06-c4d1-4128-9424-aba7668050dc/view/5cbf5325-26d2-4e3b-a54d-e20d6d07dcd2"/> */}
          {/* <MyMap coord={props.currentLoc}/> */}
          <TestMap coord={props.currentLoc} GP={props.GP} PC={props.PC} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default ResultTabs;
