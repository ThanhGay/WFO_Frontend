import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiCategories } from '../../api/product';
import CardCategory from '../../components/card/CardCategory';
import BackHeader from '../../components/header/BackHeader';

import Cart1 from '../../img/Cart1.png';
import Search from '../../img/search.png';

function AllCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const dataRes = await apiCategories();
      if (dataRes) {
        setCategories(dataRes.items);
      }
    })();
  }, []);

  const handleSearch = () => {
    navigate('/homedetails/searchbyname');
  };
  const handleCart = () => {
    navigate('/cart');
  };
  return (
    <div className=" py-3 px-3">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row">
          <BackHeader title="All Categories"></BackHeader>
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <img
            className="size-10"
            src={Search}
            onClick={handleSearch}
            alt="search"
          />
          <img
            className="size-10"
            src={Cart1}
            onClick={handleCart}
            alt="cart"
          />
        </div>
      </div>
      <div className="  grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar h-[530px]">
        {categories.map((item: any) => (
          <CardCategory
            key={item?.id}
            imageSrc={`${process.env.REACT_APP_API_URL}/${item?.image}`}
            navigateTo={`/homedetails/food`}
            textCategory={item?.name}
            category={item?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCategories;
