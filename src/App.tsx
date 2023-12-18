import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from "./view/pages/Home";
import {SignIn} from "./view/pages/SignIn";
import {SignOut} from "./view/pages/SignOut";
import {About} from "./view/pages/About";
import {Profile} from "./view/pages/Profile";
import {Header} from "./view/components/Header";

function App() {
  return (

      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" Component={Home}/>

            <Route path="/sign-in" Component={SignIn}/>
            <Route path="/sign-out" Component={SignOut}/>
            <Route path="/about" Component={About}/>
            <Route path="/profile" Component={Profile}/>
          </Routes>

      </BrowserRouter>

  );
}

export default App;
