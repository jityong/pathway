import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ClinicMap from "./map/ClinicMap";
import PcDialog from "./PcDialog";
import GpDialog from "./GpDialog";
import CompareBlock from "./comparison/CompareBlock";
import Pagination from "react-js-pagination";
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
// Displays the 3 tabs of PC,GP and Map in the results page
// Also displays the chosen clinics for comparison (DisplayBlock.js)

const ResultTabs = props => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }
  const [open, setOpen] = React.useState(false);
  const [clinicOne, setClinicOne] = React.useState();
  const [clinicTwo, setClinicTwo] = React.useState();

  const [activeGPPage, setActiveGPPage] = React.useState(1);
  const [activePCPage, setActivePCPage] = React.useState(1);
  const [itemPerPage] = React.useState(10);

  const handleGPClose = (clinic, name) => {
    setOpen(false);
    clinic.price = "$$";
    clinic.rating = "4.3";
    clinic.type = "GP";
    clinic.name = name;
    if (
      (clinicOne || clinicTwo) &&
      (clinic === clinicOne || clinic === clinicTwo)
    ) {
      alert("Cannot compare two same clinics!");
    } else if (!clinicOne) {
      setClinicOne(clinic);
    } else if (!clinicTwo) {
      setClinicTwo(clinic);
    } else {
      alert("Cannot compare more than 2 clinics");
    }
  };

  
  const handlePCClose = (clinic, name) => {
    setOpen(false);
    clinic.price = "$";
    clinic.rating = "4.0";
    clinic.name = name;
    clinic.type = "Polyclinic";
    if (
      (clinicOne || clinicTwo) &&
      (clinic === clinicOne || clinic === clinicTwo)
    ) {
      alert("Cannot compare two same clinics!");
    } else if (!clinicOne) {
      setClinicOne(clinic);
    } else if (!clinicTwo) {
      setClinicTwo(clinic);
    } else {
      alert("Cannot compare more than 2 clinics");
    }
  };
  const callbackFunction = clinic => {
    if (
      (clinicOne || clinicTwo) &&
      (clinic === clinicOne || clinic === clinicTwo)
    ) {
      alert("Cannot compare two same clinics!");
    } else if (!clinicOne) {
      setClinicOne(clinic);
    } else if (!clinicTwo) {
      setClinicTwo(clinic);
    } else {
      alert("Cannot compare more than 2 clinics");
    }
  };
  const callbackDeleteOne = () => {
    setClinicOne(null);
  };
  const callbackDeleteTwo = () => {
    setClinicTwo(null);
  };

  const handleGPPageChange = pageNumber => {
    setActiveGPPage(pageNumber);
  };
  const handlePCPageChange = pageNumber => {
    setActivePCPage(pageNumber);
  };
  var indexOfLastTodoGP = activeGPPage * itemPerPage;
  var indexOfFirstTodoGP = indexOfLastTodoGP - itemPerPage;
  var filteredGPTemp = props.GP.slice(indexOfFirstTodoGP, indexOfLastTodoGP);

  const filteredGP = filteredGPTemp.map(clinic => {
    return (
      <div key={clinic.properties.id}>
        <GpDialog
          clinic={clinic}
          selectedGP={clinic}
          open={open}
          onClose={handleGPClose}
          formData={props.formData}
        />
        <hr />
      </div>
    );
  });
  var indexOfLastTodoPC = activePCPage * itemPerPage;
  var indexOfFirstTodoPC = indexOfLastTodoPC - itemPerPage;
  var filteredPCTemp = props.PC.slice(indexOfFirstTodoPC, indexOfLastTodoPC);

  const filteredPC = filteredPCTemp.map(clinic => {
    return (
      <div key={clinic.id}>
        <PcDialog
          clinic={clinic}
          selectedPC={clinic}
          open={open}
          onClose={handlePCClose}
          formData={props.formData}
        />
        <hr />
      </div>
    );
  });
  return (
    //callback delete methods required because it is the state here in ResultTabs that needs to be changed, as the
    // clinicOne and clinicTwo state of displayBlock is taken from the state here. If the state here is not changed,
    // after we delete in DisplayBlock, when it re-renders the displayBlock state will get the old (unchanged) state
    // from here instead and nothing would have changed (delete fail).
    <div>
      <CompareBlock
        clinicOne={clinicOne}
        clinicTwo={clinicTwo}
        formData={props.formData}
        callbackDeleteOne={callbackDeleteOne}
        callbackDeleteTwo={callbackDeleteTwo}
      />
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
          {filteredGP}
          <Pagination
            hideDisabled
            activePage={activeGPPage}
            itemsCountPerPage={itemPerPage}
            totalItemsCount={props.GP.length}
            // pageRangeDisplayed={5}
            onChange={handleGPPageChange}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          {filteredPC}
          <Pagination
            default
            activePage={activePCPage}
            itemsCountPerPage={itemPerPage}
            totalItemsCount={props.PC.length}
            pageRangeDisplayed={5}
            onChange={handlePCPageChange}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          {props.currentLoc[0] !== 0 && (
            <ClinicMap
              coord={props.currentLoc}
              GP={props.GP}
              PC={props.PC}
              callbackFunction={callbackFunction}
            />
          )}
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default ResultTabs;
