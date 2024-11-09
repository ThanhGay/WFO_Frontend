import React, { useEffect } from 'react';
import { Button, ConfigProvider, Form, Input } from 'antd';
import logo from '../../img/logo 1.png';
import { Link, useNavigate } from 'react-router-dom';
import search1 from '../../img/search1.png';
import bell from '../../img/bell.png';
import restaurant from '../../img/Restaurant.png';
import right_arrow from '../../img/right-arrow.png';
import CardCategory from '../../components/card/CardCategory';
import CardRestaurant from '../../components/card/CardRestaurant';
import { useState } from 'react';
import { apiCategories } from '../../api/product';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Home from '@mui/icons-material/Home';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import FactCheck from '@mui/icons-material/FactCheck';



function HomeDetails() {
  const navigate = useNavigate();
  const [value, setValue] = useState(localStorage.getItem('bottomNavValue') || 'recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem('bottomNavValue', newValue);
  };
  
  const [categories, setCategories] = useState([]);
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleButton = () => {
    navigate('/homedetails/searchbyname');
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('bottomNavValue');
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

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

      <div className="h-52 flex flex-col space-y-5 overflow-y-auto no-scrollbar">
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
      <BottomNavigation sx={{ width: '100%', backgroundColor: '#F0F0F0', boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="recents"
          icon={<Home />}
          onClick={() => handleNavigation('/homedetails')}
        />
        <BottomNavigationAction
          label="Order"
          value="favorites"
          icon={<FactCheck />}
        />
        <BottomNavigationAction
          label="Cart"
          value="nearby"
          icon={<ShoppingCart />}
          onClick={() => handleNavigation('/cart')}
        />
        <BottomNavigationAction 
          label="Profile" 
          value="folder" 
          icon={<Person />} 
          onClick={() => handleNavigation('/profile')}/>
        
      </BottomNavigation>
    </div>
  );
}

export default HomeDetails;
