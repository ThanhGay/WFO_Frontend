import { Button } from 'antd';
import BackHeader from '../../components/header/BackHeader';
import Fish from '../../img/Fish.png';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import { apiGetMyOrder, apiOrderDetails } from '../../api/order';

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
  const [tabValue, setTabValue] = useState(0);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const { token } = useAppSelector((state) => state.authState);
  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchMyOrder = async (token: string) => {
      try {
        const response = await apiGetMyOrder(token);
        setOrder(response.data.items);
        console.log('don hang cua toi:', response.data);
      } catch (error) {
        console.error('Không thể lấy đơn hàng:', error);
      }
    };
    fetchMyOrder(token);
  }, [token]);

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
  
  const handleCancle = () => {
    navigate('/homedetails');
  };
  const statusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Created';
      case 1:
        return 'Cooking';
      case 2:
        return 'Ongoing';
      case 3:
        return 'Received';
      case 5:
        return 'Completed';
      case 10:
        return 'Canceled';
      default:
        return 'Unknown';
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
          TabIndicatorProps={{ style: { backgroundColor: '#A6C8FF' } }}
          centered
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
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
            {order.slice().reverse().map((item, index) => (
              <div key={index}>
                <p className="text-sm text-red-500">
                  {statusText(item.status)}
                </p>
                <div className="bg-slate-50 rounded-2xl shadow-xl p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={Fish}
                      alt="Fish"
                      className="w-16 h-16 rounded-md"
                    />
                    <div>
                      <p className="text-base font-medium">
                        Number of Product: {item.productCount}{' '}
                      </p>
                      <p className="text-sm text-gray-500">{item.totalPrice.toLocaleString('VN-vi')}</p>
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
                      onClick={handleCancle}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}
        {tabValue === 1 && (
          <Card
            sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}
          >
            {order.slice().reverse().map((item, index) => (
              <div key={index}>
                <p className="text-sm text-red-500">
                  {statusText(item.status)}
                </p>
                <div className="bg-slate-50 rounded-2xl shadow-xl p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={Fish}
                      alt="Fish"
                      className="w-16 h-16 rounded-md"
                    />
                    <div>
                      <p className="text-base font-medium">
                        Number of Product: {item.productCount}{' '}
                      </p>
                      <p className="text-sm text-gray-500">{item.totalPrice.toLocaleString('VN-vi')}</p>
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
                      onClick={handleCancle}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}
      </Box>
    </div>
  );
}

export default MyOrder;
