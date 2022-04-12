import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import 'antd/dist/antd.less'

const { Header, Content, Footer } = Layout;

const Client = () => {
  return (
    <>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'rgba(250,250,250,0.8)' }}>
          <div className="logo" />
          <Menu style={{ background: 'rgba(250,250,250,0)' }} mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">
              <Link to='/'>Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="menu">
              <Link to='/menu'>Menu</Link>
            </Menu.Item>
            <Menu.Item key="booking">Đặt bàn</Menu.Item>
            <Menu.Item key="about">Giới thiệu</Menu.Item>
          </Menu>
        </Header>

        <Content style={{ marginTop: '63px' }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>ThinhDev ©2022 ChayXanhProject</Footer>
      </Layout>
    </>
  )
}

export default Client