import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { TodoListContext } from '../../store';

const Menu = () => {
  let navigate = useNavigate();
  const { getListStores, deleteStore } = useContext(TodoListContext);
  const [data, setData] = useState();
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {

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
      dataIndex: 'thanhphan',
      key: 'thanhphan',
    },
    {
      title: 'Ảnh',
      dataIndex: 'pic',
      key: 'pic',
      width: 130,
      // render: pic => {
      //   return (
      //     <Image
      //       width={80}
      //       height={80}
      //       // src="http://dev.chayxanh.com/images/menuItem-1.png"
      //       src={pic ? process.env.MIX_APP_URL + '/images' + pic : process.env.MIX_APP_URL + '/images' + "/no-image.png"}
      //     />
      //   )
      // }
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (record) => {
        record = `VND ${record}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return (
          <p>{record}</p>
        )
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
    navigate(`/admin/stores/detail/${record.id}`)
  }
  const remove = (record) => {
    setLoadingTable(true)
    deleteStore(record.id).then((res) => {
      let newItems = data.filter(item => item.id !== record.id)
      setData(newItems)
      openNotification(res.data);
      setLoadingTable(false)
    })
  }
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý chi nhánh</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }}><Link to="/admin/stores/detail">Thêm chi nhánh</Link></Button>
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