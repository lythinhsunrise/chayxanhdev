import {
  DesktopOutlined, ProfileOutlined, UserOutlined, LogoutOutlined, HomeOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TodoListContext } from '../store';

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

const Cms = () => {
  const { users } = useContext(TodoListContext);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
      >
        <div className="logo-admin" />
        <Menu mode="inline" defaultSelectedKeys={['0']}>
          <Menu.Item key="0" icon={<DesktopOutlined />}>
            <Link to="/admin">CMS</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<ProfileOutlined />}>
            <Link to="/admin/menu">Quản lý món ăn</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ProfileOutlined />}>
            <Link to="/admin/booking">Quản lý đặt bàn</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ProfileOutlined />}>
            <Link to="/admin/order">Quản lý đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UserOutlined />}>
            <Link to="/admin/users">Quản lý tài khoản</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<HomeOutlined />}>
            <Link to="/admin/stores">Quản lý chi nhánh</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to='/logout'>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }} >
          <div style={{ float: 'right' }}>
            <Button><Link to="/">Home</Link></Button>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ThinhDev ©2022 ChayXanhProject
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Cms