import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : { role_id: '' },
  users: [],
};

const actions = {
  SET_USER: "SET_USER",
  GET_LIST_USERS: "GET_LIST_USERS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        user: action.user,
      }
    case actions.GET_LIST_USERS:
      console.log(action)
      // return {
      //   ...state,
      //   users: action.data,
      // }
      let newState = {
        ...state,
        users: action.data,
      }
      return newState
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
      return axios.get('/api/users/getlist', { headers: {"Authorization" : `Bearer ${initialState.user.access_token}`} })
    },
    getUserByID: (id) => {
      return axios.get(`/api/users/${id}`, { headers: {"Authorization" : `Bearer ${initialState.user.access_token}`} })
    }
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
}

export default Provider