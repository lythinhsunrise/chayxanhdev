import { Card, Col, Row, Skeleton } from 'antd'
import React from 'react'

const MyOrder = () => {
  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
        <Card title="Thông tin đơn hàng" bordered={false}>
          <div>Booking</div>
          <p>Đang build hu hu :((</p>
          <Skeleton active />
        </Card>
      </Col>
    </Row>
  )
}

export default MyOrder