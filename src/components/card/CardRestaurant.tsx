import React from "react";
import { useNavigate } from 'react-router-dom';
import Delivery from '../../img/Delivery.png'
import Clock from '../../img/Clock.png'
import Star from '../../img/Star 1.png'
type CardRestaurantProps = {
    imgSrc: string;
    navigateTo:string;
    textRestaurant:string;
    textInf:string
    
};
function CardRestaurant({imgSrc,navigateTo,textRestaurant,textInf}: CardRestaurantProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(navigateTo);
    };
    return ( 
        <div className="flex flex-col justify-start hover:opacity-75 " onClick={handleClick}>
            <img src={imgSrc} className=""/>
            <p className='font-medium'>{textRestaurant}</p>
            <p className="font-extralight text-xs text-slate-400">{textInf}</p>
            <div className="flex flex-row justify-start gap-9 py-2">
                <div className="flex flex-row items-center gap-2">
                    <img className="size-4" src={Star}/>
                    <p className="font-semibold text-xs">4.7</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <img className="size-4" src={Delivery}/>
                    <p className="font-semibold text-xs">Free</p>
                </div >
                <div className="flex flex-row items-center gap-2">
                    <img className="size-4" src={Clock}/>
                    <p className="font-semibold text-xs">20 min</p>
                </div>
            </div>
        </div>
        
     );
}

export default CardRestaurant;