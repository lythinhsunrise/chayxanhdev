import { Button, Card, Col, Empty, Form, Input, Radio, Row, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../store';
import ItemCart from './components/ItemCart';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const radioStyle = {
  display: 'block',
};

const MyCart = () => {
  const [loading, setLoading] = useState(false);
  const { user, cart, money, cart_length } = useContext(AppContext);
  const [form] = Form.useForm();
  const [payment, setPayment] = useState(1);
  const onFinish = () => {
    console.log('asd');
  };
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setPayment(e.target.value)
  };
  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
        <br />
        <Card title="Đơn hàng mới" bordered={false}>
          <Spin tip="Loading..." spinning={loading}>
            <Row>
              <Col xs={{ span: 12 }}>
                <h3>Thông tin giao hàng</h3>
                <Form
                  labelAlign="left"
                  layout='horizontal'
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item name="id" hidden><Input /></Form.Item>
                  <Form.Item
                    label="Tên"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input bordered={false} placeholder="..." />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone!' }]}
                  >
                    <Input bordered={false} placeholder="..." />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                  >
                    <Input bordered={false} placeholder="..." />
                  </Form.Item>
                  <Form.Item
                    label="Ghi chú"
                    name="notes"
                  >
                    <Input.TextArea bordered={false} placeholder="..." />
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={{ span: 12 }}>
                <h3>Các món đã chọn</h3>
                {cart.map((item, index) => <ItemCart key={index} item={item} />)}
                {cart_length ? <>
                  <h4>Tổng cộng: {money}</h4>
                </> : <Empty description="Chưa có món nào, hãy thêm món ngay nào ..." />}
              </Col>
              <Col xs={{ span: 12 }}>
                <h3>Phương thức thanh toán</h3>
                <Radio.Group onChange={onChange} value={payment}>
                  <Radio style={radioStyle} value={1}>
                    Thanh toán khi giao hàng (COD)
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    Chuyển khoản cho cửa hàng
                    {payment == 2 ? <>
                      <p style={{marginBottom: '0'}}>- STK: 19036286551012</p>
                      <p style={{marginBottom: '0'}}>- Ten chu tai khoan: LE HONG SON</p>
                      <p style={{marginBottom: '0'}}>- Ngan hang: Techcombank</p>
                      <p style={{marginBottom: '0'}}>- Chi nhanh: Ho chi Minh</p>
                    </> : null}
                  </Radio>
                </Radio.Group>
              </Col>
              <Col xs={{ span: 12 }}>
                <Button type='primary' onClick={onFinish}>Đặt ngay</Button>
              </Col>
            </Row>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default MyCart