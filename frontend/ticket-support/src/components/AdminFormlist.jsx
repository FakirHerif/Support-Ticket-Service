import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminFormlist = () => {
  const [informations, setInformations] = useState([]);
  const navigate = useNavigate();

  const [filteredInformations, setFilteredInformations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/informations')
      .then((response) => {
        setInformations(response.data.data);
        setFilteredInformations(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const redirectToDetailPage = (referenceID) => {
    navigate(`/admin/basvuru/${referenceID}`);
  };

  const statusOptions = {
    '': 'Tümü',
    'cevap bekliyor': 'Cevap Bekliyor',
    'çözüldü': 'Çözüldü',
    'iptal edildi': 'İptal Edildi'
  };

  useEffect(() => {
    if (selectedStatus === '') {
      setFilteredInformations(informations);
    } else {
      const filteredData = informations.filter(info => info.status === selectedStatus);
      setFilteredInformations(filteredData);
    }
  }, [selectedStatus, informations]);

  const handleFilter = (status) => {
    setSelectedStatus(status);
  };


  const getStatusRibbonColor = (status) => {
    switch (status) {
      case 'cevap bekliyor':
        return 'bg-warning';
      case 'çözüldü':
        return 'bg-success';
      case 'iptal edildi':
        return 'bg-danger';
      default:
        return '';
    }
  };
  
  const getStatusRibbonText = (status) => {
    switch (status) {
      case 'cevap bekliyor':
        return 'Bekliyor';
      case 'çözüldü':
        return 'Çözüldü';
      case 'iptal edildi':
        return 'İptal Edildi';
      default:
        return '';
    }
  };

  return (
    <Container>
      <h1 className="navbar-title">Informations List</h1>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {statusOptions[selectedStatus] || statusOptions['']}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(statusOptions).map((status, index) => (
            <Dropdown.Item key={index} onClick={() => handleFilter(status)}>
              {statusOptions[status]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <Row xs={1} md={1} lg={3} className="g-5">
        {filteredInformations.map((info, index) => (
          <Col key={index}>
            <Card>
            <span
                className={`position-absolute top-0 end-0 p-1 ${getStatusRibbonColor(info.status)}`}
                style={{
                  borderRadius: '0 0.4rem 0 0.4rem',
                  transform: 'rotate(45deg)',
                  zIndex: '1',
                  marginTop: '15px',
                  marginRight: '-30px',
                  width: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontFamily: 'Comfortaa, cursive'
                }}
              >
                {getStatusRibbonText(info.status)}
              </span>
              <Card.Body>
                <Card.Title>Başvuran: {info.firstName} {info.lastName}</Card.Title>
                <Card.Text>
                  Age: {info.age}<br />
                  IdenrificationNo: {info.identificationNo}<br />
                  Address: {info.address}<br />
                  City: {info.city} Town: {info.town}<br />
                  Phone: {info.phone}<br />
                  Title: {info.title}<br />
                  Content: {info.content}<br />
                  Reference ID: {info.referenceID}<br />
                  Status: {info.status}<br />
                  Informations Owner: {info.informationsOwner}<br />
                  Created Date: {info.createdDate}<br />
                  <br />
                  <Button onClick={() => redirectToDetailPage(info.referenceID)}>
                    Go to Details
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminFormlist
