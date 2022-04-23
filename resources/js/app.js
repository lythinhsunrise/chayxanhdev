import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Provider from './store';
import 'antd/dist/antd.less';
import '../css/app.css';
import { TodoListContext } from './store';
//
import Client from './Client/Client';
import Home from './Client/Home';
import Login from './Client/Login';
import Register from './Client/Register';
import Cms from './Cms/Cms';
import Logout from './Logout';
import Users from './Cms/Users/Users';
import DetailUser from './Cms/Users/Detail';


function App() {
  function PrivateOutlet() {
    const { user } = useContext(TodoListContext);
    const auth = user.role_id ? user.role_id : false;
    return auth ? <Cms/> : <Navigate to="/" />;
  }
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Client />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
        <Route path='/admin' element={<PrivateOutlet />}>
          <Route path='users' element={<Users />}/>
          <Route path='users/detail' element={<DetailUser />}/>
          <Route path='users/detail/:id' element={<DetailUser/>}/>
        </Route>
      </Routes>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)