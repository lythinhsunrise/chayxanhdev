import { Avatar, Badge, Button, Drawer, Dropdown, Empty, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserOutlined, DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { AppContext } from '../store';
import ItemCart from './components/ItemCart';

const { Header, Content, Footer } = Layout;

const Client = () => {
  const { user, cart, money, cart_length } = useContext(AppContext);
  const [drawer, setDrawer] = useState(false);

  const onClose = () => {
    setDrawer(false);
  };

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
        <Link to="/my-order">Thông tin đơn hàng</Link>
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
          <div style={{ float: 'right', padding: '4px 20px' }} onClick={() => setDrawer(!drawer)}>
            <Badge count={cart_length} style={{ backgroundColor: '#52c41a' }}>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} />
            </Badge>
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
        <Drawer
          title="Giỏ hàng của bạn"
          placement="right"
          visible={drawer}
          onClose={onClose}
        >
          {cart.map((item, index) => <ItemCart key={index} item={item} />)}
          {cart_length ? <>
            <h4>Tổng cộng: {money}</h4>
            <Button style={{width: '100%'}} type='primary' onClick={onClose}><Link to="/my-cart">Đặt món ngay</Link></Button>
          </> : <Empty description="Chưa có món nào, hãy thêm món ngay nào ..."/>}
        </Drawer>
      </Layout>
    </>
  )
}

export default Client