import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = props => {
  const [isLogin, setIsLogin] = useState(false);

  const value = [
    isLogin, setIsLogin
  ]

  return <AppContext.Provider value={value} {...props}></AppContext.Provider>;
}

export const useAppStore = () => useContext(AppContext);