import { Button, Col } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../store';
import { Link, useNavigate } from 'react-router-dom';

const MenuHomeItem = ({item}) => {
  const { addCart } = useContext(AppContext);
  let navigate = useNavigate();
  const onAddCart = () => {
    // console.log(item);
    addCart(item);
  }
  const onOrder = () => {
    addCart(item);
    navigate("/my-cart")
  }
  return (
    <Col md={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
      <div className='menuItem'>
        <div className='leftItem'>
          <img className='menuItemPic' src={APP_URL + '/images' + item.pic}/>
        </div>
        <div className='rightItem'>
          <h2 style={{color: '#307839'}}>{item.name}</h2>
          <p>+ Thành phần: {item.ingredients}</p>
          <p>+ Dinh dưỡng: {item.nutrition}</p>
          <p>VND {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <Button type='primary' onClick={onOrder}>Đặt món</Button>
          <Button style={{marginLeft: '4px'}} onClick={onAddCart}>Thêm vào giỏ</Button>
        </div>
      </div>
    </Col>
  )
}

export default MenuHomeItem