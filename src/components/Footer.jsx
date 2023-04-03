import { useHistory } from 'react-router-dom';
// import { useContext } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../footer.css';
// import RecipeContext from '../context/RecipeContext';

function Footer() {
  // const { setRecipe } = useContext(RecipeContext);
  const history = useHistory();

  const handleClick = (page) => {
    // setRecipe(children);
    history.push(page);
  };

  return (
    <div data-testid="footer" className="footer">
      <button
        onClick={ () => handleClick('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="Icone de Bebida"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        onClick={ () => handleClick('/meals') }
      >
        <img
          src={ mealIcon }
          alt="Icone de talheres"
          data-testid="meals-bottom-btn"
        />
      </button>
    </div>
  );
}

export default Footer;
