import { useNavigate } from 'react-router-dom';
import Plus from '../../img/plus.png';
type CartFoodProps = {
  imageSrc: string;
  navigateTo: string;
  textMeal: string;
  textRestaurant: string;
  textPrice:string;
  textSize:string;
  id:any
  
};
function CartFood({
  navigateTo,
  textMeal,
  imageSrc,
  textRestaurant,
  textPrice,
  textSize,
  id
}: CartFoodProps) {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(navigateTo,{ state: { id } });
  };
  return (
    <div className="relative w-32  flex flex-col items-center py-3">
      <img className="w-28 h-20 rounded-2xl " src={imageSrc} />
      <div className=' p-2 shadow-xl rounded-xl h-32 w-28'>
        <p> {textMeal}</p>
        <p className='text-xs text-slate-300 line-clamp-1'>{textRestaurant}</p>
        <p className='text-xs  text-slate-500 font-medium '>Size: {textSize}</p>
       
        <div className=" flex flex-row w-24 justify-between absolute bottom-5 ">
          <p className='font-semibold'>{textPrice}đ</p>
          <img className="size-6" src={Plus} onClick={handleClick} />
        </div>
       
      </div>
    </div>
  );
}

export default CartFood;
