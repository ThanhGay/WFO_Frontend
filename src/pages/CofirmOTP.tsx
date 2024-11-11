import { useState } from 'react';
import { Button, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiResetPasswd } from '../api/auth';
import '../styles/Login.scss';

const ConfirmOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, passwd } = location.state;

  const [otp, setOtp] = useState('');

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async () => {
    try {
      const res = await apiResetPasswd({
        email: email,
        otp: otp,
        passwd: passwd
      });
      if (res.status === 200) {
        alert(res.data);
        navigate('/login');
      }
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12">
      <p className="text-2xl font-bold">Comfirm OTP</p>
      <Input.OTP
        value={otp}
        onChange={handleOtpChange}
        style={{ width: 250 }}
        size="large"
        className="otp-input" // Thêm class tùy chỉnh cho style
      />
      <Button type="primary" onClick={handleSubmit}>
        Xác nhận
      </Button>
    </div>
  );
};

export default ConfirmOTP;
