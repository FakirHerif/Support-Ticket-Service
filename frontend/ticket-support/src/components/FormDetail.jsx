import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const getFileExtensionFromBase64 = (base64Data) => {
    const base64String = atob(base64Data.split(',')[1]);
    const uintArray = new Uint8Array(base64String.length);
    for (let i = 0; i < base64String.length; i++) {
        uintArray[i] = base64String.charCodeAt(i);
    }
    const fileType = (() => {
        // Belirli dosya türlerinin ilk birkaç baytını kontrol et
        const uintArrayLength = uintArray.length;
        if (uintArrayLength < 2) return '';
        const byte1 = uintArray[0];
        const byte2 = uintArray[1];
        switch (true) {
            case byte1 === 0xFF && byte2 === 0xD8: // JPEG
                return 'jpg';
            case byte1 === 0x89 && byte2 === 0x50: // PNG
                return 'png';
            case byte1 === 0x25 && byte2 === 0x50: // PDF
                return 'pdf';
            default:
                return '';
        }
    })();
    return fileType;
};

const FormDetail = () => {
    const { referenceID } = useParams();
    const [detailInfo, setDetailInfo] = useState(null);
    const [error, setError] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        const fetchDetailInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/informations/referenceID/${referenceID}`);
                setDetailInfo(response.data.data);
                if (response.data.data.id === 0) {
                    setError('404 - Record not found');
                    setDetailInfo(null);
                }
            } catch (error) {
                console.error('Error fetching detail information:', error);
                setError('Error fetching detail information');
            }
        };

        fetchDetailInfo();
    }, [referenceID]);

    useEffect(() => {
        if (detailInfo && detailInfo.attachments) {
            const base64Data = detailInfo.attachments;
            const imageUrl = `data:image/jpeg;base64,${base64Data}`; // PNG, JPG, JPEG dosyaları için
            setFileUrl(imageUrl);
        }
    }, [detailInfo]);

    const handleDownload = () => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
    
            // Dosya uzantısını belirle
            const fileExtension = getFileExtensionFromBase64(fileUrl);
    
            // Dosya adını belirle ve download attribute'ünü ayarla
            const fileName = `download.${fileExtension}`;
            link.setAttribute('download', fileName);
            link.click();
        }
    };

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
                    {fileUrl && (
                        <div>
                            <button onClick={handleDownload}>Download File</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormDetail;
