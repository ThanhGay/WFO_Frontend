import { Link, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { useAppDispatch } from '../redux/hook';
import { login } from '../redux/features/authSlice';
import '../styles/Login.scss';

function ResetPW() {
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
            <div className="flex items-center justify-center flex-col p-5">
                <p className='text-2xl font-bold'>Reset your password</p>
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
                            name="new_password"
                            label="New password"
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
                            name="confirm_password"
                            label="Confirm password"
                            style={{ fontWeight: 600 }}
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

                        <Button
                            htmlType="submit"
                            type="primary"
                            className="btn-submit"
                            size="large"
                        >
                            Reset
                        </Button>
                    </Form>
                </ConfigProvider>
            </div>
        </>
    );
}

export default ResetPW;
