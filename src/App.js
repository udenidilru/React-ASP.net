import logo from './logo.svg';
import './App.css';

import { Home } from "./components/Home";
import { Department } from "./components/Department";
import { Employee } from "./components/Employee";
import { Navigation } from "./components/Navigation";

import Button from 'react-bootstrap/Button';

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        React JS with Web api Demo
      </h3>

      <Navigation/>
      
      <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/department' component={Department} exact />
      <Route path='/employee' component={Employee} exact />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
