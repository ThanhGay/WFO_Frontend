import { Button, Modal } from 'antd';
import BackHeader from '../../components/header/BackHeader';
import MealBox from '../../img/MealBox.png';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import No_order from '../../img/no-order.png';
import {
  apiCancelOrder,
  apiGetMyOrder,
  apiOrderDetails
} from '../../api/order';
import { apiDeleteCart } from '../../api/cart';
import dayjs from 'dayjs';

interface OrderItem {
  id: number;
  status: number;
  productCount: string;
  totalPrice: number;
  canceledAt: string;
  completedAt: string;
}

function MyOrder() {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authState);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  const [orders, setOrders] = useState<OrderItem[]>([]);
  useEffect(() => {
    const fetchMyOrder = async (token: string) => {
      try {
        const response = await apiGetMyOrder(token);
        setOrders(response.data.items);
        console.log('don hang cua toi:', response.data);
      } catch (error) {
        console.error('Không thể lấy đơn hàng:', error);
      }
    };
    fetchMyOrder(token);
  }, [token]);

  const [currentId, setCurrentId] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleTrackOrder = async (id: number) => {
    try {
      const response = await apiOrderDetails(token, id);
      const orderDetails = response.data;

      if (orderDetails) {
        console.log('Chi tiết đơn hàng:', orderDetails);
        navigate('/myorder/infomationorder', { state: { orderDetails } });
      } else {
        console.warn('Không tìm thấy đơn hàng');
      }
    } catch (error) {
      console.error('Không thể lấy thông tin đơn hàng:', error);
    }
  };

  const handleCancel = (orderId: number) => {
    setCurrentId(orderId);
    setOpenModal(true);
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
  return (
    <div className="py-3 px-3">
      <BackHeader title="My orders"></BackHeader>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="lecturer tabs"
          TabIndicatorProps={{ style: { backgroundColor: '#FF7622' } }}
          centered
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiTab-root': {
              color: '#DCDCDC',
              fontWeight: 'normal'
            },
            '& .Mui-selected': {
              color: '#FF76',
              fontWeight: 'bold'
            }
          }}
        >
          <Tab
            label="On going"
            sx={{
              flex: 1,
              textAlign: 'center'
            }}
          />
          <Tab
            label="History"
            sx={{
              flex: 1,
              textAlign: 'center'
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <Card
            sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}
          >
            {orders.filter((item) => [0, 1, 2].includes(item.status)).length ===
            0 ? (
              <div className=" flex flex-col justify-center py-10 items-center opacity-30">
                <img className="size-36 " src={No_order} />
                <p className="text-lg font-medium text-gray-500">
                  You have no on going orders.
                </p>
              </div>
            ) : (
              orders
                .filter((item) => [0, 1, 2].includes(item.status))
                .slice()
                .reverse()
                .map((item, index) => (
                  <div key={index} className="py-2">
                    <p
                      className="text-sm font-medium p-2"
                      style={{ color: statusText(item.status).color }}
                    >
                      {statusText(item.status).text}
                    </p>
                    <div className="bg-slate-50 rounded-2xl shadow-xl p-4 relative">
                      <div className="top-4 right-4 absolute text-xs underline text-[#6B6E82]">
                        #{item.id}
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          src={MealBox}
                          alt="MealBox"
                          className="w-16 h-16 rounded-md"
                        />
                        <div>
                          <p className="text-base font-medium">
                            Nhà hàng 3 chúng mình
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <p>{item.totalPrice.toLocaleString('VN-vi')}đ</p>
                            <div className="flex gap-1">
                              <p>{item.productCount}</p>
                              <p>
                                {parseInt(item.productCount) > 1
                                  ? 'Items'
                                  : 'Item'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-around mt-4 gap-4">
                        <Button
                          htmlType="submit"
                          type="primary"
                          className="w-full"
                          size="large"
                          style={{
                            backgroundColor: '#FF7622',
                            color: 'white',
                            border: 'none'
                          }}
                          onClick={() => handleTrackOrder(item.id)}
                        >
                          Track Order
                        </Button>
                        <Button
                          htmlType="submit"
                          type="primary"
                          className="w-full"
                          size="large"
                          danger
                          style={{
                            backgroundColor: '#fff',
                            borderColor: '#FF7622',
                            color: '#FF7622'
                          }}
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </Card>
        )}

        {tabValue === 1 && (
          <Card
            sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}
          >
            {orders
              .filter((item) => [3, 5, 10].includes(item.status))
              .map((item, index) => (
                <div key={index} className="py-2">
                  <p
                    className="text-sm font-medium p-2"
                    style={{ color: statusText(item.status).color }}
                  >
                    {statusText(item.status).text}
                  </p>
                  <div className="bg-slate-50 rounded-2xl shadow-xl p-4 relative">
                    <div className="top-4 right-4 absolute text-xs underline text-[#6B6E82]">
                      #{item.id}
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={MealBox}
                        alt="MealBox"
                        className="w-16 h-16 rounded-md"
                      />
                      <div>
                        <p className="text-base font-medium">
                          Nhà hàng 3 chúng mình
                        </p>
                        <div className="flex gap-2 items-center text-sm text-gray-500">
                          <p>{item.totalPrice.toLocaleString('VN-vi')}đ</p>
                          <p className="line-clamp-1 ">
                            {dayjs(item.completedAt || item.canceledAt).format(
                              'DD MMM - HH:mm'
                            )}
                          </p>
                          <div className="flex gap-1">
                            <p>{item.productCount}</p>
                            <p>
                              {parseInt(item.productCount) > 1
                                ? 'Items'
                                : 'Item'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around mt-4 gap-4">
                      <Button
                        htmlType="submit"
                        type="primary"
                        className="w-full"
                        size="large"
                        style={{
                          backgroundColor: '#FF7622',
                          color: 'white',
                          border: 'none'
                        }}
                        onClick={() => handleTrackOrder(item.id)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </Card>
        )}
      </Box>

      <Modal
        open={openModal}
        title="Are you sure you want to cancel this order?"
        okText="Yes"
        cancelText="No"
        onOk={async () => {
          try {
            const response = await apiCancelOrder({
              orderId: currentId.toString(),
              token
            });
            if (response?.status === 200) {
              console.log('Đơn hàng đã hủy:', response.data);
              setOrders((prevOrders) =>
                prevOrders.map((item) =>
                  item.id === currentId
                    ? {
                        ...item,
                        status: 10,
                        canceledAt: new Date().toISOString()
                      }
                    : item
                )
              );
              setOpenModal(false);
            } else {
              console.error('Không thể hủy đơn hàng:', response?.data?.message);
            }
          } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
          }
        }}
        onCancel={() => setOpenModal(false)}
      >
        <div>This action cannot be undone.</div>
      </Modal>
    </div>
  );
}

export default MyOrder;
