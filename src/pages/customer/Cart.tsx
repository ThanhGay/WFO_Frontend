import BackHeader from "../../components/header/BackHeader";
import Checkbox from '@mui/material/Checkbox';
import { orange } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import Chicken from '../../img/Heading Image.png';
import { Button } from 'antd';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiAddCart, apiGetCart } from "../../api/cart";
import { useAppSelector } from "../../redux/hook";
function Cart() {
  const [checked, setChecked] = useState(true);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authState)
  const location = useLocation();
  const { quantity } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(0)
  const handleButton = () => {
    navigate('/homedetails/fooddetails/cart/payment');
  };

  const [cart, setCart] = useState([])
  const [checkedItems, setCheckedItems] = useState<any>({});



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
  console.log('my cart', cart);

  useEffect(() => {
    // Tính tổng tiền mỗi lần giỏ hàng thay đổi hoặc checkbox thay đổi
    const total = cart.reduce((sum, item:any) => {
      if (checkedItems[item.productId]) {  // Kiểm tra nếu checkbox của sản phẩm này được chọn
        return sum + item.productPrice * item.quantity;
      }
      return sum; // Nếu không chọn, bỏ qua sản phẩm này
    }, 0);
    setTotalPrice(total);
  }, [cart, checkedItems]); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    // Thay đổi trạng thái checkbox của từng sản phẩm
    setCheckedItems({
      ...checkedItems,
      [productId]: event.target.checked,  // Cập nhật trạng thái checkbox của sản phẩm
    });
  };
  return (
    <div className="py-3  " >
      <BackHeader title="Cart"></BackHeader>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
        {cart.map((item: any, index: any) => (
          <div key={index} className="flex flex-row items-center gap-2 ">
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
                  className="w-8 h-8 rounded-full bg-red-500 text-white font-bold"
                  onClick={() => setFoodQuantity(foodQuantity > 1 ? foodQuantity - 1 : 1)}
                >
                  -
                </button>
                <span className="inline-block min-w-[50px] text-center font-medium">{item.quantity}</span>
                <button
                  className="w-8 h-8 rounded-full bg-red-500 text-white font-bold"
                  onClick={() => setFoodQuantity(foodQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
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