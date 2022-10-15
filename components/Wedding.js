import { Container, Row, Col, Image } from 'react-bootstrap'

export default function Wedding() {

  return (
    <Container fluid className="content__container">
        <Row xs={1} lg={2}>
          <Col xs={12} lg={6}>
              <Row className="d-flex pt-3">
                <div className="mx-auto d-flex pt-3">
                  <Image src="/images/kew.jpeg" className="content__barn-image mx-auto shadow" fluid/>
                </div>
              </Row>
              <Row>
                <span className="content__heading pt-2">Wedding ceremony and reception venue</span>
              </Row>
          </Col>
          <Col xs={12} lg={6}>
              <Row className="h-100 d-flex">
                <div className="my-auto d-flex flex-column">
                  <h1 className="content__fancy-heading mx-auto py-3 m-0 text-center">Order of Events</h1>
                  <p className="text-center p-0 m-0"><em>Approximate timings</em></p>
                  <div>
                    <Row className="py-2 g-0 d-flex">
                      <Col className="my-auto content__table-text--bold">1:00pm</Col>
                      <Col className="content__table-text">Ceremony</Col>
                    </Row>
                    <Row className="py-2 g-0 d-flex">
                      <Col className="my-auto content__table-text--bold">2:00pm</Col>
                      <Col className="content__table-text">Canapés & Drinks</Col>
                    </Row>
                    <Row className="py-2 g-0 d-flex">
                      <Col className="my-auto content__table-text--bold">4:00pm</Col>
                      <Col className="content__table-text">Speeches</Col>
                    </Row>
                    <Row className="py-2 g-0 d-flex">
                      <Col className="my-auto content__table-text--bold">4:30pm</Col>
                      <Col className="content__table-text">BBQ</Col>
                    </Row>
                    <Row className="py-2 g-0 d-flex">
                      <Col className="my-auto content__table-text--bold">7:30pm</Col>
                      <Col className="content__table-text">Party Time</Col>
                    </Row>
                    <Row className="py-2 g-0 d-flex">
                      <Col className="my-auto content__table-text--bold">12:00am</Col>
                      <Col className="content__table-text">Home Time</Col>
                    </Row>
                  </div>
                </div>
              </Row>
          </Col>
        </Row>
        <Row xs={1}>
          <Col xs={12}>
              <Row>
                <span className="content__fancy-heading py-3">Key Information</span>
              </Row>
              <Row>
                <div className="content__list">
                  <ul>
                    <li className="py-1">Key information here</li>
                  </ul>
                </div>
              </Row>
          </Col>
        </Row>
        
    </Container>
  )
}