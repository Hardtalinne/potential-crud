import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Listar from "./pages/Listar";
import Cadastrar from "./pages/Cadastrar";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />{" "}
        </Route>
        <Route path="/home" exact component={Listar} />
        <Route path="/cadastrar/:id?" component={Cadastrar} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
