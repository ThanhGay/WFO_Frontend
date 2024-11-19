import { Button, ConfigProvider } from 'antd';
import MealBox from '../../img/MealBox.png';
import dayjs from 'dayjs';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { DeliveryIcon } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  cancelOrder,
  confirmOrder,
  deliveryOrder,
  haveDoneOrder
} from '../../redux/features/adminSlice';
import {
  apiAdminConfirmOrder,
  apiCancelOrder,
  apiDoneOrder,
  apiTransferOrderToCarrier
} from '../../api/order';

function ProcessingOrderCard({ data }: { data: any }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authState);
  const statusOrder = (status: number) => {
    switch (status) {
      case 0:
        return {
          text: 'Created',
          bgColor: '#FFB020',
          buttons: (
            <div className="flex justify-around mt-4 gap-4">
              <Button
                className="w-full font-medium"
                size="large"
                icon={<CheckOutlined />}
                style={{
                  backgroundColor: 'white',
                  color: '#FF7622',
                  border: 'solid 1px #FF7622'
                }}
                onClick={() => handleConfirm(data.id)}
              >
                Confirm
              </Button>
              <Button
                type="primary"
                className="w-full font-medium"
                size="large"
                icon={<CloseOutlined />}
                style={{
                  backgroundColor: '#FF7622',
                  color: 'white',
                  border: 'none'
                }}
                onClick={() => handleCancel(data.id)}
              >
                Cancel
              </Button>
            </div>
          )
        };
      case 1:
        return {
          text: 'Cooking',
          bgColor: '#F6C000',
          buttons: (
            <div className="flex justify-around mt-4 gap-4">
              <Button
                className="w-full font-medium"
                size="large"
                icon={<DeliveryIcon />}
                style={{
                  backgroundColor: 'white',
                  color: '#FF7622',
                  border: 'solid 1px #FF7622'
                }}
                onClick={() => handleTransferToShipper(data.id)}
              >
                Go ship
              </Button>
              <Button
                type="primary"
                className="w-full font-medium"
                size="large"
                icon={<CloseOutlined />}
                style={{
                  backgroundColor: '#FF7622',
                  color: 'white',
                  border: 'none'
                }}
                onClick={() => handleCancel(data.id)}
              >
                Cancel
              </Button>
            </div>
          )
        };
      case 2:
        return {
          text: 'Ongoing',
          bgColor: '#2196F3',
          buttons: (
            <div className="flex justify-around mt-4 gap-4">
              <Button
                className="w-full font-medium"
                size="large"
                style={{
                  backgroundColor: 'white',
                  color: '#FF7622',
                  border: 'solid 1px #FF7622'
                }}
                onClick={() => handleView(data.id)}
              >
                View
              </Button>
            </div>
          )
        };
      case 3:
        return {
          text: 'Received',
          bgColor: '#FF99FF',
          buttons: (
            <div className="flex justify-around mt-4 gap-4">
              <Button
                className="w-full font-medium"
                size="large"
                icon={<CheckOutlined />}
                style={{
                  backgroundColor: 'white',
                  color: '#FF7622',
                  border: 'solid 1px #FF7622'
                }}
                onClick={() => handleDone(data.id)}
              >
                Done
              </Button>
            </div>
          )
        };
      default:
        return {
          text: 'Unknown',
          bgColor: '#9E9E9E',
          buttons: (
            <div className="flex justify-around mt-4 gap-4">
              <Button
                className="w-full font-medium"
                size="large"
                style={{
                  backgroundColor: 'white',
                  color: '#FF7622',
                  border: 'solid 1px #FF7622'
                }}
                onClick={() => handleView(data.id)}
              >
                View
              </Button>
            </div>
          )
        };
    }
  };

  const handleConfirm = async (id: string) => {
    const res = await apiAdminConfirmOrder({ orderId: id, token });
    if (res) dispatch(confirmOrder(id));
  };

  const handleTransferToShipper = async (id: string) => {
    const res = await apiTransferOrderToCarrier({ orderId: id, token });
    if (res) dispatch(deliveryOrder(id));
  };

  const handleCancel = async (id: string) => {
    const res = await apiCancelOrder({ orderId: id, token });
    if (res) dispatch(cancelOrder(id));
  };

  const handleDone = async (id: string) => {
    const res = await apiDoneOrder({ orderId: id, token });
    if (res) dispatch(haveDoneOrder(id));
  };

  const handleView = async (id: string) => {
    console.log('view', id);
  };

  return (
    <div className="my-2 shadow-lg border rounded-2xl">
      <p
        className="text-sm font-medium p-2 rounded-t-2xl text-white"
        style={{ backgroundColor: statusOrder(data.status).bgColor }}
      >
        {statusOrder(data.status).text}
      </p>
      <div className="bg-slate-50 rounded-b-2xl  p-3 relative">
        <div className="top-4 right-4 absolute text-xs underline text-[#6B6E82]">
          #{data.id}
        </div>
        <div className="flex items-center gap-4">
          <img src={MealBox} alt="MealBox" className="w-16 h-16 rounded-md" />
          <div>
            <p className="text-base font-medium">Nhà hàng 3 chúng mình</p>
            <div className="flex gap-2 items-center text-sm text-gray-500">
              <p className="line-clamp-1 ">
                {dayjs(
                  data.shippedDate || data.updatedDate || data.createdDate
                ).format('DD MMM - HH:mm')}
              </p>
            </div>
          </div>
        </div>
        <>{statusOrder(data.status).buttons}</>
      </div>
    </div>
  );
}

export default ProcessingOrderCard;
