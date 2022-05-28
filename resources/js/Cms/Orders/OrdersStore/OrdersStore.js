import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Tag, Breadcrumb, Button, Popconfirm, Space, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../../../Helpers/Notification';
import { AppContext } from '../../../store';

const OrdersStore = () => {
  let navigate = useNavigate();
  const { user, getListOrders, deleteOrder, getListUsers } = useContext(AppContext);
  const [data, setData] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  const [users, setUsers] = useState();
  useEffect(() => {
    getListUsers().then((response) => {
      setUsers(response.data.data)
    })
    getListOrders(0).then((response) => {
      setData(response.data.data)
      setLoadingTable(false)
    })
  }, [])
  const list_status_order = [
    {
      text: "Chưa thanh toán",
      value: 0,
    },
    {
      text: "Đã thanh toán",
      value: 1,
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'payment_status',
      filters: list_status_order,
      width: 150,
      onFilter: (value, record) => record.payment_status == value,
      render: (value, record) => {
        if (record.payment_status === 0) return <Tag color="red">Chưa thanh toán</Tag>
        if (record.payment_status === 1) return <Tag color="green">Đã thanh toán</Tag>
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'money',
      key: 'money',
      ellipsis: true,
      render: (record) => {
        record = `${record ? record : 0} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return record
      }
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Nhân viên',
      dataIndex: 'user_owner_id',
      key: 'user_owner_id',
      render: (user_id) => {
        let user_text = users ? users.find(item => item.id == user_id) : null;
        return (
          <>{user_text ? user_text.name : ""}</>
        );
      }
    },
    {
      title: 'Thời gian tạo đơn',
      dataIndex: 'created_at',
      key: 'created_at',
      ellipsis: true,
      render: (text, record) => {
        let str = record.created_at
        // str = str.substring(0, str.length - 8);
        // str = str.replace('T', ' ')
        return str
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
          <Popconfirm title="Are you sure ?" placement="leftTop" onConfirm={() => remove(record)}>
            <Button type="link" size="small" danger><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const update = (record) => {
    navigate(`/admin/orders_store/detail/${record.id}`)
  }
  const remove = (record) => {
    if(user.role_id === 3){
      return;
    }
    setLoadingTable(true)
    deleteOrder(record.id).then((res) => {
      let newItems = data.filter(item => item.id !== record.id)
      setData(newItems)
      openNotification(res.data);
      setLoadingTable(false)
    })
  }
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }}><Link to="/admin/orders_store/detail">Đơn hàng mới</Link></Button>
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

export default OrdersStore