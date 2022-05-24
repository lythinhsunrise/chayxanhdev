import {
  DesktopOutlined, DownOutlined, HomeOutlined, ProfileOutlined, UserOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../store';

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/">Trở lại trang chủ</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/me">Thông tin cá nhân</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/my-order">Thông tin đơn hàng</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/logout">Log out</Link>
    </Menu.Item>
  </Menu>
);

const Cms = () => {
  const { user, getListStores } = useContext(AppContext);
  const [ storeName, setStoreName ] = useState("");
  useEffect(() => {
    getListStores().then((res) => {
      res.data.data.map((i) => {
        if(i.id === user.store_id){
          setStoreName(i.name);
        } 
      })
    })
  },[])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
      >
        <div className="logo-admin" />
        <Menu mode="inline" defaultSelectedKeys={['0']} defaultOpenKeys={['menus', 'sub1']}>
          <Menu.Item key="0" icon={<DesktopOutlined />}>
            <Link to="/admin">CMS</Link>
          </Menu.Item>
          {user.role_id < 3 ? <SubMenu
            key="menus"
            icon={<ProfileOutlined />}
            title="Quản lý món ăn"
            
          >
            <Menu.Item key="menus-1">
              <Link to="/admin/menus">Thực đơn</Link>
            </Menu.Item>
            <Menu.Item key="menus-2">
              <Link to="/admin/foods_qty">Số lượng món ăn</Link>
            </Menu.Item>
            <Menu.Item key="menus-3">
              <Link to="/admin/foods_supply">Yêu cầu chuyển món</Link>
            </Menu.Item>
          </SubMenu> : null}
          <SubMenu
            key="sub1"
            icon={<ProfileOutlined />}
            title="Quản lý đơn hàng"
          >
            <Menu.Item key="sub1-1">
              <Link to="/admin/orders_store">Tại cửa hàng</Link>
            </Menu.Item>
            <Menu.Item key="sub1-2">
              <Link to="/admin/orders_home">Đặt mang đi</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<ProfileOutlined />}>
            <Link to="/admin/booking">Quản lý đặt bàn</Link>
          </Menu.Item>
          {user.role_id < 3 ? <Menu.Item key="7" icon={<UserOutlined />}>
            <Link to="/admin/users">Quản lý tài khoản</Link>
          </Menu.Item> : null}
          {user.role_id === 1 ? <Menu.Item key="8" icon={<HomeOutlined />}>
            <Link to="/admin/stores">Quản lý chi nhánh</Link>
          </Menu.Item> : null}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }} >
          Chi nhánh: {storeName} {user.role_id==1?"Tất cả chi nhánh":""}
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
          ThinhDev - IUH ©2022 ChayXanhProject
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Cms