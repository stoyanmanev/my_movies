import React from "react";
import { Card, Col, Result, Row } from "antd";

interface Props {
    title: string,
    subTitle?: string,
    extra?: React.ReactNode
}

const ItemNotFound: React.FC<Props> = (props) => {
  return (
    <Row justify="center">
      <Col span={18}>
        <Card>
          <Result
            status="404"
            title={props.title}
            subTitle={props.subTitle}
            extra={props.extra}
          ></Result>
        </Card>
      </Col>
    </Row>
  );
};

export default ItemNotFound;
