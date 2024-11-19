import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiCategories } from '../../api/product';
import CardCategory from '../../components/card/CardCategory';
import BackHeader from '../../components/header/BackHeader';


import Search from '../../img/search.png';
import Cart from '../../img/basket.png'

function Product() {
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

  return (
    <div className=" py-3 px-3">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row">
          <BackHeader title="Product"></BackHeader>
        </div>
      </div>
      <div className="  grid grid-cols-2 overflow-x-auto no-scrollbar ">
        {categories.map((item: any) => (
          <CardCategory
            key={item?.id}
            imageSrc={`${process.env.REACT_APP_API_URL}/${item?.image}`}
            navigateTo={`/productedit`}
            textCategory={item?.name}
            category={item?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;
