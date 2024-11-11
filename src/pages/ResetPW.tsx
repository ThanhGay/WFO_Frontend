import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Form, Input } from 'antd';

import { apiSendOtp } from '../api/auth';
import BackHeader from '../components/header/BackHeader';
import '../styles/Login.scss';

function ResetPW() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      const res = await apiSendOtp(values.email);
      if (res.status === 200) {
        console.log(res.data);

        alert(res.data);
        navigate('/confirm', {
            state: {
                email: values.email,
                passwd: values.confirm_password
            }
        });
      }
    } catch (e: any) {
      alert(e.response.data);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col p-5">
        <BackHeader title="Reset your password" />
        {/* <p className="text-2xl font-bold">Reset your password</p> */}
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16
                // itemMarginBottom: 22
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
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'You must enter your email'
                }
              ]}
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
              name="new_password"
              label="New password"
              style={{ fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter your new password'
                }
              ]}
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
              name="confirm_password"
              label="Confirm password"
              style={{ fontWeight: 600 }}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Please re-center your new password'
                },
                {
                  validator(rule, value, callback) {
                    if (value !== form.getFieldValue('new_password')) {
                      return Promise.reject('Passwords do not match!');
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input.Password
                placeholder="Re-enter password"
                size="large"
                variant="borderless"
                style={{
                  fontWeight: 400,
                  backgroundColor: '#ebebeb',
                  padding: '14px 16px'
                }}
              />
            </Form.Item>

            <Form.Item style={{ width: '100%' }}>
              <Button
              loading={loading}
                htmlType="submit"
                type="primary"
                className="btn-submit w-full"
                size="large"
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
}

export default ResetPW;
