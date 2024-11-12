import { useState } from 'react';
import { Avatar, Button, DatePicker, Form, Input, message } from 'antd';

import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import BackHeader from '../../components/header/BackHeader';
import { apiUpdateUser } from '../../api/user';
import { setDataUser } from '../../redux/features/authSlice';

function calcAge(birthDateStr: string) {
  const now = moment();
  const birthDate = moment(birthDateStr);
  return now.diff(birthDate, 'years');
}

function Profile() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.authState);
  const [messageAntd, contextHolder] = message.useMessage();
  const [editMode, setEditMode] = useState(false);
  const [dob, setDob] = useState('');

  const toEditMode = () => {
    setEditMode(true);
  };

  const handleEditConfirm = async (values: any) => {
    if (editMode) {
      try {
        const response = await apiUpdateUser(
          {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: dob.toString(),
            phone: values.phone,
            address: values.address,
            sex: values.sex
          },
          token
        );

        if (response.status === 200) {
          dispatch(setDataUser(response.data));
          messageAntd.success('Cập nhật thông tin thành công!');
        } else {
          messageAntd.error('Cập nhật thất bại!');
        }
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu cập nhật:', error);
        messageAntd.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
    setEditMode(false);
  };

  return (
    <div className="px-5 py-3 relative">
      {contextHolder}
      <BackHeader title="Profile Information" />

      <div className="flex gap-8 mb-8 items-center">
        <Avatar
          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
          size={120}
          alt="avatar"
        />
        <div className="flex flex-col text-start gap-4">
          <p className="text-2xl font-semibold">{user?.lastName}</p>
          <p>{user?.description}</p>
        </div>
      </div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="inline"
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          username: user?.fullName ? user.fullName : 'Customer',
          // dateOfBirth: user?.dateOfBirth,
          sex: user?.sex,
          age: calcAge(user?.dateOfBirth),
          phone: user?.phone,
          address: user?.address
        }}
        disabled={!editMode}
        onFinish={(values) => handleEditConfirm(values)}
        style={{ backgroundColor: '#F0F5FA', padding: 16, borderRadius: 16 }}
      >
        {editMode ? (
          <>
            <Form.Item
              name="firstName"
              label="Họ"
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <Input placeholder="Họ" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Tên"
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <Input placeholder="Tên" />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            name="username"
            label="Fullname"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <Input
              placeholder="Fullname"
              bordered={editMode}
              style={{ color: 'black' }}
            />
          </Form.Item>
        )}
        <Form.Item
          name="sex"
          label="Sex"
          style={{ width: '100%', maxWidth: '300px' }}
        >
          <Input
            placeholder="Giới tính"
            bordered={editMode}
            style={{ color: 'black' }}
          />
        </Form.Item>
        {editMode ? (
          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              onChange={(value) => setDob(value?.format('YYYY-MM-DD'))}
            />
          </Form.Item>
        ) : (
          <Form.Item
            name="age"
            label="Age"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <Input
              placeholder="Age"
              bordered={editMode}
              style={{ color: 'black' }}
            />
          </Form.Item>
        )}
        <Form.Item
          name="phone"
          label="PhoneNumber"
          style={{ width: '100%', maxWidth: '300px' }}
        >
          <Input
            placeholder="PhoneNumber"
            bordered={editMode}
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
            bordered={editMode}
            style={{ color: 'black' }}
          />
        </Form.Item>
        {editMode && (
          <div className="absolute bottom-10 w-full">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  textTransform: 'capitalize',
                  width: '100%',
                  padding: 24,
                  backgroundColor: '#FF7622'
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </div>
        )}
      </Form>
      <div className="mt-[90px] w-full flex flex-col gap-4">
        {!editMode && (
          <Button
            type="primary"
            style={{
              textTransform: 'capitalize',
              width: '100%',
              padding: 24,
              color: 'white',
              backgroundColor: '#FF7622'
            }}
            onClick={toEditMode}
          >
            Edit Infomation
          </Button>
        )}
      </div>
    </div>
  );
}

export default Profile;
