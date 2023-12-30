import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NotFound from './NotFound';
import DownloadBase64Data from './DownloadBase64Data';

const FormDetail = () => {
    const { referenceID } = useParams();
    const [detailInfo, setDetailInfo] = useState(null);
    const [error, setError] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const { axios } = useAuth();
    const [showNotFound, setShowNotFound] = useState(false);

    useEffect(() => {
        const fetchDetailInfo = async () => {
            try {
                const response = await axios.get(`/informations/referenceID/${referenceID}`);
                setDetailInfo(response.data.data);
                if (response.data.data.id === 0) {
                    setDetailInfo(null);
                    setShowNotFound(true);
                }
            } catch (error) {
                console.error('Error fetching detail information:', error);
                setError('Error fetching detail information');
                setShowNotFound(true);
            }
        };

        fetchDetailInfo();
    }, [referenceID, axios]);

    useEffect(() => {
        if (detailInfo && detailInfo.attachments) {
            const base64Data = detailInfo.attachments;
            const imageUrl = `data:image/jpeg;base64,${base64Data}`; // for PNG, JPG, JPEG files
            setFileUrl(imageUrl);
        }
    }, [detailInfo]);

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

    return (
        <div>
        <h2>Form Result</h2>
        {error && <p>{error}</p>}
        {!showNotFound && detailInfo && (
            <div>
                <p>ID: {detailInfo.id}</p>
                <p>First Name: {detailInfo.firstName}</p>
                <p>Last Name: {detailInfo.lastName}</p>
                <p>ReferenceID: {referenceID}</p>
                {fileUrl && (
                    <div>
                        <button onClick={handleDownload}>Download File</button>
                    </div>
                )}
            </div>
        )}
        {showNotFound && <NotFound />} {/* Here is controlled to show the notfound component */}
    </div>
);
};

export default FormDetail
