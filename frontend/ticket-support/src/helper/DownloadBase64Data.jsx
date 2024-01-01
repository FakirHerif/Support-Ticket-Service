
const DownloadBase64Data = (base64Data) => {
    const base64String = atob(base64Data.split(',')[1]);
    const uintArray = new Uint8Array(base64String.length);
        
    for (let i = 0; i < base64String.length; i++) {
        uintArray[i] = base64String.charCodeAt(i);
    }
        
    const fileType = (() => {
    // Check the first few of the specific file types
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

export default DownloadBase64Data