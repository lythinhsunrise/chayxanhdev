import { Button, Col, InputNumber } from 'antd'
import React, { useContext, useState } from 'react'

const MenuOrderItem = ({ item, setOrderD, orderD }) => {
  let OrderDetail
  orderD.map((o, index) => {
    if(o.id == item.id) OrderDetail = orderD[index];
  })
  const [quantity, setQuantity] = useState(OrderDetail ? OrderDetail.qty : null);
  const onChange = (value) => {
    if(value < 0 || item.qty < value){
      return;
    }
    setQuantity(value)
    let orderDetail = {
      ...OrderDetail,
      id: item.id,
      price: item.price,
      qty: value,
      pic: item.pic,
      name: item.name
    }
    let i = -1;
    orderD.map((itemD, index) => {
      if(itemD.id == orderDetail.id){
        i = index
      }
    })
    // console.log(i)
    if(i < 0){
      setOrderD([...orderD, orderDetail])
    } else {
      let newArr = [...orderD];
      newArr[i] = orderDetail;
      if(orderDetail.qty == 0){
        newArr = orderD.filter((itemD) => itemD.id !== orderDetail.id)
      }
      setOrderD(newArr);
    }
  }
  return (
    <Col xs={{ span: 24, offset: 0 }} style={item.qty>0 ? { marginBottom: '6px' } : { opacity: 0.2 }}>
      <div className='menuItem' style={quantity ? { outline: '2px solid #307839' } : { outline: 'none' }}>
        <div className='leftItem'>
          <img className='menuItemPic' src={APP_URL + '/images' + item.pic} />
        </div>
        <div className='rightItem'>
          <h2 style={{ color: '#307839' }}>{item.name}</h2>
          <p>+ Thành phần: {item.ingredients}</p>
          <p>+ Dinh dưỡng: {item.nutrition}</p>
          <p>VND {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} || SL còn lại: {item.qty}</p>
          <InputNumber min={0} max={100} placeholder='Số lượng...' value={quantity} onChange={onChange} />
          <Button style={{ marginLeft: '4px' }} onClick={() => onChange(quantity + 1)}>+</Button>
          <Button style={{ marginLeft: '4px' }} onClick={() => onChange(quantity - 1)}>-</Button>
        </div>
      </div>
    </Col>
  )
}

export default MenuOrderItem