import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Provider from './store';
import 'antd/dist/antd.less';
import '../css/app.css';
import { AppContext } from './store';
//
import Client from './Client/Client';
import Home from './Client/Home';
import Login from './Client/Login';
import Register from './Client/Register';
import Cms from './Cms/Cms';
import Logout from './Logout';
import Users from './Cms/Users/Users';
import DetailUser from './Cms/Users/Detail';
import Stores from './Cms/Stores/Stores';
import DetailStore from './Cms/Stores/Detail';
import Menu from './Cms/Menu/Menu';
import DetailMenu from './Cms/Menu/Detail';
import MenuHome from './Client/Menu';
import Me from './Client/Me';
import Orders from './Cms/Orders/Orders';
import DetailOrders from './Cms/Orders/Detail';
import Booking from './Cms/Booking/Booking';
import MyOrder from './Client/MyOrder';
import MyCart from './Client/MyCart';
import OrdersStore from './Cms/Orders/OrdersStore/OrdersStore';
import DetailOrderStore from './Cms/Orders/OrdersStore/Detail';
import FoodsQty from './Cms/Menu/FoodsQty/FoodsQty';
import OrdersHome from './Cms/Orders/OrdersHome/OrdersHome';
import DetailOrderHome from './Cms/Orders/OrdersHome/Detail';
import BookingClient from './Client/BookingClient';
import AboutUs from './Client/AboutUs';


function App() {
  function PrivateOutlet() {
    const { user } = useContext(AppContext);
    const auth = user.role_id ? user.role_id : false;
    return auth ? <Cms/> : <Navigate to="/" />;
  }
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Client />}>
          <Route index element={<Home />} />
          <Route path='/menu' element={<MenuHome />} />
          <Route path='/my-cart' element={<MyCart />} />
          <Route path='/me' element={<Me />} />
          <Route path='/my-order' element={<MyOrder />} />
          <Route path='/booking' element={<BookingClient />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
        <Route path='/admin' element={<PrivateOutlet />}>
          <Route path='users' element={<Users />}/>
          <Route path='users/detail' element={<DetailUser />}/>
          <Route path='users/detail/:id' element={<DetailUser/>}/>
          <Route path='stores' element={<Stores />}/>
          <Route path='stores/detail' element={<DetailStore />}/>
          <Route path='stores/detail/:id' element={<DetailStore/>}/>
          <Route path='menus' element={<Menu />}/>
          <Route path='menus/detail' element={<DetailMenu />}/>
          <Route path='menus/detail/:id' element={<DetailMenu/>}/>
          <Route path='foods_qty' element={<FoodsQty />}/>
          <Route path='orders' element={<Orders />}/>
          <Route path='orders/detail' element={<DetailOrders />}/>
          <Route path='orders/detail/:id' element={<DetailOrders/>}/>
          <Route path='orders_store' element={<OrdersStore />}/>
          <Route path='orders_store/detail' element={<DetailOrderStore />}/>
          <Route path='orders_store/detail/:id' element={<DetailOrderStore/>}/>
          <Route path='orders_home' element={<OrdersHome />}/>
          <Route path='orders_home/detail' element={<DetailOrderHome />}/>
          <Route path='orders_home/detail/:id' element={<DetailOrderHome/>}/>
          <Route path='booking' element={<Booking />}/>
          <Route path='booking/detail' element={<Booking />}/>
          <Route path='booking/detail/:id' element={<Booking/>}/>
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