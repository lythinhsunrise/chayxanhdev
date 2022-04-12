import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//
import '../css/app.css';
import Client from './Client/Client';
import Home from './Client/Home';
import Cms from './Cms/Cms';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Client />}>
          <Route index element={<Home />}/>
        </Route>
        <Route path='/admin' element={<Cms />}>

        </Route>
      </Routes>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)