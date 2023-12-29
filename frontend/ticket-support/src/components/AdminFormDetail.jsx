import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';

const AdminFormDetail = () => {

  const navigate = useNavigate()
  const { referenceID } = useParams();
  const [infoDetails, setInfoDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({});
  const [responseText, setResponseText] = useState('');
  const { axios, user } = useAuth();

  useEffect(() => {
    axios.get(`/informations/referenceID/${referenceID}`)
      .then((response) => {


        if (!response.data.data.id || response.data.data.id === 0 || response.data.data.id === '') {
            console.log("error sayfa yok.")
            return;
          }

        setInfoDetails(response.data.data); // API'den gelen detayları state'e yerleştirin
        setFormData(response.data.data); // Form verilerini doldurun
        console.log("AXIOS: ******* :", axios)
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
  }, [referenceID, axios]);

  const handleEditClick = () => {
    setIsEditing(true); // Düzenleme modunu aktifleştir
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
        console.log('Information updated:', response.data);
        setInfoDetails(response.data); // Güncellenmiş verileri güncellemek için
        setIsEditing(false); // Düzenleme modunu kapat
        console.log(infoDetails.id)
      })
      .catch((error) => {
        console.error('Error updating information:', error);
      });
  };

  useEffect(() => {
    if (!isEditing) {
      axios.get(`/informations/referenceID/${referenceID}`)
        .then((response) => {
          setInfoDetails(response.data.data); // Güncellenmiş detayları state'e yerleştirin
        })
        .catch((error) => {
          console.error('Error fetching updated details:', error);
        });
    }
  }, [isEditing, referenceID, axios]);

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Emin misiniz?');
  
    if (confirmDelete) {
      axios.delete(`/informations/${infoDetails.id}`, {
        data: {},
      })
        .then((response) => {
          console.log('Information deleted:', response.data);
          console.log(infoDetails.id);
          navigate(`/admin/basvuru-listesi/`)
          toast.success('Silme İşlemi Başarılı!', { autoClose: 3000 })
        })
        .catch((error) => {
          console.error('Error deleting information:', error);
          console.log(infoDetails.id);
          console.log(error.response.data);
          toast.error('Bir Hata Oluştu!', { autoClose: 3000 })
        });
    }
  };




  const handleResponseSubmit = (e) => {
    e.preventDefault();
  
    if (responseText.trim() === '') {
      toast.error('Lütfen bir cevap yazın!');
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
        console.log("cevap:", data.responseText)
        toast.success('Yorum başarıyla gönderildi!', { autoClose: 3000 });

       console.log("DATE::::", response.data.replyDate,)

        setInfoDetails((prevDetails) => ({
          ...prevDetails,
          response: prevDetails.response
            ? [...prevDetails.response, data] // Append new response
            : [data], // Create a new array with the response if no responses exist
        }));
        console.log("DENEME.",data)

        setResponseText('');
      })
      .catch((error) => {
        console.error('Error sending response:', error);
        toast.error('Yorum gönderilirken bir hata oluştu!', { autoClose: 3000 });
        console.log(error.response.data);
      });
  };



  return (
    <div>
      <div className='detaylar'>
        <h2>AdminFormDetail</h2><br />
        {/* Eğer düzenleme modundaysa düzenleme formu göster */}
        {isEditing ? (
  <Form onSubmit={handleSubmit}>

            <Form.Group controlId='firstName'>
              <Form.Label>İsim:</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Soyisim:</Form.Label>
              <Form.Control
              type='text' 
              name='lastName' 
              value={formData.lastName} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='age'>
              <Form.Label>Yaş</Form.Label>
              <Form.Control
              type='number' 
              name='age'
              value={formData.age} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='identificationNo'>
              <Form.Label>TC Kimlik No:</Form.Label>
              <Form.Control
              type='number' 
              name='identificationNo'
              value={formData.identificationNo} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Adres:</Form.Label>
              <Form.Control
              type='text' 
              name='address' 
              value={formData.address} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>İl:</Form.Label>
              <Form.Control
              type='text' 
              name='city' 
              value={formData.city} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='town'>
              <Form.Label>İlçe:</Form.Label>
              <Form.Control
              type='text' 
              name='town' 
              value={formData.town} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Tel No:</Form.Label>
              <Form.Control
              type='text' 
              name='phone' 
              value={formData.phone} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='title'>
              <Form.Label>Şikayet Başlığı:</Form.Label>
              <Form.Control
              type='text' 
              name='title' 
              value={formData.title} 
              onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Şikayet Detayı:</Form.Label>
              <Form.Control
              type='text' 
              name='content' 
              value={formData.content} 
              onChange={handleInputChange} 
              />
            </Form.Group>


            <Form.Group controlId='status'>
              <Form.Label>Şikayet Durumu:</Form.Label>
              <Form.Control
                as='select'
                name='status'
                value={formData.status}
                onChange={handleStatusChange}
              >
                <option value=''>Seçiniz</option>
                <option value='çözüldü'>Çözüldü</option>
                <option value='iptal edildi'>İptal Edildi</option>
                <option value='cevap bekliyor'>Cevap Bekliyor</option>
              </Form.Control>
            </Form.Group>



        <Button variant='primary' type='submit'>Güncelle</Button>
  </Form>
        ) : (
          // Düzenleme modunda değilse mevcut bilgileri göster ve düzenleme butonunu göster
          <>
            <div>
              Reference ID: {infoDetails.referenceID}<br />
              First Name: {infoDetails.firstName}<br />
              Last Name: {infoDetails.lastName}<br />
              Age: {infoDetails.age}<br />
              IdenrificationNo: {infoDetails.identificationNo}<br />
              Address: {infoDetails.address}<br />
              City: {infoDetails.city}<br />
              Town: {infoDetails.town}<br />
              Phone: {infoDetails.phone}<br />
              Title: {infoDetails.title}<br />
              Content: {infoDetails.content}<br />
              Status: {infoDetails.status}<br />
              Informations Owner: {infoDetails.informationsOwner}<br />
              Created Date: {infoDetails.createdDate}<br />
              Attachments: {infoDetails.attachments}<br />
            </div>
            <Button variant='info' onClick={handleEditClick}>Düzenle</Button>
            <Button variant='danger' onClick={handleDeleteClick}>Sil</Button>
          </>
        )}
      </div>

      <h3>Response:</h3>
      <ul>
        {infoDetails.response && infoDetails.response.map((res, index) => (
          <li key={index}>
            <strong>Response Text:</strong> {res.responseText}<br />
            <strong>Reply Date:</strong> {res.replyDate}<br />
            <strong>Response Owner:</strong> {res.responseOwner}
          </li>
        ))}
      </ul>


          <div>
      <h3>Yorum Yap</h3>
      <Form onSubmit={handleResponseSubmit}>
        <Form.Group controlId='responseText'>
          <Form.Label>Yorum:</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Gönder
        </Button>
      </Form>
    </div>

    </div>
  );
};

export default AdminFormDetail
