import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Button, Table, Tag, Space, Image, Popconfirm, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TodoListContext } from '../../store';

const Users = () => {
  let navigate = useNavigate();
  const { getListUsers } = useContext(TodoListContext);
  const [users, setUsers] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  useEffect(() => {
    getListUsers().then((response) => {
      setUsers(response.data.data)
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
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Quyền',
      dataIndex: 'role_id',
      key: 'role_id',
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'store_id',
      key: 'store_id',
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
    navigate(`/admin/users/detail/${record.id}`)
  }
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }}><Link to="/admin/users/detail">Thêm tài khoản</Link></Button>
        <Table
          bordered
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={users}
          rowKey='id'
          loading={loadingTable}
        />
      </div>
    </>
  )
}

export default Users