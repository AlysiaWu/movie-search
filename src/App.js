import React from "react";
import { Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";

import { createBrowserHistory as createHistory } from "history";

import "./App.css";
const history = createHistory();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/person/:id" component={Actor} />
        </Router>
      </header>
    </div>
  );
}

export default App;
