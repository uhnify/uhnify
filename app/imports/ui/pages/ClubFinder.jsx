import React from 'react';
import { Row, Container, Col, Button, Card, Image } from 'react-bootstrap';

const ClubFinder = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col className="text-center">
        <h2>Clubs</h2>
      </Col>
    </Row>
    <Row xs={1} md={2} lg={3} className="g-4">
      <Card className="h-100">
        <Card.Header>
          <Image width={100} src="https://upload.wikimedia.org/wikipedia/commons/f/f7/JaquesCookStaunton.jpg" />
          <Card.Title>Chess Club</Card.Title>
          <Card.Subtitle>8:00-9:00</Card.Subtitle>
          <Card.Subtitle>Classroom</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>We Play Chess</Card.Text>
          <Button>Add to My Clubs</Button>
        </Card.Body>
      </Card>
      <Card className="h-100">
        <Card.Header>
          <Image width={75} src="https://upload.wikimedia.org/wikipedia/commons/6/64/Football_signed_by_Gerald_R._Ford.jpg" />
          <Card.Title>Football Club</Card.Title>
          <Card.Subtitle>6:00-12:00pm</Card.Subtitle>
          <Card.Subtitle>Football Field</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>We Play Football</Card.Text>
          <Button>Add to My Clubs</Button>
        </Card.Body>
      </Card>
    </Row>
  </Container>
);

export default ClubFinder;
