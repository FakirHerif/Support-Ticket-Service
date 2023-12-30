import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import '../components/basicstyle/form.css';
import '../components/basicstyle/comments.css';
import NotFound from './NotFound';

const FormDetail = () => {

  const { referenceID } = useParams();
  const [infoDetails, setInfoDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({});
  const [responseText, setResponseText] = useState('');
  const { axios, user } = useAuth();
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    axios.get(`/informations/referenceID/${referenceID}`)
      .then((response) => {
        if (!response.data.data.id || response.data.data.id === 0 || response.data.data.id === '') {
          setShowNotFound(true);
          }
        setInfoDetails(response.data.data);
        setFormData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
        setShowNotFound(true);
      });
  }, [referenceID, axios]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/informations/${infoDetails.id}`, formData)
      .then((response) => {
        setInfoDetails(response.data);
        setIsEditing(false); 
        toast.success('Changes saved successfully!')
      })
      .catch((error) => {
        console.error('Error updating information:', error);
        toast.error('Changes could not be applied!')
      });
  };

  useEffect(() => {
    if (!isEditing) {
      axios.get(`/informations/referenceID/${referenceID}`)
        .then((response) => {
          setInfoDetails(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching updated details:', error);
        });
    }
  }, [isEditing, referenceID, axios]);

  const handleResponseSubmit = (e) => {
    e.preventDefault();
  
    if (responseText.trim() === '') {
      toast.error('Please write a comment!');
      return;
    }
  
    const data =
        {
          informationsId: infoDetails.id,
          responseText: responseText,
          responseOwner: user,
          replyDate: new Date().toLocaleString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        };

    axios.post(`/response`, data, {
        })
          .then((response) => {
            console.log('Response sent:', response.data);
            toast.success('Comment sent successfully!', { autoClose: 3000 });
            setInfoDetails((prevDetails) => ({
              ...prevDetails,
              response: prevDetails.response
                ? [...prevDetails.response, data] // Append new response
                : [data], // Create a new array with the response if no responses exist
            }));
    
            setResponseText('');
          })
          .catch((error) => {
            console.error('Error sending response:', error);
            toast.error('An error occurred while submitting the comment!', { autoClose: 3000 });
          });
      };
    
      const handleCancel = () => {
        setIsEditing(false); 
        toast.info('Changes are canceled!', { autoClose: 3000 });
      };  
        
        return (
            <div>
              {!showNotFound && (
              <div className='sendform'>
                <div className='formsend'>
                  <span>Form Details</span>
                  <hr />
                  {isEditing ? (
                  <Form onSubmit={handleSubmit}>
                    <div className="grid-container">
                      <div className="grid-item-name">
                        <div className='statement'> 💬 First Name</div>
                        <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="💬 Enter Firstname"
                        className="form-control inp_text"
                        disabled
                        />
                      </div>
                      <div className="grid-item-lastname">
                      <div className='statement'>💬 Last Name</div>
                        <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName} 
                        placeholder="💬 Enter Lastname"
                        className="form-control inp_text"
                        disabled
                        />
                      </div>
                    </div>
        
                    <div className="grid-containerTwo">
                      <div className="grid-item-identification">
                      <div className='statement'>📝 Identification No</div>
                        <input
                        type="number"
                        id="identificationNo"
                        name="identificationNo"
                        value={formData.identificationNo} 
                        placeholder="📝 Enter Identity No"
                        className="form-control inp_number"
                        disabled
                        />
                      </div>
                      <div className="grid-item-age">
                      <div className='statement'>📆 Age</div>
                        <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age} 
                        placeholder="📆 Enter Age"
                        className="form-control inp_number"
                        disabled
                        />
                      </div>
                    </div>
                    <div className='statement'>💒 Address</div>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address} 
                        placeholder="💒 Enter Address"
                        className="form-control inp_text"
                        disabled
                      />
                      
                      <div className="grid-container">
                        <div className="grid-item-city">
                        <div className='statement'>🏴 City</div>
                          <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city} 
                          placeholder="🏴 Enter City"
                          className="form-control inp_text"
                          disabled
                          />
                        </div>
                        <div className="grid-item-town">
                        <div className='statement'>🏲 Town</div>
                          <input
                          type="text"
                          id="town"
                          name="town"
                          value={formData.town} 
                          placeholder="🏲 Enter Town"
                          className="form-control inp_text"
                          disabled
                          />
                        </div>
                      </div>  
        
                      <div className='statement'>📞 Phone Number</div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone} 
                        placeholder="📞 Enter Phone Number"
                        className="form-control inp_text"
                        disabled
                      />
        
                      <div className='statement'>📌 Form Title</div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title} 
                        placeholder="📌 Enter Form Title"
                        className="form-control inp_text"
                        disabled
                      />
        
                      <div className='statement'>💭 Form Content</div>
                      <textarea
                        type='text'
                        id="content"
                        name="content"
                        value={formData.content} 
                        placeholder="💭 Enter Form Content"
                        className="form-control inp_text"
                        disabled
                      ></textarea>
        
                    <div className='statement'>❓ Status</div>
                    <Form.Group controlId='status'>
                      <Form.Control
                        as='select'
                        name='status'
                        value={formData.status}
                        onChange={handleStatusChange}
                        className="selectStatus"
                      >
                        <option value='çözüldü'>Resolved</option>
                        <option value='iptal edildi'>Cancelled</option>
                        <option value='cevap bekliyor'>Waiting</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant='success' type='submit'>Save</Button>
                    <Button variant='warning' style={{marginTop: '10px'}} onClick={handleCancel}>Cancel</Button>
                  </Form>
                  
                  ) : (
                  <>
                    <div>
                    {user && (
                        <>
                      <div className="grid-container">
                        <div className="grid-item-name">
                          <div className='statement'>
                            💬 First Name
                          </div>
                          <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={infoDetails.firstName}
                          className="form-control inp_text"
                          disabled 
                          />
                        </div>
                        <div className="grid-item-lastname">
                          <div className='statement'>
                            💬 Last Name
                          </div>
                          <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={infoDetails.lastName} 
                          className="form-control inp_text"
                          disabled 
                          />
                        </div>
                      </div>
        
                      <div className="grid-containerTwo">
                        <div className="grid-item-identification">
                          <div className='statement'>
                            📝 Identification No
                          </div>
                          <input
                          type="number"
                          id="identificationNo"
                          name="identificationNo"
                          value={infoDetails.identificationNo} 
                          className="form-control inp_number"
                          disabled 
                          />
                        </div>
                        <div className="grid-item-age">
                          <div className='statement'>
                            📆 Age
                          </div>
                          <input
                          type="number"
                          id="age"
                          name="age"
                          value={infoDetails.age} 
                          className="form-control inp_number"
                          disabled 
                          />
                        </div>
                      </div>
                              
                          <div className='statement'>
                            💒 Address
                          </div>
                          <input
                          type="text"
                          id="address"
                          name="address"
                          value={infoDetails.address} 
                          className="form-control inp_text"
                          disabled
                          />
                      
                    <div className="grid-container">
                      <div className="grid-item-city">
                        <div className='statement'>
                          🏴 City
                        </div>
                          <input
                          type="text"
                          id="city"
                          name="city"
                          value={infoDetails.city} 
                          className="form-control inp_text"
                          disabled
                          />
                        </div>
                        <div className="grid-item-town">
                        <div className='statement'>
                          🏲 Town
                        </div>
                          <input
                          type="text"
                          id="town"
                          name="town"
                          value={infoDetails.town} 
                          className="form-control inp_text"
                          disabled
                          />
                        </div>
                      </div>  
        
                      <div className='statement'>
                        📞 Phone Number
                      </div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={infoDetails.phone} 
                        className="form-control inp_text"
                        disabled
                      />
                    </>
                    )}
                      
                      <div className='statement'>
                        📌 Form Title
                      </div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={infoDetails.title} 
                        className="form-control inp_text"
                        disabled
                      />

                      <div className='statement'>
                        💭 Form Content
                      </div>
                      <textarea
                        type='text'
                        id="content"
                        name="content"
                        value={infoDetails.content} 
                        className="form-control inp_text"
                        disabled
                      >
                      </textarea>
        
                      <div className="grid-containerTwo">
                        <div className="grid-item-referenceID">
                          <div className='statement'>
                            🎫 Reference ID
                          </div>
                            <input
                            type="text"
                            id="title"
                            name="title"
                            value={infoDetails.referenceID} 
                            className="form-control inp_text"
                            disabled
                            />
                        </div>
        
                        <div className="grid-item-status">
                          <div className='statement'>
                            ❓ Status
                          </div>
                          <input
                          type="text"
                          id="title"
                          name="title"
                          value={infoDetails.status} 
                          className="form-control inp_text"
                          disabled
                          />
                      </div>
                    </div>
        
                    <div className="grid-container">
                      <div className="grid-item-username">
                        <div className='statement'>
                          👥 Username
                        </div>
                        <input
                        type="text"
                        id="title"
                        name="title"
                        value={infoDetails.informationsOwner || 'guest'} 
                        className="form-control inp_text"
                        disabled
                        />
                      </div>
                      
                      <div className="grid-item-createdDate">
                        <div className='statement'>
                          ⌚ Created Date
                        </div>
                        <input
                        type="text"
                        id="title"
                        name="title"
                        value={infoDetails.createdDate} 
                        className="form-control inp_text"
                        disabled
                        />
                      </div>
                    </div>
                  </div>

                {!isEditing && (
                  <div>
                    {user === infoDetails.informationsOwner && user && ( 
                    <Button variant='info' onClick={handleEditClick}>Edit</Button>
                    )}
                    </div>
                )}
                  </>
                  )}  
                </div>
        
            {!isEditing && (
              <div>
                {user && ( 
                    <div>
                <h3 style={{color: 'white', fontWeight: 'bold'}}>Send Comment</h3>
                <Form onSubmit={handleResponseSubmit}>
                  <Form.Group controlId='responseText'>
                    <Form.Control
                      as='textarea'
                      placeholder='Write your comment...'
                      rows={4}
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      style={{marginBottom: '15px'}}
                    />
                  </Form.Group>
                  <div style={{textAlign: 'right' }}>
                    <Button variant='success' type='submit'>
                      Send
                    </Button>
                  </div>
                </Form>
                </div>
                )}

                {!user && (
                <p style={{ color: 'white' }}>
                    To comment, please 
                    <Link to="/login" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px', fontSize:'20px'}}>
                    Login
                    </Link>
                </p>
                )}
  
              <div className='comments'>
                <h3>Comments</h3>
                  <ul>
                    {infoDetails.response && infoDetails.response.map((res, index) => (
                    <li key={index}>
                      <div className='commentsText'>
                        <strong>Response Text:</strong> {res.responseText}<br />
                      </div>
                      <div className='commentsDateOwner'>
                        <div><strong>Owner:</strong> {res.responseOwner}</div>
                        <div><strong style={{ marginTop: '5px' }}>Date:</strong> {res.replyDate}</div>
                      </div>
                      </li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}
              </div>
               )}
               {showNotFound && <NotFound />} {/* Here is controlled to show the notfound component */}
            </div>
          );
        };

export default FormDetail
