import Pizza from "../../img/pizza.png"
import { useNavigate } from 'react-router-dom';
type CardMealProps = {
    imageSrc: string;
    navigateTo:string;
    textMeal:string;
    textRestaurant:string
    
};
function CardMeal({imageSrc,navigateTo,textMeal,textRestaurant}:CardMealProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigateTo);
    };
    return ( 
        <div className="  flex flex-col w-28 items-center rounded-xl shadow-md hover:opacity-75" onClick={handleClick}>
            <img className="size-20" src={Pizza}/>
            <p className="text-sm">{textMeal}</p>
            <p className="text-xs text-slate-400 pb-3">{textRestaurant}</p>
        </div>
     );
}

export default CardMeal;