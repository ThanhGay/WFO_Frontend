import BackHeader from '../../components/header/BackHeader';
import Chicken from '../../img/Heading Image.png';
import Star from '../../img/Star 1.png';
import Delivery from '../../img/Delivery.png';
import Clock from '../../img/Clock.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiProductGetID } from '../../api/product';
import { Button } from 'antd';
import { apiAddCart } from '../../api/cart';
import { useAppSelector } from '../../redux/hook';

function FoodDetails() {
  const { token } = useAppSelector((state) => state.authState);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [productDetail, setProductDetail] = useState<any>('');

  const totalPrice = productDetail.price * quantity;
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (id) {
        const response = await apiProductGetID(id);
        setProductDetail(response);
      }
    };

    fetchProductDetail();
  }, [id]);

  // console.log('token:',token);

  const handleButton = async () => {
    const res = await apiAddCart(
      {
        productId: productDetail.id,
        quantity: quantity,
        note: null,
        isAvailable: productDetail.isAvailable
      },
      token
    );
    if (res.status === 200) {
      alert('Them san pham thanh cong');
    } else {
      alert('Errrrrrrrrr');
    }
  };

  return (
    <div className="py-3   relative">
      <BackHeader title="Details" />
      <img
        className="w-full h-64 max-w-full rounded-2xl object-cover "
        alt={productDetail.name}
        src={`${process.env.REACT_APP_API_URL}${productDetail.image}`}
      />
      <div className=" px-3">
        <p className="font-medium text-2xl py-3">{productDetail.name}</p>
        <p className="text-xs text-gray-500">{productDetail.description}</p>
        <p className="font-semibold text-lg  py-2 text-slate-500">
          SIZE: {productDetail.size}
        </p>
      </div>

      <div className="flex flex-row justify-start gap-9 py-2 px-2">
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Star} alt="rate" />
          <p className="font-semibold text-xs">4.7</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Delivery} alt="freight" />
          <p className="font-semibold text-xs">Free</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Clock} alt="timer" />
          <p className="font-semibold text-xs">20 min</p>
        </div>
      </div>

      <div className="fixed bottom-10 w-full  ">
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg max-w-screen-md mx-auto ">
          <span className="font-semibold text-xl">
            {totalPrice.toLocaleString('VN-vi')}đ
          </span>
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
          backgroundColor: productDetail.isAvailable ? '#FF7622' : '#CCC',
          bottom: '0',
          position: 'fixed',
          left: '0',
          cursor: productDetail.isAvailable ? 'pointer' : 'not-allowed' 
        }}
        disabled={!productDetail.isAvailable} 
        onClick={() => {
          if (productDetail.isAvailable) {
            handleButton();
          } else {
            alert('OUT OF STOCK');
          }
        }}
      >
        {productDetail.isAvailable ? 'ADD TO CART' : 'OUT OF STOCK'}
      </Button>
    </div>
  );
}

export default FoodDetails;
