import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { TodoListContext } from '../store';

const { Header, Content, Footer } = Layout;

const Client = () => {
  const { user } = useContext(TodoListContext);
  const menu = (
    <Menu>
      {user.role_id ?
        <Menu.Item key="0">
          <Link to="/admin">CMS</Link>
        </Menu.Item> : ''}
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

  return (
    <>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'rgba(250,250,250,0.8)' }}>
          <div className="logo" />
          <div className="login">
            {!user.id
              ? <Button type='primary'><Link to='/login'>Login</Link></Button>
              : <>
                <Avatar icon={<UserOutlined />} />
                {user.name}
                <Dropdown overlay={menu} trigger={['click']}>
                  <DownOutlined />
                </Dropdown>
              </>}
          </div>
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