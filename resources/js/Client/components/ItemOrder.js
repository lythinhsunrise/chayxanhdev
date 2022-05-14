import { Steps } from 'antd';
import React from 'react'
const { Step } = Steps;
const ItemOrder = ({order}) => {
  return (
    <>
      <div className='menuItem-cart'>
        <div className='leftItem-cart'>
          <b>#{order.id}</b>
          <br />
          Tổng tiền <br />
          <b>{order.money}VND</b>
          <br />
          Trạng thái <br />
          <b>{order.payment_status ? <span style={{color: '#307839'}}>Đã thanh toán</span> : 'Chưa thanh toán'}</b>
        </div>
        <div className='rightItem-cart'>
          <Steps current={order.status_order_id}>
            <Step title="Chờ xử lý" description="Đơn hàng đã được ghi nhận!" />
            <Step title="Đang chuẩn bị" description="Đơn hàng đang chuẩn bị" />
            <Step title="Đang giao" description="Đang giao đến bạn" />
            <Step title="Hoàn thành" description="Đơn hoàn thành" />
          </Steps>
        </div>
      </div>
      <br />
    </>
  )
}

export default ItemOrder