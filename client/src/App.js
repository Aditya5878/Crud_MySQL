import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
// import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {Switch,Route} from "react-router-dom"
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateAccount from './components/Auth/CreateAccount.js';
import Login from './components/Auth/Login.js';


function App() {
  return (
   <>
    {/* <Navbaar /> */}
    
      <Switch>
      {/* CreateAccount is the component that will be rendered when the user visits the root URL of the application. */} */}
      <Route exact path="/" component={CreateAccount} />   
      <Route exact path="/Login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/view/:id" component={Details} />
      </Switch>
    
   
   </>
  );
}

export default App;






