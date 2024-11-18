import { Form, Input, Button, message } from 'antd';
import BackHeader from '../../components/header/BackHeader';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { apiUpdateUser } from '../../api/user';
import { setDataUser } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

function EditAdress() {
  const [messageAntd, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.authState);
  const navigate = useNavigate();

  const handleConfirm = async (values: any) => {
    try {

      const updatedUser = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        dateOfBirth: user?.dateOfBirth,
        sex: user?.sex,
        phone: values.phone,
        address: values.address
      };


      const response = await apiUpdateUser(updatedUser, token);

      if (response.status === 200) {
        dispatch(setDataUser(response.data));
        messageAntd.success('Cập nhật thông tin thành công!');
        navigate(-1);
      } else {
        messageAntd.error('Cập nhật thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu cập nhật:', error);
      messageAntd.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div className="px-3 py-3 h-screen flex flex-col">
      <BackHeader title="Delivery Address" />
      <div className="flex-row justify-between">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="inline"
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.fullName ? user.fullName : 'Customer',
            phone: user?.phone,
            address: user?.address
          }}
          onFinish={(values) => handleConfirm(values)}
          style={{
            backgroundColor: '#F0F5FA',
            padding: 16,
            borderRadius: 16
          }}
        >
          <Form.Item
            name="username"
            label="Fullname"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <Input
              placeholder="Fullname"
              bordered={false}
              style={{ color: 'black' }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="PhoneNumber"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <Input
              placeholder="PhoneNumber"
              bordered={true}
              style={{ color: 'black' }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <Input
              placeholder="Address"
              bordered={true}
              style={{ color: 'black' }}
            />
          </Form.Item>

          <Form.Item style={{ width: '100%', maxWidth: '300px' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                textTransform: 'capitalize',
                width: '150%',
                padding: 24,
                backgroundColor: '#FF7622'
              }}
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditAdress;
