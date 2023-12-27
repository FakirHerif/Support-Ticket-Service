import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const navigate = useNavigate(); 

    const handleSearch = async () => {
        
        try {
          const response = await axios.get('http://localhost:8080/api/informations');
          const information = response.data.data;
      
          let foundInformation = information.find(info => info.referenceID === searchTerm);

          if (foundInformation) {
            setSearchResult(foundInformation);
            console.log(foundInformation.referenceID)
            navigate(`/basvuru/${foundInformation.referenceID}`, { state: { searchResult: foundInformation } });
          } else {
            setSearchResult('No matching record found');
            console.log(foundInformation.referenceID)
            navigate(`/basvuru/${foundInformation.referenceID}`);
          }
        } catch (error) {
          console.error('Error occurred while searching:', error);
          setSearchResult('Error occurred while searching. Please try again.');
          navigate(`/basvuru/${searchTerm}`);
        }
      };

      return (
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter referenceID"
          />
          <button onClick={handleSearch}>Search</button>
           <div>
            {searchResult && (
              <div>
                <h3>Search Result:</h3>
                <p>ID: {searchResult.id}</p>
                <p>{searchResult.createdDate}</p>
              </div>
            )}
          </div> 
        </div>
      );
    };

export default FormSearch