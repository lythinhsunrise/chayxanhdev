import { RollbackOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Form, Image, Input, InputNumber, Row, Select, Spin, Upload } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';

const initialValues = {
  category: 1,
  price: "10000",
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const DetailMenu = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  const { getMenuByID, storeMenu, updateMenu } = useContext(AppContext);
  const [pic, setPic] = useState();

  const operations = <>
    <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }} icon={<SaveOutlined />}>
      Lưu
    </Button>
    <Button onClick={() => navigate("/admin/menus")} icon={<RollbackOutlined />}>
      Quay lại
    </Button>
  </>;

  useEffect(() => {
    if (params.id) {
      setLoadingForm(true)
      getMenuByID(params.id).then((res) => {
        form.setFieldsValue(res.data.data)
        setPic(res.data.data.pic)
        setItem(res.data.data)
        setLoadingForm(false)
      })
    }
  }, []);

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
  const normFile = (e) => {
    // console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý món ăn</Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Card
          size="small"
          title={
            item.name ? <h3>{item.name}<br /><small>{item.username}</small></h3> : <h3>{'Món ăn mới'}</h3>
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
                    label="Tên món ăn"
                    name="name"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Thành Phần"
                    name="ingredients"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Dinh Dưỡng"
                    name="nutrition"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Giá"
                    name="price"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/VND\s?|(,*)/g, '')}
                      step={1000}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Danh Mục"
                    name="category"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Select
                      optionFilterProp="children"
                    >
                      <Select.Option key={1} value={1}>Món Khai Vị</Select.Option>
                      <Select.Option key={2} value={2}>Món Chính</Select.Option>
                      <Select.Option key={3} value={3}>Món Đặc Biệt</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} xl={12}>
                  {pic &&
                    <Form.Item
                      label="Ảnh"
                      name="pic"
                    >
                      <Image
                        width={170}
                        src={APP_URL + '/images' + pic}
                      />
                    </Form.Item>
                  }
                  <Form.Item
                    label="Upload"
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Ảnh món ăn"
                    rules={[{ required: !params.id ? true : false, message: 'Please Input' }]}
                  >
                    <Upload name="pic" customRequest={dummyRequest} listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    </>
  )
}

export default DetailMenu