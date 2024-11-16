import { Button } from 'antd';
import BackHeader from '../../components/header/BackHeader';
import Fish from '../../img/Fish.png';
import { useNavigate } from 'react-router-dom';

function MyOrder() {
    const navigate = useNavigate();
    const handleTrackOrder = () => {
        navigate('/home');
      };
      const handleCancle = () => {
        navigate('/homedetails');
      };
  return (
    <div className="py-3 px-3">
      <BackHeader title="My orders"></BackHeader>
      <div>
        <p>Trang thai giao hang</p>
        <div className="bg-slate-50 rounded-2xl shadow-xl p-4">
          <div className="flex items-center gap-4">
            <img src={Fish} alt="Fish" className="w-16 h-16 rounded-md" />
            <div>
              <p className="text-lg font-semibold">Pizza Hut</p>
              <p className="text-sm text-gray-500">$2</p>
            </div>
          </div>
          <div className="flex justify-around mt-4 gap-4">
            <Button
              htmlType="submit"
              type="primary"
              className="w-full"
              size="large"
              style={{
                backgroundColor: '#FF7622', // Màu nền
                color: 'white', // Màu chữ
                border: 'none', // Không viền
              }}
              onClick={handleTrackOrder}
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
                backgroundColor:'#fff',
                borderColor: '#FF7622', // Viền đỏ
                color: '#FF7622',
              }}
              onClick={handleCancle}
             
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
