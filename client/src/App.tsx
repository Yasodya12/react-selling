import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';

import './App.css';
import {Home} from "./view/pages/Home";
import {SignUp} from "./view/pages/SignUp";

import {About} from "./view/pages/About";
import {Profile} from "./view/pages/Profile";

import {SignIn} from "./view/pages/SignIn";
import {CreateListing} from "./view/pages/CreateListing";
import {UpdateList} from "./view/pages/UpdateList";
import {Listing} from "./view/pages/Listing";
import SignInII from "./view/pages/SignInII";
import {SignUpII} from "./view/pages/SignUpII";
import Header from "./view/components/Header";
import {PrivateRoute} from "./view/components/PrivateRoute";


function App() {
  return (

      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" Component={Home}/>
              <Route path='/listing' element={<Listing />} />
            <Route path="/sign-up" Component={SignUpII}/>
            <Route path="/sign-in" Component={SignInII} />
            <Route path="/about" Component={About}/>
              <Route element={<PrivateRoute />}>
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/create-listing' element={<CreateListing />} />

              </Route>
          </Routes>

      </BrowserRouter>

  );
}

export default App;
