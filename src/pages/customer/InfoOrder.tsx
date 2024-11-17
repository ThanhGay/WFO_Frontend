import BackHeader from '../../components/header/BackHeader';
import Address from '../../img/pin.png';
import Fish from '../../img/Fish.png';
import { Button, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  status: number;
  details: OrderDetail[];
}

function InfoOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails }: { orderDetails: Order } = location.state || {
    orderDetails: { id: 0, status: 0, details: [] }
  };

  const handleReceived = () => {
    message.success('Cảm ơn bạn đã mua hàng bên chúng tôi!', 3);
    setTimeout(() => {
      navigate('/homedetails');
    }, 3000);
  };
  const handleCancle = () => {
    navigate('/home');
  };

  const statusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Created';

      default:
        return 'Unknown';
    }
  };
  const total = orderDetails.details.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  return (
    <div className="py-3 ">
      <BackHeader title="Infomation Order"></BackHeader>
      <div className="px-3 ">
        <div className="shadow-md rounded-md">
          <h1 className="bg-green-600 text-slate-100 rounded-md px-3 p-3">
            {statusText(orderDetails.status)}
          </h1>
          <div className="py-3 px-3">
            <h1 className="font-medium">Shipping Address</h1>
            <div className="flex">
              <img className="size-4 " src={Address} />
              <div className="pl-3">
                <div className="flex">
                  <p className="font-medium">Do Duy Khanh</p>
                  <p className="pl-3 text-slate-400">0345678865</p>
                </div>
                <p className="text-sm text-slate-600">
                  So 10 nha 2 nguyen tat thanh ha noi hasfsdfsdfsfsdfafsfsf
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-3  max-h-[290px] overflow-y-auto">
        {orderDetails.details &&
          orderDetails.details.map((item, index) => (
            <div key={index} className="shadow-md rounded-md flex gap-3 mb-3">
              <img className="w-20 h-20" src={Fish} alt="Product" />
              <div>
                <p className="text-lg font-semibold">{item.productName}</p>
                <div className="flex w-[220px] justify-between">
                  <p className="text-sm text-slate-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="pl-56 text-lg font-medium">
                  {(item.quantity * item.unitPrice).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className=" py-3 px-3 shadow-md bg-slate-50 rounded-xl">
        <p className="text-xl font-bold ">
          Total: {total.toLocaleString()} VND
        </p>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white flex justify-between gap-4 px-4 pb-4 pt-2 shadow-md ">
        <Button
          style={{
            borderColor: '#ffa500',
            color: '#ffa500'
          }}
          className="w-full h-12 text-lg"
          type="default"
          onClick={handleReceived}
        >
          Received
        </Button>
        <Button
          style={{
            backgroundColor: '#ffa500',
            color: 'white'
          }}
          className="w-full h-12 text-lg"
          type="primary"
          onClick={handleCancle}
        >
          Cancle
        </Button>
      </div>
    </div>
  );
}

export default InfoOrder;
