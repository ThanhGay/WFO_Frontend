import Input from "antd/es/input/Input";
import BackHeader from "../components/header/BackHeader";
import Cart from '../img/Cart.png'
import Search1 from "../img/search1.png";
import { Link, useNavigate } from 'react-router-dom';
import Rice from "../img/Rice.png"
import Star from "../img/Star 1.png"
import CardMeal from "../components/card/CardMeal";
import Fish from '../img/Fish.png'
import Noodle from '../img/Noodle.png'
import axios from "axios";
import { useEffect, useState } from "react";
import { apiSearch } from "../api/product";
function SearchByName() {
    const navigate = useNavigate(); 
    const [search,setSearch] = useState('');
    
    useEffect(()=>{
        const onSearch = async ()=>{
            const dataRes = await apiSearch();
           
            setSearch(dataRes.items)
        }
        onSearch()
       

    },[])
    console.log(search)
    const handleButton = () => {
        navigate('/homedetails/fooddetails'); 
    }

    return ( 
        <div className=" py-3 px-3">
            <div className="flex flex-row items-center">
                <BackHeader title="Search"  ></BackHeader>
                <img className=" absolute top-2 right-2" src={Cart}/>
            </div>
            <Input
                type="search"
                placeholder="Search"
                size="large"
                variant="borderless"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                style={{
                  fontWeight: 400,
                  backgroundColor: '#D0D0D0',
                  padding: '14px 16px',
                  paddingLeft:'40px'

                
                  
                }}
              />
              <img className="size-6 absolute top-[99px] left-5" src={Search1} />
              <p className="py-2">Recent Keywords</p>
              <div className="flex flex-row overflow-x-auto gap-4 no-scrollbar">
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Burger</p>
                    </div>
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Pizza</p>
                    </div>
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Burger</p>
                    </div>
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Bread</p>
                    </div>
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Noodle</p>
                    </div>
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Burger</p>
                    </div>
                    <div className="flex  border-2 border-gray rounded-3xl p-2 justify-center " onClick={handleButton} >
                        <p className="text-xs">Burger</p>
                    </div>
              </div>
              <p className="py-1">Suggest Restaurant</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                    <img src={Rice}/>
                    <div>
                        <p className="text-sm">Pancey Restaurant</p>
                        <div className="flex flex-row gap-2 items-center">
                            <img className="size-4" src={Star}/>
                            <p className="text-sm">4.7</p>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-row gap-2">
                    <img src={Fish}/>
                    <div>
                        <p className="text-sm"> Cafenio Coffee Club</p>
                        <div className="flex flex-row gap-2 items-center">
                            <img className="size-4" src={Star}/>
                            <p className="text-sm">4.0</p>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-row gap-2">
                    <img src={Noodle}/>
                    <div>
                        <p className="text-sm">American Spicy Burger Shop</p>
                        <div className="flex flex-row gap-2 items-center">
                            <img className="size-4" src={Star}/>
                            <p className="text-sm">4.3</p>
                        </div>
                    </div>
                    
                </div>
              </div>
              <p className="py-3">Popular Fast Food</p>
              <div className="flex gap-5">
                <CardMeal imageSrc={Rice} textMeal="european Pizza" navigateTo="/homedetails/fooddetails" textRestaurant="Peppe Pizzeria"></CardMeal>
                <CardMeal imageSrc={Rice} textMeal="european Pizza" navigateTo="/homedetails/fooddetails" textRestaurant="Peppe Pizzeria"></CardMeal>
                <CardMeal imageSrc={Rice} textMeal="european Pizza" navigateTo="/homedetails/fooddetails" textRestaurant="Peppe Pizzeria"></CardMeal>
              </div>
             
              
            




        </div>
     );
}

export default SearchByName;