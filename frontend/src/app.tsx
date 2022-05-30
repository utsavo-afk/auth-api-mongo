import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
	return (
		<Container fluid>
			<Row className="vh-100 bg-primary align-items-center">
				<Col>
					<p className="h1 text-center text-warning">
						🧙‍♂️vite-react-eslint-eslint-ts-redux-bootstrap🥷
					</p>
					<p className="text-center text-danger">Modify App.tsx to get started</p>
				</Col>
			</Row>
		</Container>
	);
};

export default App;
