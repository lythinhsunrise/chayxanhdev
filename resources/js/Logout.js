import { Spin } from 'antd';
import React, { useEffect } from 'react'
import { useAppStore } from './store'

const Logout = () => {
  const { handleLogout } = useAppStore();

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <div style={{ marginTop: '16px', textAlign: 'center' }}>
      <Spin tip="Loading..."></Spin>
    </div>
  )
}

export default Logout