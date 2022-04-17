import { Card, Col, Row } from 'antd'
import React from 'react'

const Login = () => {
  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
        <br/>
        <Card title="Login" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  )
}

export default Login