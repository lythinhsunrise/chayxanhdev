import { DeleteOutlined, EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../../Helpers/Notification';
import { AppContext } from '../../store';

const FoodSupply = () => {
  let navigate = useNavigate();
  const { getListStores, getListFoodSP, deleteStore } = useContext(AppContext);
  const [data, setData] = useState();
  const [stores, setStores] = useState();
  const [loadingTable, setLoadingTable] = useState(true);
  useEffect(() => {
    getListFoodSP().then((res) => {
      setData(res.data.data)
      getListStores().then((res) => {
        setStores(res.data.data)
        setLoadingTable(false)
      })
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value, record) => {
        if (record.status === 0) return <Tag color="red">Chờ chấp thuận</Tag>
        if (record.status === 1) return <Tag color="green">Đã chấp thuận</Tag>
      }
    },
    {
      title: 'Cửa hàng nhận',
      dataIndex: 'id_store_get',
      key: 'id_store_get',
      render: (store_id) => {
        let store_text = stores ? stores.find(item => item.id == store_id) : null;
        return (
          <>{store_text ? store_text.name : ""}</>
        );
      }
    },
    {
      title: 'Cửa hàng gửi',
      dataIndex: 'id_store_share',
      key: 'id_store_share',
      render: (store_id) => {
        let store_text = stores ? stores.find(item => item.id == store_id) : null;
        return (
          <>{store_text ? store_text.name : ""}</>
        );
      }
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
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
    navigate(`/admin/foods_supply/detail/${record.id}`)
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
        <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }}><Link to="/admin/foods_supply/store">Tạo yêu cầu mới</Link></Button>
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

export default FoodSupply