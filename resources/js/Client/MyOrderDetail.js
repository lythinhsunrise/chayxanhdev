import { RollbackOutlined, SaveOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Empty, Form, Input, Modal, Radio, Result, Row, Select, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store';
import ItemCart from './components/ItemCart';
import { openNotification } from '../Helpers/Notification';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ItemMenuList from './components/ItemMenuList';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const radioStyle = {
  display: 'block',
};

const MyOrderDetail = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getListQtyFoods, getListMenus, updateByUserOrder, getOrderByID, updateOrderAccept } = useContext(AppContext);
  const [itemMenu, setItemMenu] = useState('');
  const [visible, setVisible] = useState(false);
  const [orderD, setOrderD] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOrderHome, setIsOrderHome] = useState(false);
  const [stores, setStores] = useState();
  // const [name, setName] = useState(null);
  const [money, setMoney] = useState(0);
  const [notes, setNotes] = useState(null);
  const [visible_modal, setVisible_modal] = useState(false);

  useEffect(() => {
    let sumTemp = 0
    orderD.map(item => {
      sumTemp += item.price * item.qty
    })
    setMoney(sumTemp)
    form.setFieldsValue({ money: sumTemp })
  }, [orderD]);

  useEffect(() => {
    getListMenus().then((response) => {
      setItemMenu(response.data.data)
      // let temp = response.data.data
      // getListQtyFoods(user.store_id).then((res) => {
      //   temp.map((item, index) => {
      //     res.data.data.map((i) => {
      //       if (item.id == i.id_food) {
      //         temp[index].qty = i.qty
      //         temp[index].index_qtyfoods = i.id
      //       }
      //     })
      //     temp[index].store_id = user.store_id
      //   })
      //   setItemMenu(temp)
      // })
    })
    // getListUsers().then((response) => {
    //   setUsers(response.data.data)
    // })
    // getListStores().then((response) => {
    //   setStores(response.data.data)
    // })
    if (params.id) {
      setLoadingForm(true)
      getOrderByID(params.id).then((res) => {
        form.setFieldsValue(res.data.data)
        setItem(res.data.data)
        let orderItems = JSON.parse(res.data.data.order_detail);
        orderItems.map((i, index) => {
          orderItems[index].isChoose = true
          orderItems[index].oldQty = i.qty
        })
        setOrderD(orderItems)
        setNotes(res.data.data.notes)
        if (res.data.data.type_id === 1) {
          setIsOrderHome(!isOrderHome)
        }
        setLoadingForm(false)
      })
    }
  }, []);

  const onChangeNotes = (e) => {
    setNotes(e.target.value);
  }

  const onClose = () => {
    setVisible(false);
    setVisible_modal(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onUpdate = () => {
    form.validateFields().then((values) => {
      if (orderD.length === 0) {
        openNotification({ status: false, message: "Ch??a c?? m??n n??o ???????c ch???n!" });
        return;
      }
      let id = params.id
      values = { ...values, id, orderD, notes, money }
      updateByUserOrder(values).then((res) => {
        setLoadingForm(false)
        openNotification(res.data);
        if (res.data.status === "success") {
          navigate("/my-order")
        }
      })
    })
  }

  const operations = <>
    {(item.status_order_id === 0 && item.payment_status === 0)  ? <Button type="primary" onClick={onUpdate} style={{ marginRight: 8 }}>
      C???p nh???t ????n h??ng 
    </Button> : null }
    <Button onClick={() => navigate("/my-order")} icon={<RollbackOutlined />}>
      Quay l???i
    </Button>
  </>;

  return (
    <Row>
      <Col xs={{ span: 24, offset: 0 }} lg={{ span: 20, offset: 2 }}>
        <br />
        <Card title="????n h??ng" bordered={false} extra={operations}>
          <Spin tip="Loading..." spinning={loading}>
            <Form
              {...formItemLayout}
              layout="horizontal"
              form={form}
              labelAlign="left"
            // initialValues={initialValues}
            >
              <Row>
                <Col xs={24} xl={12}>
                  <h3>C??c m??n ???? ch???n</h3>
                  {orderD.map((item, index) => <ItemCart key={index} item={item} noButton={true} />)}
                  {orderD.length ? <>

                  </> : <Empty description="Ch??a c?? m??n n??o, h??y th??m m??n ngay n??o ..." />}
                </Col>
                <Col xs={24} xl={12}>
                  <h2>T???ng c???ng: {`${money} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>
                  <h3>H??nh th???c thanh to??n: {item.payment_id === 3 ? <span style={{ color: '#FF1493' }}>Momo</span> : <span style={{ color: 'green' }}>Ti???n m???t</span>}</h3>
                  {item.payment_status === 1 ? <h3 style={{ color: '#307839', border: '2px solid #307839', width: '150px', paddingLeft: '8px' }}>???? thanh to??n</h3> : <h3 style={{ color: '#FF0000', border: '2px solid #FF0000', width: '150px', paddingLeft: '8px' }}>Ch??a thanh to??n</h3>}
                  <h4>Ghi ch??</h4>
                  <Input.TextArea rows={5} placeholder="..." value={notes} onChange={onChangeNotes} />
                  <h4>Th??ng tin ng?????i ?????t</h4>
                  <Form.Item
                    label="T??n"
                    name="name"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input style={{ width: '100%' }} placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input style={{ width: '100%' }} placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="?????a ch???"
                    name="address"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                </Col>
              </Row>
              <br />
              {(item.status_order_id === 0 && item.payment_status === 0) ? <Button type="primary" onClick={showDrawer}>
                Ch???n m??n
              </Button> : null}
              <Drawer
                title="M??n ??n"
                placement="right"
                onClose={onClose}
                visible={visible}
                size="large"
              >
                <Card title="M??n khai v???" bordered={false}>
                  {itemMenu && itemMenu.map((item) => {
                    if (item.category == 1) return <ItemMenuList orderD={orderD} setOrderD={setOrderD} key={item.id} item={item} />
                  })}
                </Card>
                <Card title="M??n ch??nh" bordered={false}>
                  {itemMenu && itemMenu.map((item) => {
                    if (item.category == 2) return <ItemMenuList orderD={orderD} setOrderD={setOrderD} key={item.id} item={item} />
                  })}
                </Card>
                <Card title="M??n ?????c bi???t" bordered={false}>
                  {itemMenu && itemMenu.map((item) => {
                    if (item.category == 3) return <ItemMenuList orderD={orderD} setOrderD={setOrderD} key={item.id} item={item} />
                  })}
                </Card>
              </Drawer>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default MyOrderDetail