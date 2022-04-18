import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = props => {
  let navigate = useNavigate();
  const [globalUser, setGlobalUser] = useState({role_id: ''});

  useEffect(() => {
    if (localStorage.getItem("api_key")) {
      let token = JSON.parse(localStorage.getItem("api_key"))
      axios.get('/api/me', { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          console.log(response)
          if (response.status) {
            setGlobalUser(response.data.data.user)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [])

  const handleLogin = (user) => {
    localStorage.setItem("api_key", JSON.stringify(user.access_token))
    setGlobalUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem("api_key")
    setGlobalUser("")
    navigate("/")
  }

  const value = {
    globalUser, handleLogin, handleLogout
  }

  return <AppContext.Provider value={value} {...props}></AppContext.Provider>;
}

export const useAppStore = () => useContext(AppContext);