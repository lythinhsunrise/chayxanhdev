import { Card, Col, Row, Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import ItemOrder from './components/ItemOrder';
import { AppContext } from '../store';

const MyOrder = () => {
  const { orderByUser, user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    orderByUser(user.id).then((res) => {
      setOrders(res.data.data);
    })
  }, [])
  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }}>
        <br />
        <Card title="Đơn hàng của tôi" bordered={false}>
          {orders.map((order, index) => {
            return <ItemOrder key={index} order={order}/>
          })}
          {/* <Skeleton active /> */}
        </Card>
      </Col>
    </Row>
  )
}

export default MyOrder