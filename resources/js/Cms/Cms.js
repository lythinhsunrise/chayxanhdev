import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cms = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let navigate = useNavigate();
  //function check token
  return (
    isLoggedIn ? <div>Cms</div> : (isLoading ? 'Loading...' : navigate('/'))
  )
}

export default Cms