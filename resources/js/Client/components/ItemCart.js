import { Button, Col } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../store';

const ItemCart = ({ item, noButton }) => {
  const { addCart, minusCart } = useContext(AppContext);
  const onAddCart = () => {
    addCart(item);
  }
  const onMinusCart = () => {
    minusCart(item);
  }
  return (
    <Col xs={{ span: 24, offset: 0 }}>
      <div className='menuItem-cart'>
        <div className='leftItem-cart'>
          <img className='menuItemPic-cart' src={APP_URL + '/images' + item.pic} />
        </div>
        <div className='rightItem-cart'>
          <h4 style={{ color: '#307839' }}>{item.name}</h4>
          <p>Đơn giá: VND {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p>Số lượng: {item.qty} {noButton ? null : <><Button onClick={onMinusCart}>-</Button> <Button onClick={onAddCart}>+</Button></>}</p>
        </div>
      </div>
    </Col>
  )
}

export default ItemCart