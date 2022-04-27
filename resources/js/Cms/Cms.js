import {
  DesktopOutlined, ProfileOutlined, UserOutlined, LogoutOutlined, HomeOutlined, DownOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Button, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TodoListContext } from '../store';

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/">Trở lại trang chủ</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/me">Thông tin cá nhân</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/me">Thông tin đơn hàng</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/logout">Log out</Link>
    </Menu.Item>
  </Menu>
);

const Cms = () => {
  const { user } = useContext(TodoListContext);
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
            <Link to="/admin/menus">Quản lý món ăn</Link>
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
          <div className="login">
            <>
              <Avatar icon={<UserOutlined />} />
              {user.name}
              <Dropdown overlay={menu} trigger={['click']}>
                <DownOutlined />
              </Dropdown>
            </>
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