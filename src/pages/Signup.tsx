import { Link, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { apiSignUp } from '../api/auth';
import '../styles/Login.scss';

function Signup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const dataRes = await apiSignUp({
      email: values.email,
      password: values.password
    });

    if (dataRes.status === 200) {
      console.log(dataRes.data);
      alert('Đăng ký thành công');
      navigate('/login');
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col p-5 min-h-screen">
        <div className="text-2xl text-[#32343E] font-bold mb-5">
          Let's <span className="text-[#F44536]">Sign your up</span>, your meal
          awaits
        </div>
        <div className="font-medium text-[#646982]">
          If you already have an account please{' '}
          <Link to="/login" className=" text-[#F44536]">
            Sign in here
          </Link>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
                itemMarginBottom: 20
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
            <Form.Item
              name="confirm-password"
              label="Confirm Password"
              style={{ fontWeight: 600 }}
            >
              <Input.Password
                placeholder="Confirm password"
                size="large"
                variant="borderless"
                style={{
                  fontWeight: 400,
                  backgroundColor: '#ebebeb',
                  padding: '14px 16px'
                }}
              />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              className="btn-submit"
              size="large"
            >
              Sign up
            </Button>
          </Form>
        </ConfigProvider>

        <div className="text-center rule">
          By signing up, you have agreed to our{' '}
          <span>Terms and conditions</span> & <span>Privacy policy</span>
        </div>
      </div>
    </>
  );
}

export default Signup;
