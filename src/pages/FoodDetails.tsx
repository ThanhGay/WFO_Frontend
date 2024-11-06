import BackHeader from '../components/header/BackHeader';
import Chicken from '../img/Heading Image.png';
import Star from '../img/Star 1.png';
import Delivery from '../img/Delivery.png';
import Clock from '../img/Clock.png';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { apiProductGetID } from '../api/product';
import { Button } from 'antd';
function FoodDetails() {
  const [size, setSize] = useState<'10' | '14' | '16'>('10');
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { id } = location.state || {};
  const [productDetail, setProductDetail] = useState<any>('');

  const totalPrice = productDetail.price * quantity;
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (id) {
        const response = await apiProductGetID(id);
        console.log(response);

        setProductDetail(response);
      }
    };

    fetchProductDetail();
  }, [id]);

  return (
    <div className="py-3 px-1">
      <BackHeader title="Details"></BackHeader>
      <img className="w-full rounded-lg object-cover" src={Chicken} />
      <div className="py-2 px-3">
        <p className="font-medium">{productDetail.name}</p>
        <p className="text-xs text-gray-500">{productDetail.description}</p>
        <p className="font-semibold text-xs py-2 text-slate-500">
          SIZE: {productDetail.size}
        </p>
      </div>

      <div className="flex flex-row justify-start gap-9 py-2 px-2">
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Star} />
          <p className="font-semibold text-xs">4.7</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Delivery} />
          <p className="font-semibold text-xs">Free</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Clock} />
          <p className="font-semibold text-xs">20 min</p>
        </div>
      </div>

      <div className="relative ">
        <div className="flex items-center justify-between mt-4 bg-gray-100 p-2 rounded-lg w-[400px] absolute -bottom-44 ">
          <span className="font-semibold text-xl">{totalPrice}</span>
          <div className="flex items-center rounded-full bg-black p-2 ">
            <button
              className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span className="mx-4 text-white">{quantity}</span>
            <button
              className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Button
        htmlType="submit"
        type="primary"
        className="btn-submit"
        size="large"
        style={{
          width: '100%',
          backgroundColor: '#FF7622',
          bottom: '0px',
          position: 'absolute'
        }}
      >
        ADD TO CART
      </Button>
    </div>
  );
}

export default FoodDetails;
