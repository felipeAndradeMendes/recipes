import { useHistory } from 'react-router-dom';
// import { useContext } from 'react';
import { BiDrink } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
// import RecipeContext from '../context/RecipeContext';

function Footer() {
  // const { setRecipe } = useContext(RecipeContext);
  const history = useHistory();

  const handleClick = (page) => {
    // setRecipe(children);
    history.push(page);
  };

  return (
    <div
      data-testid="footer"
      className="shadow-[0px_0px_15px_-10px_rgba(0,0,0,0.5)]
       h-[60px] flex justify-center fixed bottom-0 left-0 bg-white w-full items-center"
    >
      <div className="w-[160px] flex justify-between">
        <button
          onClick={ () => handleClick('/drinks') }
        >
          {/* <img
            src={ BiDrink }
            alt="Icone de Bebida"
            data-testid="drinks-bottom-btn"
          /> */}
          <BiDrink
            style={ { width: '24px', height: '24px', color: '#999999' } }
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          onClick={ () => handleClick('/meals') }
        >
          {/* <img
            src={ mealIcon }
            alt="Icone de talheres"
            data-testid="meals-bottom-btn"
          /> */}
          <IoRestaurantOutline
            style={ { width: '20px', height: '20px', color: '#999999' } }
            data-testid="meals-bottom-btn"
          />
        </button>
      </div>
    </div>
  );
}

export default Footer;
