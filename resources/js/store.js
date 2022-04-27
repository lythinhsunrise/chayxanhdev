import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : { role_id: '' },
};

const actions = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        user: action.user,
      }
    default:
      return state;
  }
};

export const TodoListContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    user: state.user,
    users: state.users,
    setUser: (user) => {
      dispatch({ type: actions.SET_USER, user });
    },
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
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
}

export default Provider