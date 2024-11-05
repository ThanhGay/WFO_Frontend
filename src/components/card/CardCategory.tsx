import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type CardCategoryProps = {
    imageSrc: string;
    navigateTo:string;
    textCategory:string;
    category: any;
    
};
function CardCategory({ imageSrc,navigateTo,textCategory, category }:CardCategoryProps) {
    const navigate = useNavigate();
    

    const handleClick = () => {
        navigate(navigateTo,{ state: { category: category } });
    };

    return (
        <div className='flex flex-col items-center'>
             <div className="bg-slate-50 w-24 h-24 rounded-xl shadow-xl flex items-center justify-center hover:opacity-75" onClick={handleClick}>
                <img src={imageSrc} className="w-16 h-16 object-cover rounded-lg" />
            </div>
            <p className='font-bold'>{textCategory}</p>
        </div>
       

    );
}

export default CardCategory;
