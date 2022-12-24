import { Row, Col } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import SearchBar from "../search/SearchBar";
import AvatarUI from "../UI/AvatarUI";

const TheHeader: React.FC = () => {
  return (
    <Header>
      <Row gutter={26} justify="space-between">
        <Col span={9}>
          <SearchBar />
        </Col>
        <Col span={2}>
          <AvatarUI flexType="flex-end" />
        </Col>
      </Row>
    </Header>
  );
};

export default TheHeader;
