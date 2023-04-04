// import React, { useState } from 'react';

// function Carousel({ sugestions }) {
//   const [currentCard, setCurrentCard] = useState(0);
//   const handleNextCard = () => {
//     setCurrentCard(currentCard === sugestions.length - 1 ? 0 : currentCard + 1);
//   };

//   const handlePrevCard = () => {
//     setCurrentCard(currentCard === 0 ? sugestions.length - 1 : currentCard - 1);
//   };
//   return (
//     <div>
//       {sugestions.splice(0, 6).map((sugestion, index) => (
//         <div key={ sugestion.idMeal || sugestion.idDrink }>
//           <img
//             src={ sugestion.strMealThumb || sugestion.strDrinkThumb }
//             alt={ sugestion.strMeal || sugestion.strDrink }
//             data-testid={ `${index}-recomendation-card` }
//           />
//           <p data-testid={ `${index}-recomendation-title` }>
//             {sugestion.strMeal || sugestion.strDrink}
//           </p>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={ () => handlePrevCard() }
//       >
//         Prev
//       </button>
//       <button
//         type="button"
//         onClick={ () => handleNextCard() }
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default Carousel;
