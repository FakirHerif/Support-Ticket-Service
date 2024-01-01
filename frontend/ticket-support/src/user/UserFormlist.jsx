import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserFormlist = () => {
    const [informations, setInformations] = useState([]);
    const navigate = useNavigate();
    const [filteredInformations, setFilteredInformations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { axios, user } = useAuth();
    const [viewType, setViewType] = useState('allForms');


    useEffect(() => {
        axios.get('/informations')
          .then((response) => {
            setInformations(response.data.data);
            setFilteredInformations(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [axios, user]);

      const redirectToDetailPage = (referenceID) => {
        navigate(`/basvuru/${referenceID}`);
      };
    
      const statusOptions = {
        '': 'All Status',
        'cevap bekliyor': 'Waiting',
        'çözüldü': 'Resolved',
        'iptal edildi': 'Cancelled'
      };
    
      const formatDate = (dateString) => {
        const [dayMonthYear, time] = dateString.split(' ');
        const [day, month, year] = dayMonthYear.split('.');
        const [hour, minute, second] = time.split(':');
        
        return new Date(year, month - 1, day, hour, minute, second);
      };
    
      useEffect(() => {
        let filteredData = [...informations];
      
        if (selectedStatus !== '') {
          filteredData = informations.filter(info => info.status === selectedStatus);
        }
      
        const sortedInformations = [...filteredData].sort((a, b) => {
          const dateA = formatDate(a.createdDate);
          const dateB = formatDate(b.createdDate);
          return dateB - dateA;
        });
      
        setFilteredInformations(sortedInformations);
      
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
            return 'Waiting';
          case 'çözüldü':
            return 'Resolved';
          case 'iptal edildi':
            return 'Cancelled';
          default:
            return '';
        }
      };

      const handleViewType = (type) => {
        setViewType(type);
      };
    
  return (
    <Container>
      <h1 className="informationListAdmin">Informations List</h1>
      <div className="d-flex" style={{marginBottom: '25px'}}>
        <Dropdown style={{marginRight: '10px'}}>
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
          {user && (
          <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {viewType === 'allForms' ? 'All Forms' : 'My Forms'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleViewType('allForms')}>All Forms</Dropdown.Item>
          <Dropdown.Item onClick={() => handleViewType('myForms')}>My Forms</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      )}
  </div>
          <Row xs={1} md={1} lg={3} className="g-5">
          {filteredInformations
          .filter((info) => (viewType === 'myForms' && user ? info.informationsOwner === user : true))
          .filter((info) => selectedStatus === '' || info.status === selectedStatus)
          .map((info, index) => (
              <Col key={index}>
                <div className="info-box">
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
                  <Card.Body style={{ fontFamily: 'Comfortaa, cursive'}}>
                  <div className="info-details">
                      <span style={{fontWeight: 'bold'}}>Title:</span> {info.title}
                      <hr />
                      <span style={{fontWeight: 'bold'}}>Reference ID:</span> {info.referenceID}
                      <hr />
                      <span style={{fontWeight: 'bold'}}>Created Date:</span> {info.createdDate}
                      <hr />
                      <div>
                      <Button style={{width: '100%'}} onClick={() => redirectToDetailPage(info.referenceID)}>
                        Go to Details
                      </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                </div>
              </Col>
            ))
            }
          </Row>
        </Container>
        
      );
    };

export default UserFormlist