

import React, { useContext, useState, useEffect } from 'react'
import './App.css'
import Routing from './Router'
import { DataContext } from './Component/DataProvider/DataProvider.jsx'
import { Type } from './Utility/action.type.js'
import {auth } from './Utility/firebase.js'


function App() {
const [{user}, dispatch] = useContext(DataContext);

useEffect(() => {
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      dispatch({
        type: Type.SET_USER,
        user: authUser,
      });
    } else {
      dispatch({
        type: Type.SET_USER,  
        user: null,
      });
      
    }
  });
}, []);

  return (
    <>
    <Routing/>
    {/* <Header />
    <CarouselEffect />
    <Category/> 
    <Product/> */}
    </>
  )
}

export default App
