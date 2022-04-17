import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//
import '../css/app.css';
import Client from './Client/Client';
import Home from './Client/Home';
import Login from './Client/Login';
import Register from './Client/Register';
import Cms from './Cms/Cms';
import { AppProvider } from './store';

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Client />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/admin' element={<Cms />}>

          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)