import { Button, Card, Col, Empty, Form, Input, Modal, Radio, Result, Row, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store';
import ItemCart from './components/ItemCart';
import { openNotification } from '../Helpers/Notification';
import { Link, useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const radioStyle = {
  display: 'block',
};

const MyCart = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { user, cart, money, cart_length, storeOrder, resetCart } = useContext(AppContext);
  const [form] = Form.useForm();
  const [payment, setPayment] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    if (user.id) {
      form.setFieldsValue(user)
    }
  }, [])

  const onClose = () => {
    setVisible(false);
    navigate("/menu");
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      values = {
        ...values, orderD: cart, payment_id: payment, payment_status: 0,
        type_id: 1, money, status_order_id: 0, user_order_id: values.id
      }
      console.log(values)
      storeOrder(values).then((res) => {
        if (res.data.status == true) {
          setOrderID(res.data.data);
          setVisible(true);
          resetCart();
        }
      })
    })
    if (!user.id) {
      openNotification({ status: false, message: 'Please login to order your food!' });
    }
  };
  const onChange = e => {
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
                    <Input.TextArea bordered={false} placeholder="..." />
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
                      <p style={{ marginBottom: '0' }}>- STK: 19036286551012</p>
                      <p style={{ marginBottom: '0' }}>- Ten chu tai khoan: LE HONG SON</p>
                      <p style={{ marginBottom: '0' }}>- Ngan hang: Techcombank</p>
                      <p style={{ marginBottom: '0' }}>- Chi nhanh: Ho chi Minh</p>
                    </> : null}
                  </Radio>
                </Radio.Group>
              </Col>
              <Col xs={{ span: 12 }}>
                <Button type='primary' onClick={onFinish}>Đặt ngay</Button>
              </Col>
            </Row>
          </Spin>
          <Modal
            title="Thông báo"
            visible={visible}
            footer={null}
            onCancel={onClose}
          >
            <Result
              status="success"
              title="Đặt món thành công!"
              subTitle={`Đơn hàng của bạn đã được tiếp nhận nhân viên sẽ liên hệ với bạn trong giây lát ... Mã đơn hàng #${orderID}`}
              extra={[
                <Button type="primary" key="console">
                  <Link to="/my-order">
                    Xem đơn hàng
                  </Link>
                </Button>,
                // <Button key="buy">Buy Again</Button>,
              ]}
            />,
          </Modal>
        </Card>
      </Col>
    </Row>
  )
}

export default MyCart