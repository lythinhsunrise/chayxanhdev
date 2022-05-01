import { Button, Card, Col, Form, Input, Row, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { openNotification } from '../Helpers/Notification';
import { AppContext } from '../store';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Me = () => {
  let navigate = useNavigate();
  const { getMe, updateMe } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    getMe().then((res) => {
      form.setFieldsValue(res.data.data.user)
      setLoading(false)
    })
  }, []);

  const onFinish = () => {
    setLoading(true)
    form.validateFields().then((values) => {
      updateMe(values).then((res) => {
        openNotification(res.data);
        setLoading(false)
        navigate("/");
      })
    })
  };

  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
        <br />
        <Card title="Thông tin tài khoản" bordered={false}>
          <Spin tip="Loading..." spinning={loading}>
            <Form
              {...layout}
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
                <Input />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Đổi mật khẩu"
                name="password"
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default Me