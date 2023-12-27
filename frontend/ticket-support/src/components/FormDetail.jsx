import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormDetail = () => {

    const { referenceID } = useParams();
    const [detailInfo, setDetailInfo] = useState(null);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchDetailInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/informations/referenceID/${referenceID}`);
                setDetailInfo(response.data.data);
                console.log(response.data)
                if (response.data.data.id === 0) {
                    setError('404 - Record not found');
                    setDetailInfo(null);
                };
            } catch (error) {
                console.error('Error fetching detail information:', error);
                console.log(error.response.data)
        };
    };

        fetchDetailInfo();
    }, [referenceID]);
    

    
    return (
        <div>
            <h2>Basvuru Sayfasi</h2>
            {error && <p>{error}</p>}
            {detailInfo && (
                <div>
                    <p>ID: {detailInfo.id}</p>
                    <p>First Name: {detailInfo.firstName}</p>
                    <p>Last Name: {detailInfo.lastName}</p> 
                    <p>ReferenceID: {referenceID}</p>
                </div>
            )}
        </div>
    );
};

export default FormDetail