import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/homedetails');
      };
      const handleMyorder = () => {
        navigate('/myorder');
      };

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-50">
      <div className="flex flex-col items-center mt-12">
        <div className="bg-blue-100 p-6 rounded-full flex items-center justify-center">
          <CheckCircleOutlined style={{ fontSize: '100px', color: '#4caf50' }} />
        </div>
        <h1 className="text-xl font-semibold mt-4">Order Success</h1>
      </div>

      <div className="flex justify-between gap-4 px-4 pb-6">
        <Button
          style={{
            borderColor: '#ffa500',
            color: '#ffa500',
          }}
          className="w-full h-12 text-lg"
          type="default"
          onClick={handleHome}
        >
          Home
        </Button>
        <Button
          style={{
            backgroundColor: '#ffa500', 
            color: 'white', 
          }}
          className="w-full h-12 text-lg"
          type="primary"
          onClick={handleMyorder}
        >
          My Order
        </Button>
      </div>
    </div>
  );
}

export default OrderSuccess;
