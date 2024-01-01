import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../style/form.css';
import '../style/comments.css';
import DownloadBase64Data from '../helper/DownloadBase64Data';
import NotFound from '../layouts/NotFound';

const AdminFormDetail = () => {

  const navigate = useNavigate()
  const { referenceID } = useParams();
  const [infoDetails, setInfoDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({});
  const [responseText, setResponseText] = useState('');
  const { axios, user } = useAuth();
  const [fileUrl, setFileUrl] = useState('');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'age' || name === 'identificationNo' ? parseInt(value) : value;

    setFormData({ ...formData, [name]: newValue });
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

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure?');
  
    if (confirmDelete) {
      axios.delete(`/informations/${infoDetails.id}`, {
        data: {},
      })
        .then((response) => {
          console.log('Information deleted:', response.data);
          navigate(`/admin/basvuru-listesi/`)
          toast.success('Deletion Successful!', { autoClose: 3000 })
        })
        .catch((error) => {
          console.error('Error deleting information:', error);
          toast.error('Delete Failed!', { autoClose: 3000 })
        });
    }
  };

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

  useEffect(() => {
    if (infoDetails && infoDetails.attachments) {
        const base64Data = infoDetails.attachments;
        const imageUrl = `data:image/jpeg;base64,${base64Data}`; // for PNG, JPG, JPEG files
        setFileUrl(imageUrl);
    }
}, [infoDetails]);

const handleDownload = () => {
    if (fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;

        // Set the file extension
        const fileExtension = DownloadBase64Data(fileUrl);

        // Set File Name and Set Download Attribute
        const fileName = `download.${fileExtension}`;
        link.setAttribute('download', fileName);
        link.click();
    }
};

const handleDeleteResponse = (responseID) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
  console.log("Seçilen yorumun ID'si:", responseID); 
  if (confirmDelete) {
    axios.delete(`/response/${responseID}`)
      .then((response) => {
        console.log(response)
        const updatedDetails = {
          ...infoDetails,
          response: infoDetails.response.filter((res) => res.id !== responseID)
        };
        setInfoDetails(updatedDetails);
        toast.success('Comment deleted successfully!', { autoClose: 3000 });
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
        toast.error('Failed to delete comment!', { autoClose: 3000 });
      });
  }
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
                onChange={handleInputChange}
                placeholder="💬 Enter Firstname"
                className="form-control inp_text"
                />
              </div>
              <div className="grid-item-lastname">
              <div className='statement'>💬 Last Name</div>
                <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName} 
                onChange={handleInputChange}
                placeholder="💬 Enter Lastname"
                className="form-control inp_text"
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
                onChange={handleInputChange} 
                placeholder="📝 Enter Identity No"
                className="form-control inp_number"
                />
              </div>
              <div className="grid-item-age">
              <div className='statement'>📆 Age</div>
                <input
                type="number"
                id="age"
                name="age"
                value={formData.age} 
                onChange={handleInputChange}
                placeholder="📆 Enter Age"
                className="form-control inp_number"
                />
              </div>
            </div>
            <div className='statement'>💒 Address</div>
            <input
                type="text"
                id="address"
                name="address"
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="💒 Enter Address"
                className="form-control inp_text"
              />
              
              <div className="grid-container">
                <div className="grid-item-city">
                <div className='statement'>🏴 City</div>
                  <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city} 
                  onChange={handleInputChange} 
                  placeholder="🏴 Enter City"
                  className="form-control inp_text"
                  />
                </div>
                <div className="grid-item-town">
                <div className='statement'>🏲 Town</div>
                  <input
                  type="text"
                  id="town"
                  name="town"
                  value={formData.town} 
                  onChange={handleInputChange} 
                  placeholder="🏲 Enter Town"
                  className="form-control inp_text"
                  />
                </div>
              </div>  

              <div className='statement'>📞 Phone Number</div>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone} 
                onChange={handleInputChange}
                placeholder="📞 Enter Phone Number"
                className="form-control inp_text"
              />

              <div className='statement'>📌 Form Title</div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title} 
                onChange={handleInputChange}
                placeholder="📌 Enter Form Title"
                className="form-control inp_text"
              />

              <div className='statement'>💭 Form Content</div>
              <textarea
                type='text'
                id="content"
                name="content"
                value={formData.content} 
                onChange={handleInputChange} 
                placeholder="💭 Enter Form Content"
                className="form-control inp_text"
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange} 
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange} 
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
                  onChange={handleInputChange} 
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
                  onChange={handleInputChange} 
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
                onChange={handleInputChange}
                className="form-control inp_text"
                disabled
              />

              <div className='statement'>
                📌 Form Title
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={infoDetails.title} 
                onChange={handleInputChange}
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
                onChange={handleInputChange} 
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="form-control inp_text"
                disabled
                />
              </div>
            </div>
              
            <div className='statement'>
              📁 Attachments
            </div>
              {fileUrl && (
                <div>
                  <Button variant='dark' onClick={handleDownload}>Download File</Button>
                </div>
              )}
            <hr />
          </div>
            <Button variant='info' onClick={handleEditClick}>Edit</Button>
            <Button variant='danger' style={{ marginTop: '10px'}} onClick={handleDeleteClick}>Delete</Button>
          </>
          )}  
        </div>

    {!isEditing && (
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
                <hr />
                <div style={{textAlign: 'right'}}>
                  <Button variant='danger' onClick={() => handleDeleteResponse(res.id)}>
                    Delete
                  </Button>
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

export default AdminFormDetail
