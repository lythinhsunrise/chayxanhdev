import { Button, Card, Col, Empty, Form, Input, Modal, Radio, Result, Row, Select, Spin } from 'antd'
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
  const { user, cart, money, cart_length, storeByUser, resetCart, getListStores, getPaymentMomo } = useContext(AppContext);
  const [form] = Form.useForm();
  const [payment, setPayment] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [stores, setStores] = useState();

  useEffect(() => {
    if (user.id) {
      form.setFieldsValue(user)
    }
    getListStores().then((response) => {
      setStores(response.data.data)
    })
  }, [])

  const onClose = () => {
    setVisible(false);
    navigate("/menu");
  };

  const onFinish = () => {
    if (!user.id) {
      openNotification({ status: false, message: 'Please login to order your food!' });
      navigate("/login");
      return;
    }
    form.validateFields().then((values) => {
      values = {
        ...values, orderD: cart, payment_id: payment, payment_status: 0,
        type_id: 1, money, status_order_id: 0, user_order_id: values.id
      }
      if (values.orderD.length == 0) {
        return;
      }
      // console.log(values)
      storeByUser(values).then((res) => {
        if (payment == 3 && res.data.status === true) {
          let info = {amount: money, orderId: res.data.tempOrderId};
          getPaymentMomo(info).then((res) => {
            window.open(res.data.url,"_self");
          })
          return;
        }
        if (res.data.status == true) {
          setOrderID(res.data.data);
          setVisible(true);
          resetCart();
        }
        openNotification(res.data);
      })
    })
  };
  const onChange = e => {
    setPayment(e.target.value)
  };
  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
        <br />
        <Card title="????n h??ng m???i" bordered={false}>
          <Spin tip="Loading..." spinning={loading}>
            <Row gutter={[4, 0]}>
              <Col xs={{ span: 12 }}>
                <h3>Th??ng tin giao h??ng</h3>
                <Form
                  labelAlign="left"
                  // layout='horizontal'
                  {...layout}
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item name="id" hidden><Input /></Form.Item>
                  <Form.Item
                    label="T??n"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input placeholder="..." />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone!' }]}
                  >
                    <Input placeholder="..." />
                  </Form.Item>
                  <Form.Item
                    label="?????a ch???"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                  >
                    <Input.TextArea placeholder="..." />
                  </Form.Item>
                  <Form.Item
                    label="Chi nh??nh"
                    name="store_id"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'H??y ch???n chi nh??nh g???n b???n!' }]}
                  >
                    <Select
                      optionFilterProp="children"
                      placeholder="H??y ch???n chi nh??nh g???n b???n!"
                    >
                      {stores && stores.map((item) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Ghi ch??"
                    name="notes"
                  >
                    <Input.TextArea placeholder="..." />
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={{ span: 12 }}>
                <h3>C??c m??n ???? ch???n</h3>
                {cart.map((item, index) => <ItemCart key={index} item={item} />)}
                {cart_length ? <>
                  <h4>T???ng c???ng: {money}</h4>
                </> : <Empty description="Ch??a c?? m??n n??o, h??y th??m m??n ngay n??o ..." />}
              </Col>
              <Col xs={{ span: 12 }}>
                <h3>Ph????ng th???c thanh to??n</h3>
                <Radio.Group onChange={onChange} value={payment}>
                  <Radio style={radioStyle} value={1}>
                    Thanh to??n khi giao h??ng (COD)
                  </Radio>
                  {/* <Radio style={radioStyle} value={2}>
                    Chuy???n kho???n cho c???a h??ng
                    {payment == 2 ? <>
                      <p style={{ marginBottom: '0' }}>- STK: 19036286551012</p>
                      <p style={{ marginBottom: '0' }}>- Ten chu tai khoan: LE HONG SON</p>
                      <p style={{ marginBottom: '0' }}>- Ngan hang: Techcombank</p>
                      <p style={{ marginBottom: '0' }}>- Chi nhanh: Ho chi Minh</p>
                    </> : null}
                  </Radio> */}
                  <Radio style={radioStyle} value={3}>
                    Thanh to??n b???ng v?? MoMo
                  </Radio>
                </Radio.Group>
              </Col>
              <Col xs={{ span: 12 }}>
                <Button type='primary' onClick={onFinish}>?????t ngay</Button>
              </Col>
            </Row>
          </Spin>
          <Modal
            title="Th??ng b??o"
            visible={visible}
            footer={null}
            onCancel={onClose}
          >
            <Result
              status="success"
              title="?????t m??n th??nh c??ng!"
              subTitle={`????n h??ng c???a b???n ???? ???????c ti???p nh???n nh??n vi??n s??? li??n h??? v???i b???n trong gi??y l??t ... M?? ????n h??ng #${orderID}`}
              extra={[
                <Button type="primary" key="console">
                  <Link to="/my-order">
                    Xem ????n h??ng
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