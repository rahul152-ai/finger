import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Working = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4 className="card-title">Working on it</h4>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Working;
