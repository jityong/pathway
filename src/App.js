import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Language from "./Language";
import DischargeSummary from "./DischargeSummary";
import GeneralInfo from "./GeneralInfo";
import Form from "./Form";
import FilteredResult from "./FilteredResult"
import selectedChoice from "./selectedChoice"
import confirmedChoice from "./confirmedChoice"
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
            <Route
              path="/DischargeSummary"
              exact
              component={DischargeSummary}
            />
            <Route path="/GeneralInfo" exact component={GeneralInfo} />
            <Route path="/Form" exact component={Form} />
            <Route path="/FilteredResult" exact component={FilteredResult} />
            <Route path="/selectedChoice" exact component={selectedChoice} />
            <Route path="/confirmedChoice" exact component={confirmedChoice} />

          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
