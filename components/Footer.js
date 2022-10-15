import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
		<Container fluid className="footer p-0 m-0">
			<Row className="px-4 d-flex pt-2">
				<Col className="footer-text">
					<a href="https://www.pswatts.co.uk" target="_blank">Site by Pete Watts Web Development</a>
				</Col>
			</Row>
		</Container>
	);
}