import { Card, Col, Row, Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import ItemOrder from './components/ItemOrder';
import { AppContext } from '../store';

const MyOrder = () => {
  const { orderByUser, user, deleteOrder } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    orderByUser(user.id).then((res) => {
      setOrders(res.data.data);
    })
  }, [change])
  const deleteOrderCus = (id) => {
    deleteOrder(id).then(()=>{
      setChange(!change)
    })
  }
  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }}>
        <br />
        <Card title="Đơn hàng của tôi" bordered={false}>
          <Row gutter={[0, 24]}>
            {orders.map((order, index) => {
              return <ItemOrder key={index} order={order} deleteOrderCus={deleteOrderCus}/>
            })}
            {/* <Skeleton active /> */}
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default MyOrder