import { Button, Col, Form, InputNumber } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../store';
import DetailFoodQty from './Detail';

const FoodsQty = () => {
  const { getListMenus, getListQtyFoods, user } = useContext(AppContext);
  const [data, setData] = useState();
  useEffect(() => {
    getListMenus().then((response) => {
      let temp = response.data.data
      getListQtyFoods(user.store_id).then((res) => {
        temp.map((item, index) => {
          res.data.data.map((i) => {
            if (item.id == i.id_food) {
              temp[index].qty = i.qty
              temp[index].index_qtyfoods = i.id
            }
          })
          temp[index].store_id = user.store_id
        })
        setData(temp)
      })
    })
  }, [])

  return (
    <>
      {data && data.map((item, index) => {
        return <DetailFoodQty key={index} item={item}/>
      })}
    </>
  )
}

export default FoodsQty