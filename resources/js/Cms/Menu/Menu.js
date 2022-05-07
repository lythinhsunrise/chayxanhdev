import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Image, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';

const Menu = () => {
  let navigate = useNavigate();
  const { getListMenus, deleteMenu } = useContext(AppContext);
  const [data, setData] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  useEffect(() => {
    getListMenus().then((response) => {
      setData(response.data.data)
      setLoadingTable(false)
    })
  }, [])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Tên món ăn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thành phần',
      dataIndex: 'ingredients',
      key: 'ingredients',
    },
    {
      title: 'Ảnh',
      dataIndex: 'pic',
      key: 'pic',
      width: 130,
      render: pic => {
        return (
          <Image
            width={40}
            height={40}
            preview={false}
            src={APP_URL + '/images' + pic}
          />
        )
      }
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (record) => {
        record = `VND ${record}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return record
      }
    },
    {
      title: 'Danh mục',
      key: 'category',
      dataIndex: 'category',
      width: 120,
      filters: [
        {
          text: 'Món Khai Vị',
          value: 'Món Khai Vị',
        },
        {
          text: 'Món Chính',
          value: 'Món Chính',
        },
        {
          text: 'Món Đặc Biệt',
          value: 'Món Đặc Biệt',
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      render: category => {
        let color = 'gray';
        category === 'Món Chính' ? color = 'green' : color = 'geekblue'
        category === 'Món Đặc Biệt' ? color = 'yellow' : color
        return (
          <Tag color={color}>
            {category}
          </Tag>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => update(record)}><EditOutlined /></Button>
          <Popconfirm title="Xóa món này?" placement="leftTop" onConfirm={() => remove(record)}>
            <Button type="link" size="small" danger><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const update = (record) => {
    navigate(`/admin/menus/detail/${record.id}`)
  }
  const remove = (record) => {
    setLoadingTable(true)
    deleteMenu(record.id).then((res) => {
      let newItems = data.filter(item => item.id !== record.id)
      setData(newItems)
      openNotification(res.data);
      setLoadingTable(false)
    })
  }
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý món ăn</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }}><Link to="/admin/menus/detail">Thêm món mới</Link></Button>
        <Table
          bordered
          scroll={{ x: 980 }}
          columns={columns}
          dataSource={data}
          rowKey='id'
          loading={loadingTable}
        />
      </div>
    </>
  )
}

export default Menu