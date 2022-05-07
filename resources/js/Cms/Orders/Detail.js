import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Drawer, Form, Input, InputNumber, Row, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';
import MenuOrderItem from './MenuItem';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const DetailOrders = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getListMenus, getListUsers, updateOrder, storeOrder, user, getListStores, getOrderByID } = useContext(AppContext);
  const [itemMenu, setItemMenu] = useState('');
  const [visible, setVisible] = useState(false);
  const [orderD, setOrderD] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOrderHome, setIsOrderHome] = useState(false);
  const [stores, setStores] = useState();
  const [name, setName] = useState(null);

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
  };

  const operations = <>
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button>
    <Button onClick={() => navigate("/admin/orders")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  useEffect(() => {
    getListMenus().then((response) => {
      setItemMenu(response.data.data)
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
        setOrderD(JSON.parse(res.data.data.order_detail))
        if(res.data.data.type_id === 1){
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
    form.setFieldsValue({ money: sumTemp })
  }, [orderD]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      let user_owner_id = user.id
      values = { ...values, orderD, user_owner_id, name }
      setLoadingForm(true)
      if (params.id) {
        //update
        let id = params.id
        values = { ...values, id }
        console.log(values)
        updateOrder(values).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/orders")
        })
      } else {
        //store
        storeOrder(values).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/orders")
        })
      }
    })
  }

  function onChange(value) {
    setName(users[value].name)
    form.setFieldsValue({phone: users[value].phone})
    form.setFieldsValue({address: users[value].address})
  }

  return (
    <>
      {console.log(orderD)}
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
                  <Form.Item
                    label="Loại đơn hàng"
                    name="type_id"
                    style={{ marginBottom: 15 }}
                  >
                    <Select
                      optionFilterProp="children"
                      showSearch
                      onChange={() => setIsOrderHome(!isOrderHome)}
                    >
                      <Select.Option key={0} value={0}>Tại cửa hàng</Select.Option>
                      <Select.Option key={1} value={1}>Đặt mang về</Select.Option>
                    </Select>
                  </Form.Item>
                  {isOrderHome && <>
                    <Form.Item
                      label="Người dùng"
                      name="user_order_id"
                      style={{ marginBottom: 15 }}
                    >
                      <Select
                        optionFilterProp="children"
                        onChange={onChange}
                        showSearch
                        placeholder="Chọn người dùng..."
                        allowClear
                      >
                        {users && users.map((item, index) => <Select.Option key={item.id} value={index}>{item.name}</Select.Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      style={{ marginBottom: 15 }}
                      rules={[{ required: true, message: 'Please Input' }]}
                    >
                      <InputNumber style={{ width: '100%' }} placeholder="Please Input" />
                    </Form.Item>
                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      style={{ marginBottom: 15 }}
                      rules={[{ required: true, message: 'Please Input' }]}
                    >
                      <Input placeholder="Please Input" />
                    </Form.Item>
                  </>
                  }
                  <Form.Item
                    label="Tổng tiền"
                    name="money"
                    style={{ marginBottom: 15 }}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/VND\s?|(,*)/g, '')}
                      step={1000}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Trạng thái"
                    name="status_order_id"
                    style={{ marginBottom: 15 }}
                  >
                    <Select
                      optionFilterProp="children"
                      showSearch
                    >
                      <Select.Option key="1" value="1">Đơn hàng mới</Select.Option>
                      <Select.Option key="2" value="2">Đang chuẩn bị</Select.Option>
                      <Select.Option key="3" value="3">Đang giao hàng</Select.Option>
                      <Select.Option key="4" value="4">Đã hoàn thành</Select.Option>
                      <Select.Option key="5" value="5">Đơn bị hủy</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Chi nhánh"
                    name="store_id"
                    style={{ marginBottom: 15 }}
                  >
                    <Select
                      optionFilterProp="children"
                    >
                      {stores && stores.map((item) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
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

export default DetailOrders