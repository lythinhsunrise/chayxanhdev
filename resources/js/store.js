import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : { role_id: '' },
  cart: [],
  cart_length: 0,
  money: 0,
};

const actions = {
  SET_USER: "SET_USER",
  ADD_CART: "ADD_CART",
  SUM_MONEY: "SUM_MONEY",
  MINUS_CART: "MINUS_CART",
  RESET_CART: "RESET_CART",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case actions.SUM_MONEY:
      let sumTemp = 0
      let sumpLength = 0
      state.cart.map(item => {
        sumTemp += item.price * item.qty
        sumpLength += item.qty
      })
      return { ...state, money: sumTemp, cart_length: sumpLength }
    case actions.ADD_CART:
      // console.log(action.data)
      let orderDetail = {
        name: action.data.name,
        pic: action.data.pic,
        id: action.data.id,
        price: action.data.price,
        qty: 1,
      }
      let i = -1;
      state.cart.map((itemD, index) => {
        if (itemD.id == orderDetail.id) {
          i = index
        }
      })
      if (i < 0) {
        let newState = { ...state, cart: [...state.cart, orderDetail] }
        return newState
      } else {
        orderDetail = {
          name: action.data.name,
          pic: action.data.pic,
          id: action.data.id,
          price: action.data.price,
          qty: state.cart[i].qty,
        }
        let newArr = [...state.cart];
        newArr[i] = orderDetail;
        newArr[i].qty = newArr[i].qty + 1
        let newState = { ...state, cart: newArr }
        return newState
      }
    case actions.MINUS_CART:
      state.cart.map((itemD, index) => {
        if (itemD.id == action.data.id) {
          i = index
        }
      })
      if (i < 0) {
        let newState = { ...state, cart: [...state.cart, orderDetail] }
        return newState
      } else {
        orderDetail = {
          name: action.data.name,
          pic: action.data.pic,
          id: action.data.id,
          price: action.data.price,
          qty: state.cart[i].qty,
        }
        let newArr = [...state.cart];
        newArr[i] = orderDetail;
        newArr[i].qty = newArr[i].qty - 1
        if (newArr[i].qty == 0) {
          newArr = state.cart.filter((itemD) => itemD.id !== orderDetail.id)
        }
        let newState = { ...state, cart: newArr }
        return newState
      }
    case actions.RESET_CART:
      let newState = { ...state, cart: [], cart_length: 0, money: 0 }
      return newState
    default:
      return state;
  }
};

export const AppContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    user: state.user,
    users: state.users,
    setUser: (user) => {
      dispatch({ type: actions.SET_USER, user });
    },
    cart: state.cart,
    money: state.money,
    cart_length: state.cart_length,
    addCart: (data) => {
      dispatch({ type: actions.ADD_CART, data });
      dispatch({ type: actions.SUM_MONEY });
    },
    minusCart: (data) => {
      dispatch({ type: actions.MINUS_CART, data });
      dispatch({ type: actions.SUM_MONEY });
    },
    resetCart: () => {
      dispatch({ type: actions.RESET_CART });
    },
    //Users
    getListUsers: () => {
      return axios.get('/api/users/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    getUserByID: (id) => {
      return axios.get(`/api/users/${id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeUser: (values) => {
      return axios.post(`/api/users`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateUser: (values) => {
      return axios.post(`/api/users/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    deleteUser: (id) => {
      return axios.post(`/api/users/delete/${id}`, '', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    getListUsersMG: (values) => {
      return axios.post(`/api/users/getlistManager`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    // Me
    getMe: () => {
      return axios.get(`/api/me`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateMe: (values) => {
      return axios.post(`/api/me/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    // Stores
    getListStores: () => {
      return axios.get('/api/stores/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    getStoreByID: (id) => {
      return axios.get(`/api/stores/${id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeStore: (values) => {
      return axios.post(`/api/stores`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateStore: (values) => {
      return axios.post(`/api/stores/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    deleteStore: (id) => {
      return axios.post(`/api/stores/delete/${id}`, '', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //Menus
    getListMenus: () => {
      return axios.get('/api/menus/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    getMenuByID: (id) => {
      return axios.get(`/api/menus/${id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeMenu: (values) => {
      return axios.post(`/api/menus`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateMenu: (values) => {
      return axios.post(`/api/menus/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    deleteMenu: (id) => {
      return axios.post(`/api/menus/delete/${id}`, '', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //Orders
    getListOrders: (type_id) => {
      if (type_id === 0 || type_id === 1) {
        return axios.get(`/api/orders/getlist?type_id=${type_id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
      }
      return axios.get('/api/orders/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    getOrderByID: (id) => {
      return axios.get(`/api/orders/${id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeOrder: (values) => {
      return axios.post(`/api/orders`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateOrder: (values) => {
      return axios.post(`/api/orders/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateOrderAccept: (values) => {
      return axios.post(`/api/orders/update_accept_order`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    deleteOrder: (id) => {
      return axios.post(`/api/orders/delete/${id}`, '', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    orderByUser: (id) => {
      return axios.get(`/api/orders/order_by_user/${id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeByUser: (values) => {
      return axios.post(`/api/store_by_user`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateByUserOrder: (values) => {
      return axios.post(`/api/orders/update_by_user`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //Qtyfoods
    getListQtyFoods: (store_id) => {
      if (store_id) {
        return axios.get(`/api/qtyfoods/getlist?store_id=${store_id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
      }
      return axios.get('/api/qtyfoods/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeQtyFood: (values) => {
      return axios.post(`/api/qtyfoods`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateQtyFood: (values) => {
      return axios.post(`/api/qtyfoods/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //Bookings
    getListBookings: (store_id) => {
      if (store_id) {
        return axios.get(`/api/booking/getlist?store_id=${store_id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
      }
      return axios.get('/api/booking/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeBooking: (values) => {
      return axios.post(`/api/booking`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateBooking: (values) => {
      return axios.post(`/api/booking/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    deleteBooking: (id) => {
      return axios.post(`/api/booking/delete/${id}`, '', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //Payment with momo
    getPaymentMomo: (values) => {
      return axios.post(`/api/momo-payment`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    momoSuccess: (values) => {
      return axios.post(`/api/momo-success`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //FoodSP
    getListFoodSP: () => {
      return axios.get('/api/food_sp/getlist', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    getFoodSPByID: (id) => {
      return axios.get(`/api/food_sp/${id}`, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    storeFoodSP: (values) => {
      return axios.post(`/api/food_sp`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateFoodSP: (values) => {
      return axios.post(`/api/food_sp/update`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    deleteFoodSP: (id) => {
      return axios.post(`/api/food_sp/delete/${id}`, '', { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    updateAcceptFoodSP: (values) => {
      return axios.post(`/api/food_sp/update_accept`, values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    //Dashboard
    revenue_store: (values) => {
      return axios.post('/api/revenue_store', values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
    revenue_by_day_store: (values) => {
      return axios.post('/api/revenue_by_day_store', values, { headers: { "Authorization": `Bearer ${state.user.access_token}` } })
    },
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider