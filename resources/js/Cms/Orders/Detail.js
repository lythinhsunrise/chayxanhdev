import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Drawer, Form, Input, InputNumber, Row, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';
import MenuOrderItem from './MenuItem';

const initialValues = {
  category: 1,
  price: "10000",
}

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
  const { getListMenus, getListUsers, updateMenu } = useContext(AppContext);
  const [itemMenu, setItemMenu] = useState('');
  const [visible, setVisible] = useState(false);
  const [orderD, setOrderD] = useState([]);
  const [users, setUsers] = useState([]);

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
    // if (params.id) {
    //   setLoadingForm(true)
    //   getMenuByID(params.id).then((res) => {
    //     form.setFieldsValue(res.data.data)
    //     setPic(res.data.data.pic)
    //     setItem(res.data.data)
    //     setLoadingForm(false)
    //   })
    // }
    getListMenus().then((response) => {
      setItemMenu(response.data.data)
    })
    getListUsers().then((response) => {
      setUsers(response.data.data)
      setLoadingForm(false)
    })
  }, []);

  useEffect(() => {
    let sumTemp = 0
    orderD.map(item => {
      sumTemp += item.price * item.qty
    })
    form.setFieldsValue({money: sumTemp})
  }, [orderD]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      setLoadingForm(true)
      const formData = new FormData();
      if (params.id) formData.append("id", params.id)
      if (values.name) formData.append("name", values.name)
      if (values.ingredients) formData.append("ingredients", values.ingredients)
      if (values.nutrition) formData.append("nutrition", values.nutrition)
      if (values.price) formData.append("price", values.price)
      if (values.category) formData.append("category", values.category)
      if (values.upload) {
        formData.append("upload", values.upload[0].originFileObj);
      }
      if (params.id) {
        //update
        updateMenu(formData).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/menus")
        })
      } else {
        //store
        storeMenu(formData).then(function (res) {
          setLoadingForm(false)
          openNotification(res.data);
          navigate("/admin/menus")
        })
      }
    })
  }

  function onChange(value) {
    form.setFieldsValue(users[value])
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
                    label="Người dùng"
                    name="user"
                    style={{ marginBottom: 15 }}
                  >
                    <Select
                      optionFilterProp="children"
                      onChange={onChange}
                      showSearch
                    >
                      {users && users.map((item, index) => <Select.Option key={item.id} value={index}>{item.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    style={{ marginBottom: 15 }}
                  >
                    <InputNumber style={{ width: '100%' }} placeholder="Please Input"/>
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    style={{ marginBottom: 15 }}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
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