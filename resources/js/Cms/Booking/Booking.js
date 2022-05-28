import { DeleteOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';

const Booking = () => {
  let navigate = useNavigate();
  const { getListBookings, deleteBooking, user, updateBooking, getListStores } = useContext(AppContext);
  const [data, setData] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  const [stores, setStores] = useState();
  const [change, setChange] = useState(false);
  
  useEffect(() => {
    getListBookings(user.store_id).then((response) => {
      setData(response.data.data)
      getListStores().then((response) => {
        setStores(response.data.data)
        setLoadingTable(false)
      })
      setLoadingTable(false)
    })
  }, [change])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value, record) => {
        if (record.status === 0) return <Tag color="purple">Chờ duyệt</Tag>
        if (record.status === 1) return <Tag color="green">Đã Duyệt</Tag>
      }
    },
    {
      title: 'Tên KH',
      dataIndex: 'name',
      key: 'name',
      width: 160
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'SL Khách',
      dataIndex: 'guest',
      key: 'guest',
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'store_id',
      key: 'store_id',
      render: (store_id) => {
        let store_text = stores ? stores.find(item => item.id == store_id) : null;
        return (
          <>{store_text ? store_text.name : ""}</>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          {record.status === 0 && <Popconfirm title="Are you sure ?" placement="leftTop" onConfirm={() => update(record)}>
            <Button type="link" size="small" ><CheckSquareOutlined /></Button>
          </Popconfirm>}
          {user.role_id < 3 &&<Popconfirm title="Are you sure ?" placement="leftTop" onConfirm={() => remove(record)}>
            <Button type="link" size="small" danger><DeleteOutlined /></Button>
          </Popconfirm>}
        </Space>
      ),
    },
  ];
  const update = (record) => {
    setLoadingTable(true)
    record.status = 1
    updateBooking(record).then((res) => {
      openNotification(res.data);
      setLoadingTable(false)
    })
  }
  const remove = (record) => {
    setLoadingTable(true)
    deleteBooking(record.id).then((res) => {
      let newItems = data.filter(item => item.id !== record.id)
      setData(newItems)
      openNotification(res.data);
      setLoadingTable(false)
    })
  }
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý đặt bàn</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }} onClick={() => setChange(!change)}>Refresh</Button>
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

export default Booking