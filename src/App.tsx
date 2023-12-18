import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignOut} from "./pages/SignOut";
import {About} from "./pages/About";
import {Profile} from "./pages/Profile";

function App() {
  return (
      <BrowserRouter>
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
