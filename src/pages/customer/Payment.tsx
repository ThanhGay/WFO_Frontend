import { useLocation, useNavigate } from 'react-router-dom';
import BackHeader from '../../components/header/BackHeader';
import back_right from '../../img/back_right.png';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { apiCreateOrder } from '../../api/order';
import { useAppSelector } from '../../redux/hook';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productSize: string;
  productImage: string;
  productDescription: string;
  quantity: number;
}

function Payment() {
  const { token, user } = useAppSelector((state) => state.authState);  
  const location = useLocation();
  const { selectedItems }: { selectedItems: CartItem[] } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItems && selectedItems.length > 0) {
      const total = selectedItems.reduce((sum, item) => {
        return sum + item.productPrice * item.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [selectedItems]);

  const handleButton = async () => {
    if (selectedItems && selectedItems.length > 0) {
      const cartIds = selectedItems.map(item => item.id);
      console.log(cartIds);  

      try {
        const response = await apiCreateOrder({ cartIds }, token);
        console.log('Order success', response);
        navigate('/ordersuccess');
      } catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order. Please try again.');
      }
    } else {
      alert('No items selected for payment.');
    }
  };

  const handleEditAddress = () => {
    navigate('/editaddress');
  };

  const handlePaymentMethod = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="px-3 py-1 flex-grow">
        <BackHeader title="Payment" />
        
        <div className="bg-slate-300 rounded-lg flex justify-between items-center" onClick={handleEditAddress}>
          <div>
            <p className="pl-3 font-semibold">DELIVERY ADDRESS</p>
            {/* Display the user's address */}
            <p className="pl-3 font-thin py-3">{user?.address || 'Address not available'}</p>
          </div>
          <img className="size-8" src={back_right} />
        </div>

        {/* Payment Method Section */}
        <div className="bg-slate-300 rounded-lg flex items-center justify-between mt-2" onClick={handlePaymentMethod}>
          <p className="py-2 px-2">Payment method</p>
          <img className="size-8" src={back_right} />
        </div>

        {/* Items List */}
        <div className="py-5 overflow-y-auto flex-grow max-h-[calc(100vh-300px)]">
          {selectedItems && selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <div key={index} className="flex gap-4 items-center justify-between border-b py-4">
                <img
                  className="h-20 w-28 rounded-xl object-cover"
                  src={`${process.env.REACT_APP_API_URL}/${item.productImage}`}
                  alt={item.productName}
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">{item.productName}</p>
                  <p className="text-sm text-slate-400 line-clamp-1">{item.productDescription}</p>
                  <p className="text-lg font-medium">
                    Price: {item.productPrice.toLocaleString('VN-vi')}
                  </p>
                </div>
                <p className="font-bold text-lg">{`x${item.quantity}`}</p>
              </div>
            ))
          ) : (
            <p>No items selected for payment</p>
          )}
        </div>
      </div>

      {/* Total Price Section */}
      <div className="flex justify-between bg-slate-200 rounded-lg py-4">
        <p className="font-semibold text-lg pl-1 text-slate-400">Total</p>
        <p className="font-bold text-xl pr-2">
          {totalPrice.toLocaleString('VN-vi')} đ
        </p>
      </div>

      {/* Payment Button */}
      <Button
        htmlType="submit"
        type="primary"
        className="btn-submit"
        size="large"
        style={{
          height: '47px',
          width: '100%',
          backgroundColor: '#FF7622',
        }}
        onClick={handleButton}
      >
        PAYMENT
      </Button>
    </div>
  );
}

export default Payment;
