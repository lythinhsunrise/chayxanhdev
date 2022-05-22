import { RollbackOutlined, SaveOutlined, DollarOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Drawer, Empty, Form, Input, InputNumber, Modal, Row, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemCart from '../../../Client/components/ItemCart';
import { openNotification } from '../../../Helpers/Notification';
import { AppContext } from '../../../store';
import MenuOrderItem from '../MenuItem';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const DetailOrderHome = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getListQtyFoods, getListMenus, getListUsers, updateOrder, storeOrder, user, getListStores, getOrderByID, updateOrderAccept } = useContext(AppContext);
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
  const [changeMoney, setChangeMoney] = useState("Chưa đủ tiền!");
  const [inputMoney, setInputMoney] = useState();

  const initialValues = {
    type_id: 0,
    status_order: 1,
    store_id: user.store_id,
    status_order_id: 1,
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setVisible_modal(false);
  };

  const onAccept = () => {
    form.validateFields().then((values) => {
      let user_owner_id = user.id
      if (orderD.length === 0) {
        openNotification({ status: false, message: "Chưa có món nào được chọn!" });
        return;
      }
      values = { ...values, orderD, user_owner_id, store_id: user.store_id, status_order_id: 1 }
      // if(item.status_order_id === 1){
      //   values.status_order_id = 2;
      // }
      // setLoadingForm(true)
      if (params.id) {
        let id = params.id
        values = { ...values, id, notes, money }
        // console.log(values)
        updateOrderAccept(values).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          if (res.data.status === "success") {
            navigate("/admin/orders_home")
          }
        })
      }
    })
  }

  const onFinishEnd = () => {
    let values = { id: params.id, status_order_id: 4 }
    updateOrder(values).then(function (res) {
      setLoadingForm(false)
      openNotification(res.data);
      navigate("/admin/orders_home")
    })
  }

  const operations = <>
    {item.payment_status === 0 ? <Button onClick={() => setVisible_modal(true)} type="primary" style={{ marginRight: 8 }} icon={<DollarOutlined />}>
      Thanh toán
    </Button> : null}
    {item.payment_status === 1 ? <Button onClick={onFinishEnd} type="primary" style={{ marginRight: 8 }} icon={<DollarOutlined />}>
      Xác nhận hoàn thành
    </Button> : null}
    {/* <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button> */}
    <Button onClick={() => navigate("/admin/orders_home")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  const operations_waiting = <>
    <Button type="primary" onClick={onAccept} style={{ marginRight: 8 }}>
      Xác nhận đơn hàng
    </Button>
    <Button onClick={() => navigate("/admin/orders_home")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  useEffect(() => {
    getListMenus().then((response) => {
      // setItemMenu(response.data.data)
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
        setItemMenu(temp)
      })
    })
    getListUsers().then((response) => {
      setUsers(response.data.data)
    })
    getListStores().then((response) => {
      setStores(response.data.data)
    })
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

  useEffect(() => {
    let sumTemp = 0
    orderD.map(item => {
      sumTemp += item.price * item.qty
    })
    setMoney(sumTemp)
    form.setFieldsValue({ money: sumTemp })
  }, [orderD]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      let user_owner_id = user.id
      if (orderD.length === 0) {
        return;
      }
      values = { ...values, orderD, user_owner_id, store_id: user.store_id }
      // setLoadingForm(true)
      if (params.id) {
        //update
        let id = params.id
        values = { ...values, id, notes, money }
        console.log(values)
        updateOrder(values).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/orders_home")
        })
      } else {
        //store
        values = { ...values, type_id: 1, payment_status: 0, notes, money }
        storeOrder(values).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/orders_home")
        })
      }
    })
  }

  const onChangeNotes = (e) => {
    setNotes(e.target.value);
  }

  useEffect(() => {
    if (inputMoney) {
      let changeMony = inputMoney - money;
      if (changeMony < 0) {
        setChangeMoney("Chưa đủ tiền!")
      } else {
        setChangeMoney(changeMony)
      }
    }
  }, [inputMoney])

  const onPayment = () => {
    let values = { id: params.id, payment_status: 1, status_order_id: 4 }
    if (changeMoney >= 0) {
      updateOrder(values).then(function (res) {
        setLoadingForm(false)
        openNotification(res.data);
        navigate("/admin/orders_home")
      })
    }
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Card
          size="small"
          title={
            item.name ? <h3>{item.name}<br /><small>{item.username}</small></h3> : <h3>{'Đơn hàng mới'}</h3>
          }
          style={{ width: '100%' }}
          extra={item.status_order_id == 0 ? operations_waiting : operations}
        >
          <Spin tip="Loading..." spinning={loadingForm}>
            <Form
              {...formItemLayout}
              layout="horizontal"
              form={form}
              labelAlign="left"
              initialValues={initialValues}
            >
              <Row>
                <Col xs={24} xl={12}>
                  <h3>Các món đã chọn</h3>
                  {orderD.map((item, index) => <ItemCart key={index} item={item} noButton={true} />)}
                  {orderD.length ? <>

                  </> : <Empty description="Chưa có món nào, hãy thêm món ngay nào ..." />}
                </Col>
                <Col xs={24} xl={12}>
                  <h2>Tổng cộng: {`${money} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>
                  <h3>Hình thức thanh toán: {item.payment_id === 3 ? <span style={{ color: '#FF1493' }}>Momo</span> : <span style={{ color: 'green' }}>Tiền mặt</span>}</h3>
                  {item.payment_status === 1 ? <h3 style={{ color: '#307839', border: '2px solid #307839', width: '150px', paddingLeft: '8px' }}>Đã thanh toán</h3> : <h3 style={{ color: '#FF0000', border: '2px solid #FF0000', width: '150px', paddingLeft: '8px' }}>Chưa thanh toán</h3>}
                  <h4>Ghi chú</h4>
                  <Input.TextArea rows={5} placeholder="..." value={notes} onChange={onChangeNotes} />
                  <h4>Thông tin người đặt</h4>
                  <Form.Item
                    label="Tên"
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
                    label="Địa chỉ"
                    name="address"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  {/* <Form.Item
                    label="Trạng thái"
                    name="status_order_id"
                    style={{ marginBottom: 15 }}
                  >
                    <Select
                      optionFilterProp="children"
                      showSearch
                    >
                      <Select.Option key={0} value={0}>Chờ xác nhận</Select.Option>
                      <Select.Option key={1} value={1}>Đơn hàng mới</Select.Option>
                      <Select.Option key={2} value={2}>Đang giao hàng</Select.Option>
                      <Select.Option key={4} value={4}>Đã hoàn thành</Select.Option>
                      <Select.Option key={5} value={5}>Đơn bị hủy</Select.Option>
                    </Select>
                  </Form.Item> */}
                </Col>
              </Row>
              <br />
              {item.status_order_id === 0 ? <Button type="primary" onClick={showDrawer}>
                Chọn món
              </Button> : null}
              <Drawer
                title="Món ăn"
                placement="right"
                onClose={onClose}
                visible={visible}
                size="large"
              >
                <Card title="Món khai vị" bordered={false}>
                  {itemMenu && itemMenu.map((item) => {
                    if (item.category == 1) return <MenuOrderItem orderD={orderD} setOrderD={setOrderD} key={item.id} item={item} />
                  })}
                </Card>
                <Card title="Món chính" bordered={false}>
                  {itemMenu && itemMenu.map((item) => {
                    if (item.category == 2) return <MenuOrderItem orderD={orderD} setOrderD={setOrderD} key={item.id} item={item} />
                  })}
                </Card>
                <Card title="Món đặc biệt" bordered={false}>
                  {itemMenu && itemMenu.map((item) => {
                    if (item.category == 3) return <MenuOrderItem orderD={orderD} setOrderD={setOrderD} key={item.id} item={item} />
                  })}
                </Card>
              </Drawer>
            </Form>
          </Spin>
          <Modal
            title="Thanh toán"
            visible={visible_modal}
            onCancel={onClose}
            onOk={onPayment}
          >
            <h4>Tổng tiền: {`${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</h4>
            <h4>Tiền khách đưa: </h4>
            <InputNumber style={{ width: '100%' }} min={0} placeholder='Số tiền khách đưa' onChange={(e) => { setInputMoney(e) }} value={inputMoney} />
            <h4>Tiền thừa: </h4>
            <Input placeholder='Số tiền thừa' value={`${changeMoney} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Modal>
        </Card>
      </div>
    </>
  )
}

export default DetailOrderHome