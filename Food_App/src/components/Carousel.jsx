import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Carousel.css";

function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide imgs" data-bs-ride="carousel" data-bs-interval="2000">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/022/994/042/small_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg"
            height="340px"
            className="d-block w-100"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684.jpg"
            height="340px"
            className="d-block w-100"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://www.coca-cola.com/content/dam/onexp/global/central/offerings/coke-meals-vipizza/hero_vipizza_desktop.png"
            height="340px"
            className="d-block w-100"
            alt="Third slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/premium-photo/food-pizza-hd-8k-wallpaper-stock-photographic-image_890746-115884.jpg"
            height="340px"
            className="d-block w-100"
            alt="Fourth slide"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
