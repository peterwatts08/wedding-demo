import { Container, Row, Col, Image } from 'react-bootstrap';

export default function Content({ content, img }) {

  const Tile = ({ text, list }) => (
      <div>
         <div 
          className={`content-tile__container m-1 p-3 d-flex shadow-sm`} 
        >
          {
            !!text &&
            <div className="mx-auto text-center">
              {text}
            </div>
          }
          {
            !!list &&
            <ul className="mx-auto m-0">
              {
                list.map(x => <li key={x}>{x}</li>)
              }
            </ul>
          }
        </div>
      </div>
  )

  return (
    <Container fluid className="content__container">
      <Row xs={1} lg={2}>
        <Col>
          <Row className="d-flex pt-1 pb-3 px-1">
            <div className="mx-auto d-flex">
              <Image src={`/images/${img}`} className="content__barn-image mx-auto" fluid/>
            </div>
          </Row>
        </Col>
        <Col>
          <Row xs={1}>
            {
              content.map((x,i) => <Tile key={i} {...x}/>)
            }
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
