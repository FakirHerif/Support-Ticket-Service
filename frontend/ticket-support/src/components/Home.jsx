import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Welcome to Look Forms</h1>
          <p className="text-center">An amazing platform to send and manage forms!</p>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjBzZjUwOTg1ZjJzZ3UzMXo5ajN4djk1aGEwYnIydTVmYmlyYXN6OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ur2JuIYmAyYWPJNsLN/giphy.gif"
            alt="GIF"
            className="img-fluid rounded mx-auto d-block my-4"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="text-center">
            <Link to="/basvuru-olustur" className="btn btn-primary mx-2">
              Create Form
            </Link>
            <Link to="/basvuru-sorgula" className="btn btn-info mx-2">
              Search Forms
            </Link>
          </div>
        </div>
      </div>
    </div>

/* 

https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGM3Z3Q0eDl0ODcwajR3YWgwMTd0eG5nZ2s0OG8yZjcxYXFyNHltYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vOaNtrszbnkNMfFTyD/giphy.gif 

https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2wzMXNsc20yMzN0OTlvcHpkZDE3M3JvdzdudjBjd2o5ZjhhdHk0ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Hazf7m4NTTqqqW4DbW/giphy.gif

*/

  );
};

export default Home
