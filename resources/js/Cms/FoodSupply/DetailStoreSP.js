import { RollbackOutlined, SaveOutlined, DollarOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Drawer, Empty, Form, Input, InputNumber, Modal, Row, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemCart from '../../Client/components/ItemCart';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';
import MenuOrderItem from './MenuItem';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const DetailStoreSP = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getListQtyFoods, getListMenus, getListUsers, updateOrder, storeOrder, user, getListStores, storeFoodSP } = useContext(AppContext);
  const [itemMenu, setItemMenu] = useState([]);
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

  const operations = <>
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Tạo yêu cầu
    </Button>
    <Button onClick={() => navigate("/admin/foods_supply")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  useEffect(() => {
    getListMenus().then((response) => {
      // setItemMenu(response.data.data)
      let temp = response.data.data
      getListQtyFoods(params.id).then((res) => {
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
      if (orderD.length === 0) {
        openNotification({ status: false, message: 'Không thể tạo yêu cầu, chưa có món nào!' });
        return;
      }
      values = { ...values, orderD, id_store_share: params.id, id_store_get: parseInt(user.store_id), notes, status: 0 }
      // setLoadingForm(true)
      console.log(values)
      storeFoodSP(values).then((res) => {
        setLoadingForm(false)
        openNotification(res.data);
        navigate("/admin/foods_supply")
      })
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
        navigate("/admin/orders_store")
      })
    }
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Yêu cầu chuyển món</Breadcrumb.Item>
        <Breadcrumb.Item>Chi nhánh</Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Card
          size="small"
          title={
            item.name ? <h3>{item.name}<br /><small>{item.username}</small></h3> : <h3>{'Yêu cầu mới'}</h3>
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
                  <h3>Các món yêu cầu</h3>
                  {orderD.map((item, index) => <ItemCart key={index} item={item} noButton={true} />)}
                  {orderD.length ? <>
                    {/* <h4>Tổng cộng: {money}</h4> */}
                  </> : <Empty description="Các món yêu cầu chuyển ..." />}
                </Col>
                <Col xs={24} xl={12}>
                  {/* <h4>Nhà hàng yêu cầu: </h4>
                  <h4>Nhà hàng tiếp nhận: </h4> */}
                  <Input.TextArea rows={5} placeholder="..." value={notes} onChange={onChangeNotes} />
                  {(item.payment_status === 1 && params.id) ? <h3 style={{ color: '#307839', border: '2px solid #307839', width: '150px', paddingLeft: '8px', marginTop: '8px' }}>Đã thanh toán</h3> : <h3 style={{ color: '#AA336A', border: '2px solid #AA336A', width: '150px', paddingLeft: '8px', marginTop: '8px' }}>Yêu cầu mới</h3>}
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
        </Card>
      </div>
    </>
  )
}

export default DetailStoreSP