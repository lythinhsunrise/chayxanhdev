import { Button, Col } from 'antd'
import React, { useContext } from 'react'

const MenuHomeItem = ({item}) => {

  return (
    <Col xs={{ span: 24, offset: 0 }}>
      <div className='menuItem'>
        <div className='leftItem'>
          <img className='menuItemPic' src={APP_URL + '/images' + item.pic}/>
        </div>
        <div className='rightItem'>
          <h2 style={{color: '#307839'}}>{item.name}</h2>
          <p>+ Thành phần: {item.ingredients}</p>
          <p>+ Dinh dưỡng: {item.nutrition}</p>
          <p>VND {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <Button type='primary' >Đặt món</Button>
          <Button style={{marginLeft: '4px'}}>Thêm vào giỏ</Button>
        </div>
      </div>
    </Col>
  )
}

export default MenuHomeItem