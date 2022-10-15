import { Container, Row, Col, Image } from 'react-bootstrap';

export default function HomeMenu({ components, setComponentIndex }) {

  const Tile = ({ src, componentIndex, title, noAnimation }) => (
    <Col>
      <div 
        className={`m-2 p-3 home__menu-container${noAnimation ? '--unanimate' : ''} d-flex shadow-sm`} 
        onClick={() => setComponentIndex(componentIndex)}
      >
        <div className="d-flex flex-column m-auto">
          <div className="mx-auto home__menu-header text-center">
            {title}
          </div>
          {
            !!src &&
            <div className="mx-auto home__image-container pt-2">
              <Image src={`/images/${src}.png`} style={{ width: '50px' }}/>
            </div>
          }
        </div>
      </div>
    </Col>
  )

  return (
    <Container className="pb-5">
        <Row xs={1} md={2}>
          { 
            components.map((component, index) => <Tile key={index} src={component.src} componentIndex={index} title={component.title} />)
          }
        </Row>
    </Container>
  )
}
