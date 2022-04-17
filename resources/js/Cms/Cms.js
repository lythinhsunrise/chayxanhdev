import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'

const Cms = () => {
  const [isLogin, setIsLogin] = useAppStore();
  const [isLoading, setIsLoading] = useState(true)
  console.log(isLogin)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  let navigate = useNavigate();
  //function check token

  return (
    <>
      {isLogin ? <div>Cms</div> : (isLoading ? 'Loading...' : navigate('/'))}
    </>
  )
}

export default Cms