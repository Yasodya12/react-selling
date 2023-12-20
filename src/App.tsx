import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';

import './App.css';
import {Home} from "./view/pages/Home";
import {SignUp} from "./view/pages/SignUp";

import {About} from "./view/pages/About";
import {Profile} from "./view/pages/Profile";
import {Header} from "./view/components/Header";
import {SignIn} from "./view/pages/SignIn";
import {CreateListing} from "./view/pages/CreateListing";
import {UpdateList} from "./view/pages/UpdateList";


function App() {
  return (

      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" Component={Home}/>

            <Route path="/sign-up" Component={SignUp}/>
            <Route path="/sign-in" Component={SignIn} />
            <Route path="/about" Component={About}/>
            <Route path="/profile" Component={Profile}/>
              <Route path='/create-listing' Component={CreateListing } />
              <Route path='/update-listing/:listingId' Component={UpdateList}/>
          </Routes>

      </BrowserRouter>

  );
}

export default App;
