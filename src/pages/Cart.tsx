import BackHeader from "../components/header/BackHeader";
import Checkbox from '@mui/material/Checkbox';
import { orange } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import Chicken from '../img/Heading Image.png';
import { Button } from 'antd';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiAddCart, apiGetCart } from "../api/cart";
import { useAppSelector } from "../redux/hook";
function Cart() {
  const [checked, setChecked] = useState(true);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authState)
  const location = useLocation();
  const { quantity } = location.state || {};
  const handleButton = () => {
    navigate('/homedetails/fooddetails/cart/payment');
  };
  
  const [cart,setCart] = useState('')

  useEffect(() => {
    if (quantity) {
      setFoodQuantity(quantity);
    }
  }, [quantity]);

  useEffect(()=>{
    const fetchCart = async ()=>{
      const res = await apiGetCart(token)
      setCart(res.data.items)
     
      
    }
    fetchCart()

  },[])
console.log('my cart',cart);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="py-3 overflow-x-auto no-scrollbar " >
      <BackHeader title="Cart"></BackHeader>

      <div className="flex flex-row">
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{
            color: orange[800],
            '&.Mui-checked': {
              color: orange[600],
            },
           
          }}
        />
        <img src={Chicken} className="h-32 w-32  rounded-3xl" />
        <div className="px-5">
          <p className="text-xl">Pizza</p>
          <p className="font-bold">Price: 3400</p>
          <div className="pt-12 pl-20" >
            <button
              className="w-8 h-8 rounded-full bg-red-500 text-white font-bold"
              onClick={() => setFoodQuantity(foodQuantity > 1 ? foodQuantity - 1 : 1)}
            >
              -
            </button>
            <span className="mx-4">{foodQuantity}</span>
            <button
              className="w-8 h-8 rounded-full bg-red-500 text-white font-bold"
              onClick={() => setFoodQuantity(foodQuantity + 1)}
            >
              +
            </button>

          </div>

        </div>
      </div>

      <div className=" flex items-center gap-3 bg-slate-200 h-14 w-full bottom-10 rounded-lg absolute">
        <p className="font-thin text-slate-500 text-xs">TOTAL:</p>
        <span className="font-semibold text-xl">2</span>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="btn-submit"
        size="large"
        style={{
          height:'47px',
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