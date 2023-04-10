import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import PropTypes from 'prop-types';

function Carousel({ pathName, meals, drinks }) {
  return (
    <Swiper
      slidesPerView={ 2 }
      spaceBetween={ 30 }
    >
      {
        pathName.includes('meals') ? (
          drinks.map((drink, index) => (
            <SwiperSlide key={ drink.idDrink }>
              <div
                data-testid={ `${index}-recommendation-card` }
                className="flex flex-col justify-center
                 items-center border border-gray-300 rounded-md"
              >
                <img
                  style={ { width: '300px' } }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  className="rounded-md"
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  {drink.strDrink}
                </p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          meals.map((meal, index) => (
            <SwiperSlide key={ meal.idMeal }>
              <div
                data-testid={ `${index}-recommendation-card` }
                className="flex flex-col justify-center
                 items-center border border-gray-300 rounded-md"
              >
                <img
                  style={ { width: '300px' } }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  className="rounded-md"
                />
                <p
                  className="text-center"
                  data-testid={ `${index}-recommendation-title` }
                >
                  {meal.strMeal}
                </p>
              </div>
            </SwiperSlide>
          ))
        )
      }
    </Swiper>
  );
}

Carousel.propTypes = {
  pathName: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
  })).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  })).isRequired,
};

export default Carousel;
