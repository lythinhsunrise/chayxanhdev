import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment';
import { Row, Col, Card, DatePicker, Select } from 'antd';
import { AppContext } from '../store';
import Chart from "react-apexcharts";
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const initchartData = {
  series: [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Bảng doanh thu theo ngày',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  },
};
const Dashboard = () => {
  const { user, getListStores, revenue_store, getListUsersMG, getListBookings, revenue_by_day_store } = useContext(AppContext);
  const [data, setData] = useState({
    time_start: '2022-05-01',
    time_end: '2022-05-31',
    store_id: user ? user.store_id : 0,
  });
  const [stores, setStores] = useState();
  const [revenue, setRevenue] = useState();
  const [totalOrder, setTotalOrder] = useState();
  const [employee, setEmployee] = useState();
  const [totalBooking, setTotalBooking] = useState();
  const [rawData, setRawData] = useState();
  const [chartData, setChartData] = useState(initchartData);

  useEffect(() => {
    getListStores().then((response) => {
      setStores(response.data.data)
    })
  }, [])

  useEffect(() => {
    // console.log(data)
    revenue_store(data).then((res) => {
      let money = 0;
      let sumOrder = res.data.data.length;
      res.data.data.map((i) => {
        money = money + parseInt(i.money);
      })
      setRevenue(money);
      setTotalOrder(sumOrder);
    })
    revenue_by_day_store(data).then((res)=>{
      setRawData(res.data.data);
    })
    getListUsersMG(data).then((res) => {
      setEmployee(res.data.data.length);
    })
    getListBookings(data.store_id).then((res) => {
      setTotalBooking(res.data.data.length);
    })
  }, [data])

  useEffect(() => {
    console.log(rawData)
    console.log(chartData.series[0].data)
    let arr = [];
    let arrData = [];
    if (rawData) {
      rawData.map((i) => {
        arr.push(parseInt(i.money))
        arrData.push(i.created_at.slice(0, 10))
      })
    }
    let series = [{
      name: "Tổng tiền",
      data: arr,
    }]
    let options = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Bảng doanh thu theo ngày',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: arrData,
      }
    }
    setChartData({ ...chartData, series, options })
  }, [rawData])

  const onChangeDate = (dates, dateStrings) => {
    // if (dates) {
    //   console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    // } else {
    //   console.log('Clear');
    // }
    setData({ ...data, time_start: dateStrings[0], time_end: dateStrings[1] });
  };
  const onChangeStore = (value) => {
    // console.log(value)
    setData({ ...data, store_id: value })
  };

  return (
    <>
      <RangePicker
        defaultValue={[moment('2022-05-01', dateFormat), moment('2022-05-31', dateFormat)]}
        format={dateFormat}
        onChange={onChangeDate}
        allowClear={false}
      />
      {user.role_id == 1 ?
        <Select
          optionFilterProp="children"
          onChange={onChangeStore}
          style={{ width: '200px', marginLeft: '12px' }}
          defaultValue={0}
        >
          <Select.Option key="0" value={0}>Tất cả chi nhánh</Select.Option>
          {stores && stores.map((item) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
        : null}
      <Row gutter={16} style={{ marginTop: '12px' }}>
        <Col className="gutter-row" span={6}>
          <Card title="Doanh thu" style={{ textAlign: "center" }}>
            {`${revenue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card title="Tổng đơn hàng" style={{ textAlign: "center" }}>
            {totalOrder}
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card title="Tổng đơn đặt bàn" style={{ textAlign: "center" }}>
            {totalBooking}
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card title="Số lượng nhân viên" style={{ textAlign: "center" }}>
            {employee}
          </Card>
        </Col>
      </Row>

      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </>
  )
}

export default Dashboard