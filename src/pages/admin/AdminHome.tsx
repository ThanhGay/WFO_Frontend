import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';

import Logo from '../../img/logo 1.png';
import Profile from '../../img/user.png';
import Kimpap from '../../img/1.jpg';
import Noodle from '../../img/2.jpg';
import Pho from '../../img/3.jpg';
import Burger from '../../img/4.jpg';
import Pizza from '../../img/5.jpg';

import LineChart from '../../components/chart';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { RangePickerProps } from 'antd/es/date-picker';
import { getReport } from '../../redux/features/adminSlice';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

function AdminHome() {
  const images = [Kimpap, Noodle, Pho, Pizza, Burger];
  const navigate = useNavigate();
  const productMenuRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showProductMenu, setShowProductMenu] = useState<boolean>(false);

  const { data: reportData } = useAppSelector(
    (state) => state.adminState.report
  );

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

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authState);

  const handleChange: RangePickerProps['onChange'] = async (
    date,
    dateString
  ) => {
    dispatch(
      getReport({
        startDate: dateString[0],
        endDate: dateString[1],
        token: token
      })
    );
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

      {/* Charts */}
      <div className="px-2">
        <p className="text-xl px-3 py-3 font-semibold">Statistical</p>
        <RangePicker
          className="mb-4"
          placement="topLeft"
          onChange={(dates, dateStrings) => handleChange(dates, dateStrings)}
          defaultValue={[dayjs('2024-01-01'), dayjs('2024-12-31')]}
        />
        <LineChart dataPoints={reportData} />
      </div>
    </div>
  );
}

export default AdminHome;
