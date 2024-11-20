import Logo from '../../img/logo 1.png';
import Profile from '../../img/user.png';
import Logout from '../../img/power.png';
import Kimpap from '../../img/1.jpg';
import Noodle from '../../img/2.jpg';
import Pho from '../../img/3.jpg';
import Burger from '../../img/4.jpg';
import Pizza from '../../img/5.jpg';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getListCustomer, getListOrder } from '../../redux/features/adminSlice';
import LineChart from '../../components/chart';

function AdminHome() {
  const images = [Kimpap, Noodle, Pho, Pizza, Burger];
  const navigate = useNavigate();
  const productMenuRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showProductMenu, setShowProductMenu] = useState<boolean>(false);

  // load list customer, order
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authState);
  useEffect(() => {
    dispatch(getListCustomer());
    dispatch(getListOrder(token));
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        productMenuRef.current &&
        !productMenuRef.current.contains(event.target as Node)
      ) {
        setShowProductMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="shadow-md h-16 rounded flex items-center justify-between">
        <img alt="logo" className="h-16 w-16" src={Logo} />
        <p className="font-semibold">ADMIN</p>
        <div className="flex justify-center w-16 ">
          <img
            alt="avatar"
            className="size-4  "
            src={Profile}
            onClick={() => {
              navigate('/profile');
            }}
          />
        </div>
      </div>

      <div className="slideshow-container py-4">
        <div className="slide ">
          <img src={images[currentIndex]} className="w-full h-64 rounded-2xl" />
        </div>
      </div>

      <div className=" flex gap-2 justify-center  ">
        <button
          onClick={() => handleNavigate('/categories')}
          className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Categories
        </button>
        <button
          onClick={() => handleNavigate('/product')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 "
        >
          Product
        </button>
        <button
          onClick={() => handleNavigate('/admin/order')}
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
        >
          Order
        </button>
        <button
          onClick={() => handleNavigate('/admin/customer')}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Customer
        </button>
       
      </div>
      <div>
        <p className="text-xl px-3 py-3">Statistical</p>
        <LineChart
          dataPoints={[
            { date: '2024-11-17', amount: 1635000 },
            { date: '2024-11-18', amount: 2070000 },
            { date: '2024-11-20', amount: 1950000 }
          ]}
        ></LineChart>
      </div>
    </div>
  );
}

export default AdminHome;
