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

  const menuName = history.location.pathname;
  return (
    <div
      data-testid="footer"
      // className="shadow-[0px_0px_15px_-10px_rgba(0,0,0,0.5)]
      //  h-[60px] flex justify-center fixed bottom-0 left-0 bg-[#19c27e] w-full items-center"
      className="
       h-[60px]
       flex justify-center
       fixed bottom-2
       left-[110px] bg-[#19c27ef5]
       rounded-[28px]
       w-[140px] items-center"
    >
      <div className="w-[160px] flex justify-center">
        <button
          onClick={ () => handleClick('/meals') }
        >
          {/* <img
            src={ mealIcon }
            alt="Icone de talheres"
            data-testid="meals-bottom-btn"
          /> */}
          <div
            className={ menuName === '/meals'
              ? 'bg-white bg-opacity-40 pr-5 pl-5 pt-3 pb-3 rounded-[22px]'
              : 'pr-5 pl-5 pt-3 pb-3 rounded-[22px]' }
          >
            <IoRestaurantOutline
              style={ { width: '24px', height: '24px', color: 'white' } }
              data-testid="meals-bottom-btn"
            />
          </div>
        </button>
        <button
          onClick={ () => handleClick('/drinks') }
        >
          {/* <img
            src={ BiDrink }
            alt="Icone de Bebida"
            data-testid="drinks-bottom-btn"
          /> */}
          <div
            className={ menuName === '/drinks'
              ? 'bg-white bg-opacity-40 pr-5 pl-5 pt-3 pb-3 rounded-[22px]'
              : 'pr-5 pl-5 pt-3 pb-3 rounded-[22px]' }
          >
            <BiDrink
              style={ { width: '24px', height: '24px', color: 'white' } }
              data-testid="drinks-bottom-btn"
            />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Footer;
