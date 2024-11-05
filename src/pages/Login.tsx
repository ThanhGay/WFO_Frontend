import { Link, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { useAppDispatch } from '../redux/hook';
import { login } from '../redux/features/authSlice';
import '../styles/Login.scss';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const res = await dispatch(login(values));
    if (res.meta.requestStatus === 'fulfilled') {
      alert('Đăng nhập thành công');
      navigate('/homedetails');
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col p-5 min-h-screen">
        <div className="text-2xl text-[#32343E] font-bold mb-5">
          Just <span className="text-[#F44536]">Sign in</span>, we'll prepare
          your order
        </div>
        <div className="font-medium text-[#646982]">
          If you don't have an account please{' '}
          <Link to="/signup" className=" text-[#F44536]">
            Sign up here
          </Link>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
                itemMarginBottom: 22
              }
            }
          }}
        >
          <Form
            id="form-login"
            form={form}
            layout="vertical"
            onFinish={(values: any) => handleSubmit(values)}
          >
            <Form.Item
              name="email"
              label="Email address"
              style={{ fontWeight: 600 }}
            >
              <Input
                type="email"
                placeholder="Your email (domain@gmail.com)"
                size="large"
                variant="borderless"
                style={{
                  fontWeight: 400,
                  backgroundColor: '#ebebeb',
                  padding: '14px 16px'
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              style={{ fontWeight: 600 }}
            >
              <Input.Password
                placeholder="Your password"
                size="large"
                variant="borderless"
                style={{
                  fontWeight: 400,
                  backgroundColor: '#ebebeb',
                  padding: '14px 16px'
                }}
              />
            </Form.Item>

            <div className="text-end mb-4 text-base font-medium">
              <Link to="#">Forgot password ?</Link>
            </div>

            <Button
              htmlType="submit"
              type="primary"
              className="btn-submit"
              size="large"
            >
              Sign in
            </Button>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
}

export default Login;
