import React from "react";
import Login from "./pages/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Language from "./pages/Language";
import GeneralInfo from "./pages/GeneralInfo";
import Form from "./pages/PatientForm";
import FilteredResult from "./pages/FilteredResult";
import ConfirmClinicChoicePage from "./pages/ConfirmClinicChoice";
import confirmedChoicePage from "./pages/SummaryPage";



//here is where i put all the routes tgt. can include the help button here which will
//then be present in all the subsequent pages

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Language" exact component={Language} />
            <Route path="/GeneralInfo" exact component={GeneralInfo} />
            <Route path="/Form" exact component={Form} />
            <Route path="/FilteredResult" exact component={FilteredResult} />
            <Route path="/ConfirmClinicChoice" exact component={ConfirmClinicChoicePage} />
            <Route path="/confirmedChoice" exact component={confirmedChoicePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
