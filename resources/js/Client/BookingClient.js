import { Button, Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store';
import { openNotification } from '../Helpers/Notification';
import { useNavigate } from 'react-router-dom';

const BookingClient = () => {
  const [loading, setLoading] = useState(false);
  const { user, getListStores, storeBooking } = useContext(AppContext);
  const [form] = Form.useForm();
  const [stores, setStores] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      form.setFieldsValue(user)
    }
    getListStores().then((response) => {
      setStores(response.data.data)
    })
  }, [])

  const onFinish = () => {
    form.validateFields().then((values) =>{
      // console.log(values)
      storeBooking(values).then((res) => {
        if (res.data.status == true) {
          openNotification(res.data);
          navigate("/")
        }
      })
    })
  }

  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
        <br />
        <Card title={<>Thông tin đặt bàn <Button type='primary' style={{float: "right"}} onClick={onFinish}>Đặt bàn</Button></>} bordered={false}>
          <Spin tip="Loading..." spinning={loading}>
            <Form
              labelAlign="left"
              layout='horizontal'
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input bordered={false} placeholder="..." />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
              >
                <Input bordered={false} placeholder="..." />
              </Form.Item>
              <Form.Item
                label="Chọn quán"
                name="store_id"
                style={{ marginBottom: 15 }}
                rules={[{ required: true, message: 'Chọn quán' }]}
              >
                <Select
                  bordered={false}
                  optionFilterProp="children"
                  placeholder="Chọn quán"
                >
                  {stores && stores.map((item) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item
                label="Ngày"
                name="date"
                rules={[{ required: true, message: 'Please input your date!' }]}
              >
                <Input bordered={false} type="date" />
              </Form.Item>
              <Form.Item
                label="Thời gian"
                name="time"
                rules={[{ required: true, message: 'Please input your time!' }]}
              >
                <Input bordered={false} type="time" />
              </Form.Item>
              <Form.Item
                label="Số lượng khách dự kiến"
                name="guest"
                rules={[{ required: true, message: 'Please input your guest!' }]}
              >
                <Input bordered={false} type="number" />
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default BookingClient