import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Form, Image, Input, InputNumber, notification, Row, Select, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../store';
import { openNotification } from '../../Helpers/Notification';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const DetailUser = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getUserByID, storeUser, updateUser, getListStores, user } = useContext(AppContext);
  const [stores, setStores] = useState();

  const operations = <>
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button>
    <Button onClick={() => navigate("/admin/users")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  useEffect(() => {
    setLoadingForm(true)
    if (params.id) {
      getUserByID(params.id).then((res) => {
        form.setFieldsValue(res.data.data)
        setItem(res.data.data)
        setLoadingForm(false)
      })
    }
    getListStores().then((response) => {
      setStores(response.data.data)
      setLoadingForm(false)
    })
  }, []);

  const onSubmit = () => {
    if (params.id) {
      form.validateFields().then((values) => {
        setLoadingForm(true)
        values.id = params.id
        updateUser(values).then(res => {
          openNotification(res.data);
          setLoadingForm(false)
          if (res.data.status != "error") {
            navigate("/admin/users")
          }
        })
      })
    } else {
      form.validateFields().then((values) => {
        setLoadingForm(true)
        if(user.role_id === 2){
          values.store_id = user.store_id
        }
        storeUser(values).then((res) => {
          openNotification(res.data);
          setLoadingForm(false)
          if (res.data.status != "error") {
            navigate("/admin/users")
          }
        })
      })
    }
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Card
          size="small"
          title={
            item.name ? <h3>{item.name}<br /><small>{item.username}</small></h3> : <h3>{'Tài khoản mới'}</h3>
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
            >
              <Row>
                <Col xs={24} xl={12}>
                  <Form.Item
                    label="Họ tên"
                    name="name"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: item.id ? false : true, message: 'Please Input' }]}
                  >
                    <Input type="password" placeholder={item.id ? "Change Password..." : "Please Input"} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    style={{ marginBottom: 15 }}
                  >
                    <Input type="email" placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    style={{ marginBottom: 15 }}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Quyền"
                    name="role_id"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Select' }]}
                  >
                    <Select
                      optionFilterProp="children"
                    >
                      <Select.Option key={1} value={0}>Khách hàng</Select.Option>
                      <Select.Option key={2} value={3}>Nhân viên</Select.Option>
                      <Select.Option key={3} value={2}>Quản lý chi nhánh</Select.Option>
                      {user.role_id == 1 ? <Select.Option key={4} value={1}>Quản lý tổng</Select.Option> : null}
                    </Select>
                  </Form.Item>
                  {user.role_id == 1 ? <Form.Item
                    label="Chi nhánh"
                    name="store_id"
                    style={{ marginBottom: 15 }}
                  >
                    <Select
                      optionFilterProp="children"
                    >
                      <Select.Option key="0" value={null}>Tất cả chi nhánh</Select.Option>
                      {stores && stores.map((item) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                    </Select>
                  </Form.Item> : null}

                </Col>
                <Col xs={24} xl={12}>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    </>
  )
}

export default DetailUser