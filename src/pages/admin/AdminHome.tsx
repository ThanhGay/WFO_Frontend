import Logo from '../../img/logo 1.png'
import Profile from '../../img/user.png'
import Logout from '../../img/power.png'
import Kimpap from '../../img/1.jpg'
import Noodle from '../../img/2.jpg'
import Pho from '../../img/3.jpg'
import Burger from '../../img/4.jpg'
import Pizza from '../../img/5.jpg'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';

function AdminHome() {
  const images = [Kimpap, Noodle, Pho, Pizza, Burger];
  const navigate = useNavigate();
  const productMenuRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showProductMenu, setShowProductMenu] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    const handleClickOutside = (event: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target as Node)) {
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

  const toggleProductMenu = () => {
    setShowProductMenu(!showProductMenu);
  };

  return (
    <div>
      <div className="shadow-md h-16 rounded flex items-center justify-between">
        <img alt='logo' className='h-16 w-16' src={Logo} />
        <p className='font-semibold'>ADMIN</p>
        <div className='flex items-center gap-3'>
          <img alt='avatar' className='size-4' src={Profile} onClick={() =>{navigate('/profile')}} />
          <img alt='logout-btn' className='size-5' src={Logout} />
        </div>
      </div>

      <div className="slideshow-container py-4">
        <div className="slide ">
          <img src={images[currentIndex]} className='w-full h-64 rounded-2xl' />
        </div>
      </div>

      <div className=" flex gap-6 justify-center">
        <button
          onClick={toggleProductMenu} 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Product
        </button>

        {showProductMenu && (
          <div
            ref={productMenuRef} 
            className="absolute left-7 bottom-[97px] bg-white shadow-lg rounded-lg p-4 w-30"
          >
            <button
              onClick={() => handleNavigate('/admin/product/create')}
              className="block py-2 px-4 text-blue-600 hover:bg-gray-200"
            >
              Add
            </button>
            <button
              onClick={() => handleNavigate('/admin/product/update')}
              className="block py-2 px-4 text-green-600 hover:bg-gray-200"
            >
              Update
            </button>
            <button
              onClick={() => handleNavigate('/product/delete')}
              className="block py-2 px-4 text-red-600 hover:bg-gray-200"
            >
              Delete
            </button>
          </div>
        )}

        <button
          onClick={() => handleNavigate('/customer')}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Customer
        </button>
        <button
          onClick={() => handleNavigate('/order')}
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
        >
          Order
        </button>
      </div>
      <p className='text-xl px-3 py-3'>Statistical</p>
    </div>
  );
}

export default AdminHome;
