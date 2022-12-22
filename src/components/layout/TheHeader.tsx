import { Row, Col } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import SearchBar from '../search/SearchBar'

const TheHeader = () => {
  return (
    <Header>
        <Row gutter={26}>
            <Col span={6}>
                <SearchBar />
            </Col>
        </Row>
    </Header>
  )
}

export default TheHeader