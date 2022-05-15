import React, { useContext, useState } from 'react'
import { Button, Col, InputNumber } from 'antd';
import { AppContext } from '../../../store';
import { openNotification } from '../../../Helpers/Notification';

const DetailFoodQty = ({item}) => {
  const { storeQtyFood, updateQtyFood } = useContext(AppContext);
  const [qty, setQty] = useState(item.qty ? item.qty : 0);
  const onChange = (value) => {
    if(value < 0){
      return;
    }
    setQty(value)
  }
  const onUpdate = () => {
    let food = {
      id_store: item.store_id,
      id_food: item.id,
      qty: qty,
    }
    if(item.index_qtyfoods){
      //update
      food.id = item.index_qtyfoods;
      updateQtyFood(food).then((res) => {
        openNotification(res.data);
      })
    } else {
      //create
      storeQtyFood(food).then((res) => {
        openNotification(res.data);
      })
    }
  }
  return (
    <Col xs={{ span: 24, offset: 0 }} style={{ marginBottom: '6px' }}>
      <div className='menuItem'>
        <div className='leftItem'>
          <img className='menuItemPic' src={APP_URL + '/images' + item.pic} />
        </div>
        <div className='rightItem'>
          <h2 style={{ color: '#307839' }}>{item.name}</h2>
          <p>+ Thành phần: {item.ingredients}</p>
          <p>+ Dinh dưỡng: {item.nutrition}</p>
          <p>VND {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <InputNumber min={0} max={100} placeholder='Số lượng...' value={qty} onChange={onChange}/>
          <Button style={{ marginLeft: '4px' }} onClick={() => onChange(qty + 1)}>+</Button>
          <Button style={{ marginLeft: '4px' }} onClick={() => onChange(qty - 1)}>-</Button>
          <Button type='primary' style={{ marginLeft: '4px' }} onClick={onUpdate}>Cập nhật</Button>
          {/* value={{id: item.id, qty: item.qty}} */}
        </div>
      </div>
    </Col>
  )
}

export default DetailFoodQty