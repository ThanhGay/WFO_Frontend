import Input from 'antd/es/input/Input';
import BackHeader from '../components/header/BackHeader';
import Cart from '../img/Cart.png';
import Search1 from '../img/search1.png';
import { Link, useNavigate } from 'react-router-dom';
import Rice from '../img/Rice.png';
import Star from '../img/Star 1.png';
import CardMeal from '../components/card/CardMeal';
import Fish from '../img/Fish.png';
import Noodle from '../img/Noodle.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiSearch } from '../api/product';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
function SearchByName() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.addEventListener('keyup', handleSearch);
    return () => {
      window.removeEventListener('keyup', handleSearch);
    };
  }, [search]);
  const handleSearch = async (e: any) => {
    if (e.keyCode === 13) {
      if (!search.trim()) {
        console.warn('Chua nhap j ca.');
        return;
      }
      try {
        const dataRes = await apiSearch(search);
        if (dataRes && dataRes.items.length > 0) {
          navigate(`/homedetails/foodsearch?query=${search}`, {
            state: { food: search }
          });
        } else {
          console.warn('Khong co san pham nay.');
        }
      } catch (error) {}
    }
  };

  const handleButton = () => {
    navigate('/homedetails/food');
  };

  return (
    <div className=" py-3 px-3">
      <div className="flex flex-row items-center">
        <BackHeader title="Search"></BackHeader>
        <img className=" absolute top-2 right-2" src={Cart} />
      </div>
      <Input
        type="text"
        placeholder="Search"
        size="large"
        variant="borderless"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleSearch}
        style={{
          fontWeight: 400,
          backgroundColor: '#D0D0D0',
          padding: '14px 16px',
          paddingLeft: '40px'
        }}
      />
      <img className="size-6 absolute top-[99px] left-5" src={Search1} />
      <p className="py-2">Recent Keywords</p>
      <div className="flex flex-row overflow-x-auto gap-4 no-scrollbar">
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Burger</p>
        </div>
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Pizza</p>
        </div>
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Burger</p>
        </div>
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Bread</p>
        </div>
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Noodle</p>
        </div>
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Burger</p>
        </div>
        <div
          className="flex  border-2 border-gray rounded-3xl p-2 justify-center "
          onClick={handleButton}
        >
          <p className="text-xs">Burger</p>
        </div>
      </div>
      <p className="py-1">Suggest Restaurant</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <img src={Rice} />
          <div>
            <p className="text-sm">Pancey Restaurant</p>
            <div className="flex flex-row gap-2 items-center">
              <img className="size-4" src={Star} />
              <p className="text-sm">4.7</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <img src={Fish} />
          <div>
            <p className="text-sm"> Cafenio Coffee Club</p>
            <div className="flex flex-row gap-2 items-center">
              <img className="size-4" src={Star} />
              <p className="text-sm">4.0</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <img src={Noodle} />
          <div>
            <p className="text-sm">American Spicy Burger Shop</p>
            <div className="flex flex-row gap-2 items-center">
              <img className="size-4" src={Star} />
              <p className="text-sm">4.3</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-3">Popular Fast Food</p>
      <div className="flex gap-5">
        <CardMeal
          imageSrc={Rice}
          textMeal="european Pizza"
          navigateTo="/homedetails/food"
          textRestaurant="Peppe Pizzeria"
        ></CardMeal>
        <CardMeal
          imageSrc={Rice}
          textMeal="european Pizza"
          navigateTo="/homedetails/food"
          textRestaurant="Peppe Pizzeria"
        ></CardMeal>
        <CardMeal
          imageSrc={Rice}
          textMeal="european Pizza"
          navigateTo="/homedetails/food"
          textRestaurant="Peppe Pizzeria"
        ></CardMeal>
      </div>
    </div>
  );
}

export default SearchByName;
