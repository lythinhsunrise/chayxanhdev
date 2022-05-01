import { Card, Col, Row, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store';
import MenuHomeItem from './MenuItem';

const MenuHome = () => {
  const { getListMenus } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [itemMenu, setItemMenu] = useState('');
  useEffect(() => {
    getListMenus().then((response) => {
      setItemMenu(response.data.data)
      setLoading(false)
    })
  }, [])
  return (
    <Row>
      <Col xs={{ span: 24, offset: 0 }} lg={{ span: 20, offset: 2 }}>
        <br />
        <Card bordered={false}>
          <Spin tip="Loading..." spinning={loading}>

            <Card title="Món khai vị" bordered={false}>
              {itemMenu && itemMenu.map((item) => {
                if (item.category == 1) return <MenuHomeItem key={item.id} item={item} />
              })}
            </Card>
            <Card title="Món chính" bordered={false}>
              {itemMenu && itemMenu.map((item) => {
                if (item.category == 2) return <MenuHomeItem key={item.id} item={item} />
              })}
            </Card>
            <Card title="Món đặc biệt" bordered={false}>
              {itemMenu && itemMenu.map((item) => {
                if (item.category == 3) return <MenuHomeItem key={item.id} item={item} />
              })}
            </Card>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default MenuHome