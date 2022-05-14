import { Button, Card, Col, Form, Input, Row, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { openNotification } from '../Helpers/Notification';
import { AppContext } from '../store';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
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
        navigate("/logout");
      })
    })
  };

  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
        <br />
        <Card title="Thông tin tài khoản" bordered={false}>
          <Spin tip="Loading..." spinning={loading}>
            <Form
              {...layout}
              // labelAlign="left"
              layout='horizontal'
              form={form}
              onFinish={onFinish}
            >
              <Form.Item name="id" hidden><Input /></Form.Item>
              <Form.Item
                label="Username"
                name="username"
              >
                <Input bordered={false} disabled/>
              </Form.Item>
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input bordered={false} placeholder="..."/>
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
              >
                <Input bordered={false} placeholder="..."/>
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
              >
                <Input.TextArea bordered={false} placeholder="..."/>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input bordered={false} type="email" placeholder="..."/>
              </Form.Item>
              <Form.Item
                label="Đổi mật khẩu"
                name="password"
              >
                <Input.Password bordered={false} placeholder="..."/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Spin>
          <i>Cập nhật thông tin đầy đủ hệ thống sẽ giúp bạn đặt đơn hàng nhanh hơn!</i>
        </Card>
      </Col>
    </Row>
  )
}

export default Me