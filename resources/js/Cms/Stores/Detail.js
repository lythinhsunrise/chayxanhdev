import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const DetailStore = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getStoreByID, storeStore, updateStore } = useContext(AppContext);

  const operations = <>
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button>
    <Button onClick={() => navigate("/admin/stores")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  useEffect(() => {
    if (params.id) {
      setLoadingForm(true)
      getStoreByID(params.id).then((res) => {
        form.setFieldsValue(res.data.data)
        setItem(res.data.data)
        setLoadingForm(false)
      })
    }
  }, []);

  const onSubmit = () => {
    if (params.id) {
      form.validateFields().then((values) => {
        setLoadingForm(true)
        values.id = params.id
        updateStore(values).then(res => {
          openNotification(res.data);
          setLoadingForm(false)
          if (res.data.status != "error") {
            navigate("/admin/stores")
          }
        })
      })
    } else {
      form.validateFields().then((values) => {
        setLoadingForm(true)
        storeStore(values).then((res) => {
          openNotification(res.data);
          setLoadingForm(false)
          if (res.data.status != "error") {
            navigate("/admin/stores")
          }
        })
      })
    }
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý chi nhánh</Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Card
          size="small"
          title={
            item.name ? <h3>{item.name}<br /><small>{item.username}</small></h3> : <h3>{'Chi nhánh mới'}</h3>
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
                    label="Tên chi nhánh"
                    name="name"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="SĐT"
                    name="phone"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  {/* <Form.Item
                    label="SL bàn"
                    name="seats"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Select' }]}
                  >
                    <Input type="number" placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="SL phòng"
                    name="private_room"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Select' }]}
                  >
                    <Input type="number" placeholder="Please Input" />
                  </Form.Item> */}
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

export default DetailStore