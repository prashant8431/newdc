import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddWorkOrder } from "./pages/AddWorkOrder";
import { AddCompany } from "./pages/AddCompany";
import { GenerateDc } from "./pages/GenerateDc";
import { Print } from "./pages/Print";
import { DClist } from "./pages/DClist";
import { Company } from "./pages/Company";
import { Products } from "./pages/Products";
import { UserProvider } from "./pages/context/UserContext";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/mycompanies" component={Company} />
          <Route exact path="/products" component={Products} />
          <Route path="/addWorkOrder" component={AddWorkOrder} />
          <Route path="/GenerateDc/:id" component={GenerateDc} />
          <Route path="/addCompany" component={AddCompany} />
          <Route path="/print/:id" component={Print} />
          <Route path="/dcList" component={DClist} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};
