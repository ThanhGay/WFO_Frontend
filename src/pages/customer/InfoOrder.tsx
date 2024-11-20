import BackHeader from '../../components/header/BackHeader';
import Address from '../../img/pin.png';
import { Button, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCancelOrder, apiConfirmReceiveOrder } from '../../api/order';
import { useAppSelector } from '../../redux/hook';

interface OrderDetail {
  productId: number;
  productName: string;
  productImage: string;
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
  const { token, user } = useAppSelector((state) => state.authState);

  const { orderDetails }: { orderDetails: Order } = location.state || {
    orderDetails: { id: 0, status: 0, details: [] }
  };

  const handleReceived = async () => {
    try {
      const dataRes = await apiConfirmReceiveOrder({
        orderId: orderDetails.id.toString(),
        token: token
      });

      if (dataRes) {
        message.success(dataRes);

        setTimeout(() => {
          navigate('/homedetails');
        }, 1000);
      }
    } catch (err: any) {
      alert(err.response.data);
    }
  };

  const handleCancel = async () => {
    try {
      const dataRes = await apiCancelOrder({
        orderId: orderDetails.id.toString(),
        token: token
      });

      if (dataRes) {
        message.success(dataRes.data);

        setTimeout(() => {
          navigate('/myorder');
        }, 1000);
      }
    } catch (err: any) {
      alert(err.response.data);
    }
  };

  const statusText = (status: number) => {
    switch (status) {
      case 0:
        return { text: 'Created', color: '#FFB020' };
      case 1:
        return { text: 'Cooking', color: '#F6C000' };
      case 2:
        return { text: 'Ongoing', color: '#2196F3' };
      case 3:
        return { text: 'Received', color: '#FF99FF' };
      case 5:
        return { text: 'Completed', color: '#8BC34A' };
      case 10:
        return { text: 'Canceled', color: '#F44336' };
      default:
        return { text: 'Unknown', color: '#9E9E9E' };
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
          <h1
            className="text-slate-100 rounded-t-md px-3 p-3"
            style={{ backgroundColor: statusText(orderDetails.status).color }}
          >
            {statusText(orderDetails.status).text}
          </h1>
          <div className="py-3 px-3">
            <h1 className="font-medium">Shipping Address</h1>
            <div className="flex">
              <img className="size-4 " src={Address} />
              <div className="pl-3">
                <div className="flex">
                  <p className="font-medium">{user?.fullName}</p>
                  <p className="pl-3 text-slate-400">{user?.phone}</p>
                </div>
                <p className="text-sm text-slate-600">{user?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-3  max-h-[290px] overflow-y-auto">
        {orderDetails.details &&
          orderDetails.details.map((item, index) => (
            <div
              key={index}
              className="shadow-md w-full rounded-md flex gap-3 mb-3"
            >
              <img
                className="w-20 h-20 rounded-lg"
                src={process.env.REACT_APP_API_URL + item.productImage}
                alt={item.productName}
              />
              <div>
                <p className="text-lg font-semibold">{item.productName}</p>
                <div className="flex w-[220px] justify-between">
                  <p className="text-sm text-slate-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-end text-lg font-medium">
                  {(item.quantity * item.unitPrice).toLocaleString()}đ
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default InfoOrder;
