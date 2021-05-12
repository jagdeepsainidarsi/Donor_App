import './App.css';
import React from "react";
import Registration from "./component/Registration";
import Search from "./component/Search"
import Search1 from "./component/S"
import Nabvar from "./component/Navbar"
import Dropdown from "./component/Dropdown"
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  
return (
    <>

    <BrowserRouter>
    <Nabvar/>
    <Switch>
    <Route exact path="/">
    <Registration/>
   </Route>

   <Route exact path="/search">
   <Search1/>
   </Route>
       
   
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
