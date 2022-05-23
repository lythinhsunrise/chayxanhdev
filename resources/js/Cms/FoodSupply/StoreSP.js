import { DeleteOutlined, EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Space, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';

const StoreSP = () => {
  let navigate = useNavigate();
  const { getListStores, deleteStore } = useContext(AppContext);
  const [data, setData] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  useEffect(() => {
    getListStores().then((response) => {
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
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => detail(record)}><FileSearchOutlined /></Button>
        </Space>
      ),
    },
  ];
  const detail = (record) => {
    navigate(`/admin/foods_supply/store/detail/${record.id}`)
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
        <Breadcrumb.Item>Yêu cầu chuyển món</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách chi nhánh</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
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

export default StoreSP