import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Button, Table, Tag, Space, Image, Popconfirm, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { openNotification } from '../../Helpers/Notification';
import { TodoListContext } from '../../store';

const Users = () => {
  let navigate = useNavigate();
  const { getListUsers, deleteUser, user } = useContext(TodoListContext);
  const [users, setUsers] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  useEffect(() => {
    console.log(user)
    getListUsers().then((response) => {
      setUsers(response.data.data)
      setLoadingTable(false)
    })
  }, [])

  const role = [
    { text: 'Khách hàng', value: 0 },
    { text: 'Nhân viên', value: 1 },
    { text: 'Quản lý chi nhánh', value: 2 },
    { text: 'Quản lý tổng', value: 3 },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
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
      filters: role,
      onFilter: (value, record) => record.role_id == value,
      render: (role_id) => {
        let role_text = role ? role.find(item => item.value == role_id) : null;
        return (
          <>{role_text ? role_text.text : ""}</>
        );
      }
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
          <Popconfirm title="Are you sure ?" placement="leftTop" onConfirm={() => remove(record)}>
            <Button type="link" size="small" danger><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const update = (record) => {
    navigate(`/admin/users/detail/${record.id}`)
  }
  const remove = (record) => {
    setLoadingTable(true)
    deleteUser(record.id).then((res) => {
      let newUsers = users.filter(item => item.id !== record.id)
      setUsers(newUsers)
      openNotification(res.data);
      setLoadingTable(false)
    })
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
          scroll={{ x: 980 }}
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