import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-3 homecomp">
      <div className="row">
      <div class="animation">
    <h2>Coding is
    <div class="scroller">
      <span>
        Cool<br/>
        Art<br/>
        Intruiging<br/>
        Challenging
      </span>
    </div>
  </h2>
</div>
        <div className="col-md-6 offset-md-3 offsetBody">
          <h1 className="text-center mb-4">Welcome to SendformS</h1>
          <hr style={{color: 'white'}} />
          <p className="text-center">An amazing platform to send and manage forms !</p>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjBzZjUwOTg1ZjJzZ3UzMXo5ajN4djk1aGEwYnIydTVmYmlyYXN6OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ur2JuIYmAyYWPJNsLN/giphy.gif"
            alt="GIF"
            className="img-fluid rounded mx-auto d-block my-4"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <br />
          <div className="text-center">
          <p className="text-center" style={{color:'white'}}>Get instant responses to the forms you submit !</p>
            <Link to="/basvuru-olustur" className="btn btn-warning mx-3" style={{fontWeight: 'bold'}}>
              Create Form
            </Link>
            <Link to="/basvuru-sorgula" className="btn btn-info mx-3" style={{fontWeight: 'bold'}}>
              Search Form
            </Link>
          </div>
        </div>
        <div className="ratings-container">
          <h2 className="text-center mb-4">See why SendForm is trusted by 20+ million users</h2>
          <div className="images-container">
            <img src="https://cdn.jotfor.ms/p/homepage/homepage_2021/assets/img-min/rating/g2-crowd.svg" alt="" />
            <img src="https://cdn.jotfor.ms/p/homepage/homepage_2021/assets/img-min/rating/software-advice.svg" alt="" />
            <img src="https://cdn.jotfor.ms/p/homepage/homepage_2021/assets/img-min/rating/product-hunt.svg" alt="" />
            <img src="https://cdn.jotfor.ms/p/homepage/homepage_2021/assets/img-min/rating/trustradius.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
