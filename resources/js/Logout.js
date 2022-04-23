import { Spin } from 'antd';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { TodoListContext } from './store';

const Logout = () => {
  const { setUser } = useContext(TodoListContext);
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user");
    setUser({ role_id: '' });
    navigate("/");
  }, [])

  return (
    <div style={{ marginTop: '16px', textAlign: 'center' }}>
      <Spin tip="Loading..."></Spin>
    </div>
  )
}

export default Logout