import React from "react";
import { Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserData } from "../../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd, faRadiationAlt, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import "./home.css"; 

const Home = () => { 
  const dispatch = useDispatch();
  let history = useHistory();
  const handleClick = (user, selectedlayout) => {
    dispatch(setUserData({role: user, layout: selectedlayout}));
    history.push('/Layouts');
  }
    return (
      <Container className="cockpit-ui-container">
        <Row>
        <Col className="mx-auto">
          <h1 className="text-center text-white mb-5">Cockpit</h1>
            <Card className="cockpit-ui-card bg-dark" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title className="text-center mb-4 text-white">Select a User</Card.Title>
                <button type="button" className="col-lg-12 mb-2 p-1 pl-4 pr-4 btn btn-success btn-arrow-right" onClick={() => handleClick("Attending Physician", "A1")}><FontAwesomeIcon icon={faUserMd}/><span className="pl-2">Attending Physician</span></button>
                <button type="button" className="col-lg-12 mb-2 p-1 pl-4 pr-4 btn btn-success btn-arrow-right" onClick={() => handleClick("Radiologist", "R1")}><FontAwesomeIcon icon={faRadiationAlt}/><span className="pl-2">Radiologist</span></button>
                <button type="button" className="col-lg-12 p-1 pl-4 pr-4 btn btn-success btn-arrow-right" onClick={() => handleClick("Cardiologist", "C1")}><FontAwesomeIcon icon={faFileMedicalAlt}/><span className="pl-2">Cardiologist</span></button>
              </Card.Body>
            </Card>    
        </Col>       
        </Row>
      </Container>
    );
}

export default Home;