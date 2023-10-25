import React, { useEffect, useState } from 'react';
import { BrowserRouter ,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { auth } from './Firebase/Firebase';

function App() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUsername(user.displayName)
      }else{
        setUsername("")
      }
      console.log(user);
    })
  })
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
