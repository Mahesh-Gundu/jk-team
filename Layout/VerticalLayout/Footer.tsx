import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid ={true}>
          <Row>
          <Col sm={6}>
              {/* <div className="text-sm-start d-none d-sm-block">
                Crafted with <i className="mdi mdi-heart text-danger"></i> by
                CentoTech
              </div> */}
            </Col>
            
            <Col sm={6} className="text-sm-end d-none d-sm-block">{new Date().getFullYear()} © Flexista</Col>
          
          </Row>
        </Container>
      </footer>
    </React.Fragment>

  );
}

export default Footer;