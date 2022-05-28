import { Button, Col, Popconfirm, Steps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const { Step } = Steps;
const ItemOrder = ({ order, deleteOrderCus }) => {
  let navigate = useNavigate();
  return (
    <>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 2, offset: 0 }} >
        <b>#{order.id}</b>
        <br />
        Tổng tiền <br />
        <b>{`${order.money} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>
        <br />
        Trạng thái <br />
        {order.payment_status ? <b style={{ color: '#307839' }}>Đã thanh toán</b> : <b style={{ color: '#FF0000' }}>Chưa thanh toán</b>}
      </Col>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 20, offset: 0 }} >
        <Steps current={order.status_order_id}>
          <Step title="Chờ xử lý" description="Đơn hàng đã được ghi nhận!" />
          <Step title="Đang chuẩn bị" description="Đơn hàng đã được duyệt!" />
          <Step title="Hoàn thành" description="Đã giao" />
        </Steps>
      </Col>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 2, offset: 0 }} >
        <Button type="link" size="small" onClick={() => navigate(`/my-order/${order.id}`)}><EditOutlined /></Button>
        {(order.status_order_id > 0 || order.payment_status === 1) ? null : <Popconfirm title="Hủy đơn này?" placement="leftTop" onConfirm={() => deleteOrderCus(order.id)}>
          <Button type="link" size="small" danger><DeleteOutlined /></Button>
        </Popconfirm>}
      </Col>
    </>
  )
}

export default ItemOrder