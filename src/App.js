import React from 'react';
import { BrowserRouter ,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './Components/Signup';


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
