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

const DetailOrderStore = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getListQtyFoods, getListMenus, getListUsers, updateOrder, storeOrder, user, getListStores, getOrderByID } = useContext(AppContext);
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
  const [changeMoney, setChangeMoney] = useState(0);

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

  const operations = <>
    {params.id ? <Button onClick={() => setVisible_modal(true)} type="primary" style={{ marginRight: 8 }} icon={<DollarOutlined />}>
      Thanh toán
    </Button> : null }
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button>
    <Button onClick={() => navigate("/admin/orders_store")} icon={<RollbackOutlined />}>
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
          navigate("/admin/orders_store")
        })
      } else {
        //store
        values = { ...values, type_id: 0, payment_status: 0, notes, money }
        storeOrder(values).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/orders_store")
        })
      }
    })
  }

  const onChangeNotes = (e) => {
    setNotes(e.target.value);
  }

  const onPayment = () => {
    let values = { id: params.id, payment_status: 1 }
    updateOrder(values).then(function (res) {
      setLoadingForm(false)
      openNotification(res.data);
      navigate("/admin/orders_store")
    })
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
          extra={operations}
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
                    <h4>Tổng cộng: {money}</h4>
                  </> : <Empty description="Chưa có món nào, hãy thêm món ngay nào ..." />}
                </Col>
                <Col xs={24} xl={12}>
                  <h4>Ghi chú</h4>
                  <Input.TextArea rows={5} placeholder="..." value={notes} onChange={onChangeNotes} />
                  <h4>Trạng thái: Chưa thanh toán</h4>
                </Col>
              </Row>
              <br />
              <Button type="primary" onClick={showDrawer}>
                Chọn món
              </Button>
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
            <Input placeholder='Số tiền khách đưa' onChange={(e) => {setChangeMoney(money - e.target.value)}}/>
            <h4>Tiền thói lại: </h4>
            <Input placeholder='Số tiền thói lại cho khách' value={`${changeMoney}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
          </Modal>
        </Card>
      </div>
    </>
  )
}

export default DetailOrderStore