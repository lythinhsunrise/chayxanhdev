import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Form, Image, Input, InputNumber, notification, Row, Select, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoListContext } from '../../store';

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
  const { getUserByID } = useContext(TodoListContext);

  const operations = <>
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button>
    <Button onClick={() => navigate("/admin/users")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  useEffect(() => {
    if (params.id) {
      setLoadingForm(true)
      getUserByID(params.id).then((res) => {
        console.log(res.data.data)
        form.setFieldsValue(res.data.data)
        setItem(res.data.data)
        setLoadingForm(false)
      })
      // axios.get(`/api/menu/${params.id}`)
      //   .then(function (response) {
      //     console.log(response);
      //     form.setFieldsValue(response.data.data)
      //     setPic(response.data.data.pic)
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .then(function () {
      //     setLoadingForm(false)
      //   });
    }
  }, []);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      setLoadingForm(true)
      const formData = new FormData();
      if (values.category) formData.append("category", values.category)
      if (values.dinhduong) formData.append("dinhduong", values.dinhduong)
      if (values.dinhduongEng) formData.append("dinhduongEng", values.dinhduongEng)
      if (values.name) formData.append("name", values.name)
      if (values.nameEng) formData.append("nameEng", values.nameEng)
      if (values.price) formData.append("price", values.price)
      if (values.thanhphan) formData.append("thanhphan", values.thanhphan)
      if (values.thanhphanEng) formData.append("thanhphanEng", values.thanhphanEng)
      if (values.upload) {
        formData.append("upload", values.upload[0].originFileObj);
      }
      if (params.id) {
        //update
        axios.post(`/api/menu/${params.id}`, formData)
          .then(function (response) {
            setLoadingForm(false)
            openNotification('success', 'Update món thành công')
            navigate("/admin/menu")
          })
          .catch(function (error) {
            console.log(error);
            setLoadingForm(false)
            openNotification('error', 'Update món thất bại')
            navigate("/admin/menu")
          });
      } else {
        //store
        axios.post('/api/menu', formData)
          .then(function (response) {
            setLoadingForm(false)
            openNotification('success', 'Thêm món thành công')
            navigate("/admin/menu")
          })
          .catch(function (error) {
            console.log(error);
            setLoadingForm(false)
            openNotification('error', 'Thêm món thất bại')
            navigate("/admin/menu")
          });
      }
    })
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
            item.name ? <h3>{item.name}<br /><small>{item.uuid}</small></h3> : <h3>{'Tài khoản mới'}</h3>
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
                    label="Email"
                    name="email"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
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
                    label="Quyền"
                    name="role_id"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Select' }]}
                  >
                    <Select
                      optionFilterProp="children"
                    >
                      <Select.Option key={1} value={null}>Khách hàng</Select.Option>
                      <Select.Option key={2} value={3}>Nhân viên</Select.Option>
                      <Select.Option key={3} value={2}>Quản lý chi nhánh</Select.Option>
                      <Select.Option key={4} value={1}>Quản lý tổng</Select.Option>
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
                      <Select.Option key={1} value={null}>Chi nhánh 1</Select.Option>
                    </Select>
                  </Form.Item>
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