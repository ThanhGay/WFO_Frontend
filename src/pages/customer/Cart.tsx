import BackHeader from "../../components/header/BackHeader";
import Checkbox from '@mui/material/Checkbox';
import { orange } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import Chicken from '../../img/Heading Image.png';
import { Button } from 'antd';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiAddCart, apiDecreaseCart, apiDeleteCart, apiGetCart, apiIncreaseCart } from "../../api/cart";
import { useAppSelector } from "../../redux/hook";
import Delete from '../../img/delete.png'
import Remove from '../../img/remove.png'
interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productSize: string;
  productImage: string;
  quantity: number;
}
function Cart() {
  const [foodQuantity, setFoodQuantity] = useState(1);
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authState)
  const location = useLocation();
  const { quantity } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(0)
  const handleButton = () => {
    navigate('/homedetails/fooddetails/cart/payment');
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<any>({});
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);



  useEffect(() => {
    if (quantity) {
      setFoodQuantity(quantity);
    }
  }, [quantity]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await apiGetCart(token)
      setCart(res.data.items)
    }
    fetchCart()

  }, [])
  // console.log('my cart', cart);

  useEffect(() => {
    const total = cart.reduce((sum, item: any) => {
      if (checkedItems[item.productId]) {
        return sum + item.productPrice * item.quantity;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  }, [cart, checkedItems]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    setCheckedItems({
      ...checkedItems,
      [productId]: event.target.checked,
    });
  };

  const handleRemoveItem = async (id:any ) => {
    try {
      const res = await apiDeleteCart(id, token); 
      if (res.status === 200) {
        alert('Xóa sản phẩm thành công');
        setCart(cart.filter((item: any) => item.id !== id));
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const handleIncreaseItem = async (id: any) => {
    try{
      const fetchIncrease = await apiIncreaseCart(id, token);
    if (fetchIncrease.status === 200) {
      setCart(fetchIncrease.data.items);
    } else {
      alert("Có lỗi xảy ra khi tăng sản phẩm");
    }
  } catch (error) {
    console.error("Lỗi khi tăng sản phẩm:", error);
  }
      

  };
  
  const handleDecreaseItem = async (id: any) => {
    const fetchDecrease = await apiDecreaseCart(id, token)
   

  };
  return (
    <div className="py-1  " >
      <div className="flex "> 
        <BackHeader title="Cart"></BackHeader>
        <img
          className="size-6  m-2 "
          src={Delete}
          onClick={() => setShowDeleteButtons(!showDeleteButtons)}
        />
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
        {cart.map((item: any, index: any) => (
          <div key={index} className="flex relative  flex-row items-center gap-2 ">
            <Checkbox
              checked={checkedItems[item.productId] || false}
              onChange={(e) => handleChange(e, item.productId)}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                color: orange[800],
                '&.Mui-checked': {
                  color: orange[600],
                },
              }}
            />
            <img src={`${process.env.REACT_APP_API_URL}/${item?.productImage}`} className="h-32 w-32 rounded-3xl" />
            <div className=" py-4">
              <p className="text-xl">{item.productName}</p>
              <p className="font-bold">Price: {item.productPrice.toLocaleString('VN-vi')}</p>
              <p>Size: {item.productSize}</p>
              <div className=" pl-16 pt-3">
                <button
                  className="w-8 h-8 rounded-full bg-orange-400 text-white font-bold"
                  onClick={() => handleDecreaseItem(item.id)}
                >
                  -
                </button>
                <span className="inline-block min-w-[50px] text-center font-medium">{item.quantity}</span>
                <button
                  className="w-8 h-8 rounded-full bg-orange-400 text-white font-bold"
                  onClick={() => handleIncreaseItem(item.id)}
                >
                  +
                </button>
              </div>
            </div>
            {showDeleteButtons && (
              <img
                className="size-5 absolute top-2 right-3  "
                src={Remove}
                onClick={() => handleRemoveItem(item.id)}
              />
            )}
          </div>


        ))}


      </div>



      <div className=" flex items-center gap-3 bg-slate-200 h-14 w-full bottom-10 rounded-lg absolute">
        <p className="font-thin text-slate-500 text-xs">TOTAL:</p>
        <span className="font-semibold text-xl">{totalPrice.toLocaleString('VN-vi')}</span>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="btn-submit"
        size="large"
        style={{
          height: '47px',
          width: '100%',
          backgroundColor: '#FF7622',
          bottom: '0px',
          position: 'absolute'
        }}
        onClick={handleButton}
      >
        PAYMENT
      </Button>

    </div>
  );
}

export default Cart;