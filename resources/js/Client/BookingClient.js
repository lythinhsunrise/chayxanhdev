import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin, TimePicker  } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store';
import { openNotification } from '../Helpers/Notification';
import { useNavigate } from 'react-router-dom';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const BookingClient = () => {
  const [loading, setLoading] = useState(false);
  const { user, getListStores, storeBooking } = useContext(AppContext);
  const [form] = Form.useForm();
  const [stores, setStores] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  
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
      values.date = date;
      values.time = time;
      // console.log(values)
      storeBooking(values).then((res) => {
        if (res.data.status == true) {
          openNotification(res.data);
          navigate("/")
        }
      })
    })
  }

  function onChange(time, timeString) {
    setTime(timeString)
  }

  function onChangeDate(time, timeString) {
    setDate(timeString)
  }

  const format = 'HH:mm';

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
              {...layout}
            >
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="..." />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
              >
                <Input placeholder="..." />
              </Form.Item>
              <Form.Item
                label="Chọn quán"
                name="store_id"
                style={{ marginBottom: 15 }}
                rules={[{ required: true, message: 'Chọn quán' }]}
              >
                <Select
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
                <DatePicker onChange={onChangeDate}/>
              </Form.Item>
              <Form.Item
                label="Thời gian"
                name="time"
                rules={[{ required: true, message: 'Please input your time!' }]}
              >
                {/* <Input bordered={false} type="time" /> */}
                <TimePicker onChange={onChange} format={format} />
              </Form.Item>
              <Form.Item
                label="Số lượng khách dự kiến"
                name="guest"
                rules={[{ required: true, message: 'Please input your guest!' }]}
              >
                <InputNumber min={1} max={50}/>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default BookingClient