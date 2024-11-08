import React, { useEffect } from 'react';
import { Button, ConfigProvider, Form, Input } from 'antd';
import logo from '../img/logo 1.png';
import { Link, useNavigate } from 'react-router-dom';
import { Color } from 'antd/es/color-picker';
import search1 from '../img/search1.png';
import bell from '../img/bell.png';
import burger from '../img/burger.png';
import pizza from '../img/pizza.png';
import pizza2 from '../img/pizza2.png';
import restaurant from '../img/Restaurant.png';
import right_arrow from '../img/right-arrow.png';
import CardCategory from '../components/card/CardCategory';
import CardRestaurant from '../components/card/CardRestaurant';
import { useState } from 'react';
import { apiCategories } from '../api/product';
import { log } from 'console';

function HomeDetails() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleButton = () => {
    navigate('/homedetails/searchbyname');
  };
  useEffect(() => {
    (async () => {
      const dataRes = await apiCategories();
      if (dataRes) {
        setCategories(dataRes.items);
      }
    })();
  }, []);
  console.log(categories);

  return (
    <div className="flex flex-col px-3">
      <div className="flex flex-row justify-between  items-center py-3">
        <div className="flex flex-row items-center">
          <img className="size-12 " src={logo} />
          <div className="">
            <p className="text-red-500 text-xs tex font-bold">WELCOM TO</p>
            <p className="text-xs">Food Shopping</p>
          </div>
        </div>
        <img className="size-4" src={bell} />
      </div>
      <div className="flex flex-row">
        <p className="text-xs top ">Hey Septa,</p>
        <p className="text-xs font-bold">Good afternoon</p>
      </div>
      <Button className="flex justify-start top-2 h-10" onClick={handleButton}>
        <img className="size-4" src={search1} />
        <p className="text-slate-300">What will you like eat?</p>
      </Button>
      <div className="flex flex-row justify-between py-4">
        <p className="text-s">All Categories</p>
        <Link
          to="/homedetails/allcategories"
          className="flex flex-row items-center gap-1"
        >
          <p className="text-slate-400">See All</p>
          <img className="size-4 opacity-15" src={right_arrow} />
        </Link>
      </div>
      <div className="flex flex-row overflow-x-auto space-x-4 whitespace-nowrap no-scrollbar">
        {categories.map((item: any) => (
          <CardCategory
          key={item?.id}
            imageSrc={`${process.env.REACT_APP_API_URL}/${item?.image}`}
            navigateTo={`/homedetails/food`}
            textCategory={item?.name}
            category = {item?.id}
            />
        ))}
      </div>

      <div className="flex flex-row justify-between py-6">
        <p className="text-s">Open Restaurant</p>
        <Link to="/searchbyname" className="flex flex-row items-center gap-1">
          <p className="text-slate-400">See All</p>
          <img className="size-4 opacity-15" src={right_arrow} />
        </Link>
      </div>

      <div className="h-64 flex flex-col space-y-5 overflow-y-auto no-scrollbar">
        <CardRestaurant
          imgSrc={restaurant}
          navigateTo="/home"
          textRestaurant="Rose Garden Restaurant"
          textInf="Burger-Chicken-Riche-Wings"
        ></CardRestaurant>
        <CardRestaurant
          imgSrc={restaurant}
          navigateTo="/home"
          textRestaurant="Rose Garden Restaurant"
          textInf="Burger-Chicken-Riche-Wings"
        ></CardRestaurant>
        <CardRestaurant
          imgSrc={restaurant}
          navigateTo="/home"
          textRestaurant="Rose Garden Restaurant"
          textInf="Burger-Chicken-Riche-Wings"
        ></CardRestaurant>
      </div>
    </div>
  );
}

export default HomeDetails;